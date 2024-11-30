import { $app, Console, done, fetch, Lodash as _, notification, Storage, wait } from "@nsnanocat/util";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";
import { PlayerRequest } from "./protobuf/google/protos/youtube/api/innertube/PlayerRequest.js";
import { BrowseRequest } from "./protobuf/google/protos/youtube/api/innertube/BrowseRequest.js";
// 构造回复数据
let $response = undefined;
Console.debug = () => {};
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
// 获取连接参数
const PATHs = url.pathname.split("/").filter(Boolean);
Console.info(`PATHs: ${PATHs}`);
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
Console.info(`FORMAT: ${FORMAT}`);
!(async () => {
	/**
	 * 设置
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("DualSubs", "YouTube", database);
	// 获取字幕类型与语言
	const Type = url.searchParams.get("subtype") ?? Settings.Type,
		Languages = [url.searchParams.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
	Console.info(`Type: ${Type}`, `Languages: ${Languages}`);
	// 创建空数据
	let body = {};
	// 方法判断
	switch ($request.method) {
		case "POST":
		case "PUT":
		case "PATCH":
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "DELETE":
			// 格式判断
			switch (FORMAT) {
				case undefined: // 视为无body
					break;
				case "application/x-www-form-urlencoded":
				case "text/plain":
				default:
					break;
				case "application/x-mpegURL":
				case "application/x-mpegurl":
				case "application/vnd.apple.mpegurl":
				case "audio/mpegurl":
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					break;
				case "text/vtt":
				case "application/vtt":
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($request.body ?? "{}");
					switch (url.pathname) {
						case "/youtubei/v1/player":
							// 找功能
							if (body?.playbackContext) {
								// 有播放设置
								Console.info("playbackContext");
								if (body?.playbackContext.contentPlaybackContext) {
									// 有播放设置内容
									body.playbackContext.contentPlaybackContext.autoCaptionsDefaultOn = true; // 默认开启自动字幕
								}
							}
							break;
						case "/youtubei/v1/browse":
							if (body?.browseId?.startsWith?.("MPLYt_")) url.searchParams.set("subtype", "Translate");
							break;
					}
					$request.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream": {
					let rawBody = $app === "Quantumult X" ? new Uint8Array($request.bodyBytes ?? []) : ($request.body ?? new Uint8Array());
					switch (FORMAT) {
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
							switch (url.pathname) {
								case "/youtubei/v1/player":
									body = PlayerRequest.fromBinary(rawBody);
									// 找功能
									if (body?.playbackContext) {
										// 有播放设置
										Console.info("playbackContext");
										if (body?.playbackContext.contentPlaybackContext) {
											// 有播放设置内容
											//body.playbackContext.contentPlaybackContext.autoCaptionsDefaultOn = true; // 默认开启自动字幕
											body.playbackContext.contentPlaybackContext.id4 = 1; //
											body.playbackContext.contentPlaybackContext.id6 = 1; //
											body.playbackContext.contentPlaybackContext.id8 = 1; //
											body.playbackContext.contentPlaybackContext.id9 = 1; //
										}
									}
									rawBody = PlayerRequest.toBinary(body);
									break;
								case "/youtubei/v1/browse":
									body = BrowseRequest.fromBinary(rawBody);
									if (body?.browseId?.startsWith?.("MPLYt_")) {
										if (Settings.Types.includes("Translate")) url.searchParams.set("subtype", "Translate");
										else if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
									}
									rawBody = BrowseRequest.toBinary(body);
									break;
							}
							break;
						case "application/grpc":
						case "application/grpc+proto":
							break;
					}
					// 写入二进制数据
					$request.body = rawBody;
					break;
				}
			}
		//break; // 不中断，继续处理URL
		// biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
		case "GET":
			// 主机判断
			switch (url.hostname) {
				case "www.youtube.com":
				case "m.youtube.com":
					// 路径判断
					switch (url.pathname) {
						case "/api/timedtext": {
							const v = url.searchParams.get("v");
							const kind = url.searchParams.get("kind");
							const lang = url.searchParams.get("lang");
							const tlang = url.searchParams.get("tlang");
							Console.info(`v: ${v}`, `kind: ${kind}`, `lang: ${lang}`, `tlang: ${tlang}`);
							if (!tlang) {
								Console.info("翻译语言：未指定");
								// 保存原文语言
								if (v && lang) {
									Caches.Playlists.Subtitle.set(v, lang);
									Caches.Playlists.Subtitle = setCache(Caches?.Playlists.Subtitle, Settings.CacheSize);
									Storage.setItem(`@DualSubs.${"Composite"}.Caches.Playlists.Subtitle`, Caches.Playlists.Subtitle);
								}
								// 自动翻译字幕
								switch (Settings.AutoCC) {
									case true:
									default:
										Console.info("自动翻译字幕：开启");
										if (Caches.tlang) {
											if (Caches.tlang !== lang) url.searchParams.set("tlang", Caches.tlang);
										}
										break;
									case false:
										Console.info("自动翻译字幕：关闭");
										break;
								}
							}
							if (url.searchParams.get("tlang")) {
								Console.info("翻译语言：已指定");
								// 保存目标语言
								Caches.tlang = url.searchParams.get("tlang");
								Storage.setItem(`@DualSubs.${"YouTube"}.Caches.tlang`, Caches.tlang);
								// 字幕类型判断
								switch (Settings.Type) {
									case "Composite":
									case "Official":
									default:
										Console.info("官方字幕：合成器");
										if (lang?.split?.(/[-_]/)?.[0] === url.searchParams.get("tlang")?.split?.(/[-_]/)?.[0]) Settings.ShowOnly = true;
										if (!Settings.ShowOnly) url.searchParams.set("subtype", "Official"); // 官方字幕
										break;
									case "Translate":
										Console.info("翻译字幕：翻译器");
										url.searchParams.delete("tlang");
										url.searchParams.set("subtype", "Translate"); // 翻译字幕
										break;
									case "External":
										Console.info("外部字幕：外部源");
										url.searchParams.delete("tlang");
										url.searchParams.set("subtype", "External"); // 外挂字幕
										break;
								}
							}
							break;
						}
					}
					break;
			}
		case "HEAD":
		case "OPTIONS":
			break;
		case "CONNECT":
		case "TRACE":
			break;
	}
	$request.url = url.toString();
	Console.debug(`$request.url: ${$request.url}`);
})()
	.catch(e => Console.error(e))
	.finally(() => {
		switch (typeof $response) {
			case "object": // 有构造回复数据，返回构造的回复数据
				//Console.debug("finally", `echo $response: ${JSON.stringify($response, null, 2)}`);
				if ($response.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
				switch ($app) {
					default:
						done({ response: $response });
						break;
					case "Quantumult X":
						if (!$response.status) $response.status = "HTTP/1.1 200 OK";
						delete $response.headers?.["Content-Length"];
						delete $response.headers?.["content-length"];
						delete $response.headers?.["Transfer-Encoding"];
						done($response);
						break;
				}
				break;
			case "undefined": // 无构造回复数据，发送修改的请求数据
				//Console.debug("finally", `$request: ${JSON.stringify($request, null, 2)}`);
				done($request);
				break;
			default:
				Console.error(`不合法的 $response 类型: ${typeof $response}`);
				break;
		}
	});
