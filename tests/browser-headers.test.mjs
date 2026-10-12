import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const now = Date.parse("2026-10-13T00:00:00Z");
const expires = Date.parse("2027-04-10T00:00:00Z");
const setCookies = [
	"__Secure-BUCKET=ignore; Path=/; Secure",
	"YSC=session; Path=/; Secure; HttpOnly",
	"VISITOR_INFO1_LIVE=visitor; Expires=Sat, 10 Apr 2027 00:00:00 GMT; Path=/; Secure",
	"VISITOR_PRIVACY_METADATA=privacy==; Expires=Sat, 10 Apr 2027 00:00:00 GMT; Path=/; Secure",
	"__Secure-ROLLOUT_TOKEN=rollout; Expires=Sat, 10 Apr 2027 00:00:00 GMT; Path=/; Secure",
];
const cookie = "YSC=session; VISITOR_INFO1_LIVE=visitor; VISITOR_PRIVACY_METADATA=privacy==; __Secure-ROLLOUT_TOKEN=rollout";

async function bundle(input, name) {
	const build = await rollup({ input, plugins: [nodeResolve()] });
	try {
		return (await build.generate({ format: "iife", name })).output[0].code;
	} finally {
		await build.close();
	}
}

const helperSource = await bundle("src/function/BrowserHeaders.mjs", "BrowserHeaders");
const requestSource = await bundle("src/request.dev.js");

function host({ quantumult = false, response = { status: 200, headers: { "Set-Cookie": setCookies.join(", ") } }, state = {}, networkError } = {}) {
	const requests = [];
	const errors = [];
	const data = { DualSubs: JSON.stringify(state) };
	const clock = { now };
	const read = key => data[key] ?? null;
	const write = (value, key) => { data[key] = value; return true; };
	const context = vm.createContext({
		URL,
		Date: class extends Date { static now() { return clock.now; } },
		console: { log() {}, info() {}, debug() {}, warn() {}, error: (...args) => errors.push(args) },
		$script: { startTime: now / 1000 },
		...(quantumult ? {
			$task: { fetch: async request => {
				requests.push(request);
				if (networkError) throw { error: networkError };
				return { ...response, statusCode: response.status };
			} },
			$prefs: { valueForKey: read, setValueForKey: write },
			// Quantumult X 的超时由 util 管理，测试中无需留下真实定时器。
			setTimeout() {},
		} : {
			$environment: { "surge-version": "test" },
			$persistentStore: { read, write },
			$httpClient: { get: (request, callback) => { requests.push(request); callback(networkError, response, ""); } },
		}),
	});
	return { context, requests, errors, clock, state: () => JSON.parse(data.DualSubs) };
}

test("browser headers extract all four server cookies from folded and array headers on Surge and Quantumult X", async () => {
	for (const quantumult of [false, true])
		for (const array of [false, true]) {
			const runtime = host({ quantumult, response: { status: 200, headers: { "sEt-CoOkIe": array ? setCookies : setCookies.join(", ") } }, state: { YouTube: { Caches: { tlang: "zh-Hans" } } } });
			vm.runInContext(helperSource, runtime.context);
			const headers = await runtime.context.BrowserHeaders.getHeader();
			assert.equal(headers.Cookie, cookie);
			assert.match(headers["User-Agent"], /Chrome\/140\.0\.0\.0/);
			const [request] = runtime.requests;
			assert.equal(request.url, "https://www.youtube.com/sw.js");
			assert.equal(request.headers["User-Agent"], headers["User-Agent"]);
			assert.equal(request.headers.Cookie, undefined);
			assert.equal(request.headers.Authorization, undefined);
			assert.deepEqual(runtime.state().YouTube.Caches, { tlang: "zh-Hans", Cookies: cookie, Expires: String(expires) });
		}
});

test("browser cookies persist across script invocations and refresh after the server expiry", async () => {
	const first = host();
	vm.runInContext(helperSource, first.context);
	await first.context.BrowserHeaders.getHeader();
	const renewedCookies = setCookies.map(value => value.replace("10 Apr 2027", "10 Oct 2027").replace("YSC=session", "YSC=renewed"));
	const second = host({ state: first.state(), response: { status: 200, headers: { "Set-Cookie": renewedCookies } } });
	vm.runInContext(helperSource, second.context);
	assert.equal((await second.context.BrowserHeaders.getHeader()).Cookie, cookie);
	assert.equal(second.requests.length, 0);
	second.clock.now = expires;
	assert.equal((await second.context.BrowserHeaders.getHeader()).Cookie, cookie.replace("YSC=session", "YSC=renewed"));
	assert.equal(second.requests.length, 1);
	assert.equal(second.state().YouTube.Caches.Expires, String(Date.parse("2027-10-10T00:00:00Z")));
});

