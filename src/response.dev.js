import { $platform, _, Storage, fetch, notification, log, logError, wait, done, getScript, runScript } from "./utils/utils.mjs";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";
import { GetWatchResponse } from "./protobuf/google/protos/youtube/api/innertube/GetWatchResponse.js";
import { PlayerResponse } from "./protobuf/google/protos/youtube/api/innertube/PlayerResponse.js";
import { WireType, UnknownFieldHandler, reflectionMergePartial, MESSAGE_TYPE, MessageType, BinaryReader, isJsonObject, typeofJsonValue, jsonWriteOptions } from "@protobuf-ts/runtime";
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname;
log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}`, "");
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
log(`⚠ FORMAT: ${FORMAT}`, "");
!(async () => {
	/**
	 * 设置
	 * @type {{Settings: import('./types').Settings}}
	 */
	const { Settings, Caches, Configs } = setENV("DualSubs", "YouTube", database);
	log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams.get("subtype") ?? Settings.Type, Languages = [url.searchParams.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 创建空数据
			let body = { "captions": { "playerCaptionsTracklistRenderer": { "captionTracks": [], "audioTracks": [], "translationLanguages": [] } } };
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
					//body = M3U8.parse($response.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = M3U8.stringify(body);
					break;
				case "text/xml":
				case "text/html":
				case "text/plist":
				case "application/xml":
				case "application/plist":
				case "application/x-plist":
					//body = XML.parse($response.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = XML.stringify(body);
					break;
				case "text/vtt":
				case "application/vtt":
					//body = VTT.parse($response.body);
					//log(`🚧 body: ${JSON.stringify(body)}`, "");
					//$response.body = VTT.stringify(body);
					break;
				case "text/json":
				case "application/json":
					body = JSON.parse($response.body ?? "{}");
					switch (PATH) {
						case "/youtubei/v1/player":
							if (body?.captions) body.captions = captions(body.captions, Configs);
							break;
						case "/youtubei/v1/browse":
							break;
					};
					$response.body = JSON.stringify(body);
					break;
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
				case "application/grpc":
				case "application/grpc+proto":
				case "application/octet-stream":
					//log(`🚧 $response: ${JSON.stringify($response, null, 2)}`, "");
					let rawBody = ($platform === "Quantumult X") ? new Uint8Array($response.bodyBytes ?? []) : $response.body ?? new Uint8Array();
					//log(`🚧 isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
					switch (FORMAT) {
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
							switch (PATH) {
								case "/youtubei/v1/get_watch":
									/******************  initialization start  *******************/
									class get_watch_response$Type extends MessageType {
										constructor() {
											super("get_watch_response", [
												{ no: 1, name: "contents", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => GetWatchResponse }
											]);
										}
									}
									const get_watch_response = new get_watch_response$Type();
									/******************  initialization finish  *******************/
									body = get_watch_response.fromBinary(rawBody);
									log(`🚧 body: ${JSON.stringify(body)}`, "");
									if (body?.contents?.[0]?.playerResponse?.captions) body.contents[0].playerResponse.captions = captions(body.contents[0].playerResponse.captions, Configs);
									log(`🚧 body: ${JSON.stringify(body)}`, "");
									rawBody = get_watch_response.toBinary(body);
									break;
								case "/youtubei/v1/player":
									body = PlayerResponse.fromBinary(rawBody);
									log(`🚧 body: ${JSON.stringify(body)}`, "");
									/*
									let UF = UnknownFieldHandler.list(body?.streamingData?.adaptiveFormats[body?.streamingData?.adaptiveFormats?.length - 2]);
									log(`🚧 UF: ${JSON.stringify(UF)}`, "");
									if (UF) {
										UF = UF.map(uf => {
											//uf.no; // 22
											//uf.wireType; // WireType.Varint
											// use the binary reader to decode the raw data:
											let reader = new BinaryReader(uf.data);
											let addedNumber = reader.int32(); // 7777
											log(`🚧 no: ${uf.no}, wireType: ${uf.wireType}, reader: ${reader}, addedNumber: ${addedNumber}`, "");
										});
									};
									*/
									if (body?.captions) body.captions = captions(body.captions, Configs);
									log(`🚧 body: ${JSON.stringify(body)}`, "");
									rawBody = PlayerResponse.toBinary(body);
									break;
								case "/youtubei/v1/browse":
									break;
							};
							break;
						case "application/grpc":
						case "application/grpc+proto":
							break;
					};
					// 写入二进制数据
					$response.body = rawBody;
					break;
			};
			break;
		case false:
			break;
	};
})()
	.catch((e) => logError(e))
	.finally(() => done($response))

/***************** Function *****************/
function captions(captions, configs) {
	console.log(`☑️ Captions`, "");
	if (captions) { // 有基础字幕
		log(`⚠ Captions`, "");
		if (captions?.playerCaptionsRenderer) {	// 有播放器字幕渲染器
			log(`⚠ playerCaptionsRenderer`, "");
			captions.playerCaptionsRenderer.visibility = "ON" // 字幕选项按钮可见
			captions.playerCaptionsRenderer.showAutoCaptions = true; // 包含自动生成的字幕
		}
		if (captions?.playerCaptionsTracklistRenderer) { // 有播放器字幕列表渲染器
			log(`⚠ playerCaptionsTracklistRenderer`, "");
			if (captions?.playerCaptionsTracklistRenderer?.captionTracks) {
				// 改字幕可用性
				captions.playerCaptionsTracklistRenderer.captionTracks = captions?.playerCaptionsTracklistRenderer.captionTracks.map(captionTrack => {
					captionTrack.isTranslatable = true;
					return captionTrack;
				});
			};
			if (captions?.playerCaptionsTracklistRenderer?.audioTracks) {
				// 改音轨可用性
				captions.playerCaptionsTracklistRenderer.audioTracks = captions?.playerCaptionsTracklistRenderer.audioTracks.map(audioTrack => {
					audioTrack.visibility = 2; //"ON"
					audioTrack.hasDefaultTrack = true;
					audioTrack.captionsInitialState = 3; //"CAPTIONS_INITIAL_STATE_ON_RECOMMENDED"
					return audioTrack;
				});
			};
			// 增加自动翻译可用语言
			switch (HOST) {
				case "www.youtube.com":
				case "tv.youtube.com":
				default:
					captions.playerCaptionsTracklistRenderer.translationLanguages = configs.translationLanguages.DESKTOP;
					break;
				case "m.youtube.com":
				case "youtubei.googleapis.com":
					captions.playerCaptionsTracklistRenderer.translationLanguages = configs.translationLanguages.MOBILE;
					break;
			};
			// 改默认字幕索引值，来指定“源语言”，从而启用“自动翻译”
			if (!captions?.playerCaptionsTracklistRenderer?.defaultCaptionTrackIndex) {
				captions.playerCaptionsTracklistRenderer.defaultCaptionTrackIndex = 0;
			};
		};
	};
	log(`✅ Captions`, "");
	return captions;
}
