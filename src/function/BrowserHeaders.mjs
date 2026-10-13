import { fetch, Storage } from "@nsnanocat/util";

/**
 * 获取并缓存 YouTube 浏览器的 User-Agent 与 Cookie 请求头。
 */
export default class BrowserHeaders {
	static userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

	static async getHeader() {
		let cookie = Storage.getItem("@DualSubs.YouTube.Caches.Cookies");
		let expires = Storage.getItem("@DualSubs.YouTube.Caches.Expires", 0);
		if (!cookie || expires <= Date.now()) {
			const response = await fetch({
				url: "https://www.youtube.com/sw.js",
				headers: { "User-Agent": this.userAgent, Referer: "https://www.youtube.com/", Accept: "*/*", "Accept-Language": "en-US, en;q=0.9" },
				redirection: true,
				"auto-cookie": false,
			});
			if (response.status !== 200) throw new Error(`获取浏览器 Cookie 失败：HTTP ${response.status}`);
			const entries = getCookieEntries(response.headers);
			cookie = getCookieString(entries);
			expires = getCookieExpires(entries);
			Storage.setItem("@DualSubs.YouTube.Caches.Cookies", cookie);
			Storage.setItem("@DualSubs.YouTube.Caches.Expires", expires);
		}
		return cookie;
	}

	static async setHeader(headers) {
		switch (false) {
			case !headers.Cookie: // 已有 Cookie，保留原请求头。
				break;
			case !headers.cookie: // 已有 cookie，保留原请求头。
				break;
			case !headers["User-Agent"]: // 无 Cookie，按原 UA 使用大写名称。
				headers.Cookie = await this.getHeader();
				headers["User-Agent"] = this.userAgent;
				break;
			case !headers["user-agent"]: // 无 Cookie，按原 UA 使用小写名称。
				headers.cookie = await this.getHeader();
				headers["user-agent"] = this.userAgent;
				break;
		}
		return headers;
	}
}

function getCookieEntries(headers) {
	const setCookies = Object.entries(headers).find(([name]) => name.toLowerCase() === "set-cookie")?.[1];
	// Expires 日期含逗号，只在下一个 Cookie 的 name=value 前拆分。
	return (Array.isArray(setCookies) ? setCookies.join(", ") : (setCookies ?? ""))
		.split(/,(?=\s*[^=;,\s]+=)/)
		.filter(entry => {
			const cookie = entry.trim().split(";", 1)[0];
			const name = cookie.split("=", 1)[0];
			return ["YSC", "VISITOR_INFO1_LIVE", "VISITOR_PRIVACY_METADATA", "__Secure-ROLLOUT_TOKEN"].includes(name) && cookie.slice(name.length + 1);
		});
}

function getCookieString(entries) {
	const cookies = new Map();
	for (const entry of entries) {
		const cookie = entry.trim().split(";", 1)[0];
		cookies.set(cookie.split("=", 1)[0], cookie);
	}
	if (cookies.size !== 4) throw new Error("获取浏览器 Cookie 失败：未取得完整的四项 Cookie");
	return [...cookies.values()].join("; ");
}

function getCookieExpires(entries) {
	let expires = Infinity;
	for (const entry of entries) {
		const expiration = entry.split(";").slice(1).find(attribute => attribute.trim().toLowerCase().startsWith("expires="));
		if (expiration) expires = Math.min(expires, Date.parse(expiration.trim().slice(8)));
	}
	if (!Number.isFinite(expires) || expires <= Date.now()) throw new Error("获取浏览器 Cookie 失败：有效期无效或已过期");
	return expires;
}