test("failed and incomplete cookie responses reject without persisting partial results", async () => {
	for (const response of [
		{ status: 429, headers: {} },
		{ status: 200, headers: {} },
		{ status: 200, headers: { "Set-Cookie": setCookies.slice(0, -1) } },
		{ status: 200, headers: { "Set-Cookie": [...setCookies.slice(0, -1), setCookies[1]] } },
		{ status: 200, headers: { "Set-Cookie": setCookies.map(value => value.replace("YSC=session", "YSC=")) } },
		{ status: 200, headers: { "Set-Cookie": setCookies.map(value => value.replace(/Expires=[^;]+/g, "Expires=invalid")) } },
	]) {
		const runtime = host({ response });
		vm.runInContext(helperSource, runtime.context);
		await assert.rejects(runtime.context.BrowserHeaders.getHeader(), /获取浏览器 Cookie 失败/);
		assert.deepEqual(runtime.state(), {});
	}
	const runtime = host({ networkError: "network unavailable" });
	vm.runInContext(helperSource, runtime.context);
	await assert.rejects(runtime.context.BrowserHeaders.getHeader(), reason => reason === "network unavailable");
	assert.deepEqual(runtime.state(), {});
});

test("setHeader removes every casing of UA and Cookie before installing browser headers", async () => {
	const runtime = host();
	vm.runInContext(helperSource, runtime.context);
	const headers = { "User-Agent": "old-desktop", "user-agent": "native-app", "USER-AGENT": "third-ua", Cookie: "old-cookie", cookie: "second-cookie", COOKIE: "third-cookie", Authorization: "app-auth", Accept: "*/*" };
	await runtime.context.BrowserHeaders.setHeader(headers);
	assert.deepEqual(Object.keys(headers).filter(name => name.toLowerCase() === "user-agent"), ["User-Agent"]);
	assert.deepEqual(Object.keys(headers).filter(name => name.toLowerCase() === "cookie"), ["Cookie"]);
	assert.match(headers["User-Agent"], /Chrome\/140\.0\.0\.0/);
	assert.equal(headers.Cookie, cookie);
	assert.equal(headers.Authorization, "app-auth");
	assert.equal(headers.Accept, "*/*");
});

test("dev requests set browser headers only when the final timedtext URL keeps tlang", async () => {
	for (const quantumult of [false, true])
		for (const [type, query, cachedLanguage, fetchCookies] of [
			["Official", "&tlang=zh-Hans", undefined, true],
			["Composite", "&tlang=zh-Hans", undefined, true],
			["Official", "", "zh-Hans", true],
			["Official", "", undefined, false],
			["Official", "&tlang=", undefined, false],
			["Translate", "&tlang=zh-Hans", undefined, false],
			["External", "&tlang=zh-Hans", undefined, false],
		]) {
			const runtime = host({ quantumult, state: { YouTube: { Settings: { Type: type, ShowOnly: false, AutoCC: true, LogLevel: "OFF" }, Caches: { tlang: cachedLanguage } } } });
			const headers = { "User-Agent": "old-desktop", "user-agent": "native-app", Cookie: "old-cookie", cookie: "second-cookie", Authorization: "app-auth", Accept: "*/*" };
			const request = { method: "GET", url: `https://www.youtube.com/api/timedtext?v=video&lang=en${query}`, headers };
			const result = await new Promise(resolve => {
				runtime.context.$request = request;
				runtime.context.$done = resolve;
				vm.runInContext(requestSource, runtime.context);
			});
			assert.deepEqual(runtime.errors, []);
			assert.equal(runtime.requests.length, fetchCookies ? 1 : 0);
			assert.equal(result.headers.Authorization, "app-auth");
			assert.equal(result.headers.Accept, "*/*");
			if (fetchCookies) {
				assert.equal(result.headers.Cookie, cookie);
				assert.match(result.headers["User-Agent"], /Chrome\/140\.0\.0\.0/);
				assert.equal(result.headers["user-agent"], undefined);
				assert.equal(result.headers.cookie, undefined);
			} else assert.equal(result.headers["user-agent"], "native-app");
		}
});
