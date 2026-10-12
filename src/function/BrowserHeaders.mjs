import { fetch, Storage } from "@nsnanocat/util";

/**
 * 获取并缓存 YouTube 浏览器的 User-Agent 与 Cookie 请求头。
 */
export default class BrowserHeaders {
	static async getHeader() {
		const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
		const cacheKey = "@DualSubs.YouTube.Caches.Cookies";
		let cache = Storage.getItem(cacheKey);
		if (!cache || cache.expires <= Date.now()) {
			const response = await fetch({
				url: "https://www.youtube.com/sw.js",
				headers: { "User-Agent": userAgent, Referer: "https://www.youtube.com/", Accept: "*/*", "Accept-Language": "en-US, en;q=0.9" },
				redirection: true,
				"auto-cookie": false,
			});
			if (response.status !== 200) throw new Error(`获取浏览器 Cookie 失败：HTTP ${response.status}`);
			const setCookies = Object.entries(response.headers).find(([name]) => name.toLowerCase() === "set-cookie")?.[1];
			const cookies = new Map();
			let expires = Infinity;
			// Expires 日期含逗号，只在下一个 Cookie 的 name=value 前拆分。
			for (const entry of (Array.isArray(setCookies) ? setCookies.join(", ") : (setCookies ?? "")).split(/,(?=\s*[^=;,\s]+=)/)) {
				const [cookie, ...attributes] = entry.trim().split(";");
				const name = cookie.split("=", 1)[0];
				if (!["YSC", "VISITOR_INFO1_LIVE", "VISITOR_PRIVACY_METADATA", "__Secure-ROLLOUT_TOKEN"].includes(name) || !cookie.slice(name.length + 1)) continue;
				cookies.set(name, cookie);
				const expiration = attributes.find(attribute => attribute.trim().toLowerCase().startsWith("expires="));
				if (expiration) expires = Math.min(expires, Date.parse(expiration.trim().slice(8)));
			}
			if (cookies.size !== 4) throw new Error("获取浏览器 Cookie 失败：未取得完整的四项 Cookie");
			if (!Number.isFinite(expires) || expires <= Date.now()) throw new Error("获取浏览器 Cookie 失败：有效期无效或已过期");
			cache = { cookie: [...cookies.values()].join("; "), expires };
			Storage.setItem(cacheKey, cache);
		}
		return { "User-Agent": userAgent, Cookie: cache.cookie };
	}

	static async setHeader(headers) {
		const browserHeaders = await this.getHeader();
		for (const name of Object.keys(headers)) {
			if (["user-agent", "cookie"].includes(name.toLowerCase())) delete headers[name];
		}
		return Object.assign(headers, browserHeaders);
	}
}
