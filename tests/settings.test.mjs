import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const suffix = process.env.SETTINGS_CHANNEL === "dev" ? ".dev" : "";

test("module settings retain both proxy response protocols and bodyless HEAD detection", async () => {
	const expected = JSON.parse(await readFile(`dist/DualSubs.YouTube${suffix}.PreferencePanes.json`, "utf8"));
	const source = await readFile(`dist/config${suffix}.bundle.js`, "utf8");
	for (const method of ["GET", "HEAD"])
		for (const quantumult of [false, true]) {
			let result;
			vm.runInNewContext(source, {
				$request: { method },
				...(quantumult ? { $task: {} } : {}),
				$done: response => { result = quantumult ? response : response.response; },
			});
			assert.equal(result.status, quantumult ? "HTTP/1.1 200 OK" : 200);
			assert.ok(result.headers["X-PreferencePanes-Version"]);
			if (method === "HEAD") assert.equal(result.body, "");
			else assert.deepEqual(JSON.parse(result.body), expected);
		}
});

test("module templates intercept only their own configuration and leave backing downloads untouched", async () => {
	for (const suffix of ["", ".dev"])
		for (const platform of ["surge", "loon", "quantumultx", "stash"]) {
			const template = await readFile(`template/${platform}${suffix}.handlebars`, "utf8");
			const line = template.split("\n").find(line => line.includes("dualsubs\\.github\\.io") && line.includes("/api\\/YouTube"));
			const pattern = line.startsWith("response if") ? line.match(/~= \/(.+)\/[a-z]* then/)[1] : line.includes("pattern=") ? line.match(/pattern=([^,]+)/)[1] : line.match(/(\^https[^ ]+)/)[1];
			const regex = new RegExp(pattern);
			assert.ok(regex.test("https://dualsubs.github.io/api/YouTube?version=1"));
			for (const panel of ["Universal", "Composite", "Translate", "External", "API_Translate", "API_External", "YouTube", "Netflix", "Spotify"].filter(panel => panel !== "YouTube"))
				assert.equal(regex.test(`https://dualsubs.github.io/api/${panel}`), false, `${platform}${suffix}: ${panel}`);
			for (const [url] of template.matchAll(/https:\/\/[^\s"',)]+/g))
				assert.equal(regex.test(url), false, `${platform}${suffix}: download intercepted: ${url}`);
		}
});

test("bundled requests preserve argument precedence and cached subtitle languages without Node globals", { timeout: 10000 }, async () => {
	const source = await readFile(`dist/request${suffix}.bundle.js`, "utf8");
	for (const objectArgument of [false, true])
		for (const storage of [undefined, "PersistentStore", "Argument"]) {
			const argument = { Type: "Translate", LogLevel: "OFF" };
			if (storage !== undefined) argument.Storage = storage;
			const state = { YouTube: { Settings: { Type: "Official", ShowOnly: false, AutoCC: true }, Caches: { tlang: "ja", Cookies: "cached-browser-cookie", Expires: String(Date.now() + 60000) } } };
			const errors = [];
			const result = await new Promise(resolve => vm.runInNewContext(source, {
				URL,
				console: { log() {}, info() {}, debug() {}, warn() {}, error: (...args) => errors.push(args) },
				$environment: { "surge-version": "test" },
				$script: { startTime: Date.now() / 1000 },
				$argument: objectArgument ? argument : new URLSearchParams(argument).toString(),
				$persistentStore: { read: key => key === "DualSubs" ? JSON.stringify(state) : null, write: (value, key) => { assert.equal(key, "DualSubs"); Object.assign(state, JSON.parse(value)); return true; } },
				$request: { method: "GET", url: "https://www.youtube.com/api/timedtext?v=video&lang=en", headers: {} },
				$done: resolve,
			}));
			assert.deepEqual(errors, []);
			const url = new URL(result.url);
			assert.equal(url.searchParams.get("subtype"), storage === "Argument" ? "Translate" : "Official");
			assert.equal(url.searchParams.get("tlang"), storage === "Argument" ? null : "ja");
			assert.deepEqual(JSON.parse(state.Composite.Caches.Playlists.Subtitle), [["video", "en"]]);
		}
});

test("every preferences template independently routes configuration storage requests", async () => {
	for (const name of (await readdir("template")).filter(name => name.endsWith(".handlebars"))) {
		const template = await readFile(`template/${name}`, "utf8");
		if (!template.includes("/api\\/YouTube")) continue;
		const lines = template.split("\n").filter(line => line.includes("dualsubs\\.github\\.io") && line.includes("(?:get|set|delete)"));
		assert.equal(lines.length, 1, `${name}: missing or duplicate storage route`);
		const line = lines[0];
		const pattern = line.includes("pattern=") ? line.match(/pattern=([^,]+)/)[1] : line.match(/(\^https[^\s]+)/)[1];
		const regex = new RegExp(pattern);
		for (const action of ["get", "set", "delete"])
			for (const query of ["", "?version=1"])
				assert.ok(regex.test(`https://dualsubs.github.io/api/${action}${query}`), `${name}: ${action}${query}`);
		for (const route of ["/api/YouTube", "/api/get/", "/preferences/", "/preferences/api/get"])
			assert.equal(regex.test(`https://dualsubs.github.io${route}`), false, `${name}: ${route}`);
		assert.ok(template.includes("https://github.com/NSNanoCat/PreferencePanes/releases/download/v1.3.1/api.js"), name);
		if (/^(?:surge|shadowrocket|loon)/.test(name)) assert.match(line, /requires-body=1/);
		else if (name.startsWith("quantumultx")) assert.match(line, /url script-echo-response/);
		else if (name.startsWith("stash")) {
			const section = template.slice(template.indexOf(line)).split("\n    - match:")[0];
			assert.match(section, /name: PreferencePanes\.API/);
			assert.match(section, /require-body: true/);
			assert.match(template, /PreferencePanes\.API:\n\s+url: https:\/\/github\.com\/NSNanoCat\/PreferencePanes\/releases\/download\/v1\.3\.1\/api\.js/);
		} else if (name.startsWith("egern")) {
			const section = template.slice(template.lastIndexOf("- http_request:", template.indexOf(line))).split("\n- http_")[0];
			assert.match(section, /body_required: true/);
		}
	}
});
