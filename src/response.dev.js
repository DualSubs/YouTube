import { $app, Console, done, Lodash as _ } from "@nsnanocat/util";
import database from "./function/database.mjs";
import setENV from "./function/setENV.mjs";
import setCache from "./function/setCache.mjs";
import setCaptions from "./function/setCaptions.mjs";
import { GetWatchResponse } from "./protobuf/google/protos/youtube/api/innertube/GetWatchResponse.js";
import { PlayerResponse } from "./protobuf/google/protos/youtube/api/innertube/PlayerResponse.js";
import { WireType, UnknownFieldHandler, reflectionMergePartial, MESSAGE_TYPE, MessageType, BinaryReader, isJsonObject, typeofJsonValue, jsonWriteOptions } from "@protobuf-ts/runtime";
Console.logLevel = "DEBUG";
/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
Console.info(`url: ${url.toJSON()}`);
// 获取连接参数
const PATHs = url.pathname.split("/").filter(Boolean);
Console.info(`PATHs: ${PATHs}`);
// 解析格式
const FORMAT = ($response.headers?.["Content-Type"] ?? $response.headers?.["content-type"])?.split(";")?.[0];
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
	let body = {
		captions: {
			playerCaptionsTracklistRenderer: {
				captionTracks: [],
				audioTracks: [],
				translationLanguages: [],
			},
		},
	};
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
			//Console.debug(`body: ${JSON.stringify(body)}`);
			//$response.body = M3U8.stringify(body);
			break;
		case "text/xml":
		case "text/html":
		case "text/plist":
		case "application/xml":
		case "application/plist":
		case "application/x-plist":
			//body = XML.parse($response.body);
			//Console.debug(`body: ${JSON.stringify(body)}`);
			//$response.body = XML.stringify(body);
			break;
		case "text/vtt":
		case "application/vtt":
			//body = VTT.parse($response.body);
			//Console.debug(`body: ${JSON.stringify(body)}`);
			//$response.body = VTT.stringify(body);
			break;
		case "text/json":
		case "application/json":
			body = JSON.parse($response.body ?? "{}");
			switch (url.pathname) {
				case "/youtubei/v1/player":
					if (body?.captions) body.captions = setCaptions(body.captions, Configs.translationLanguages, url.hostname);
					break;
				case "/youtubei/v1/browse":
					break;
			}
			$response.body = JSON.stringify(body);
			break;
		case "application/protobuf":
		case "application/x-protobuf":
		case "application/vnd.google.protobuf":
		case "application/grpc":
		case "application/grpc+proto":
		case "application/octet-stream": {
			//Console.debug(`$response: ${JSON.stringify($response, null, 2)}`);
			let rawBody = $app === "Quantumult X" ? new Uint8Array($response.bodyBytes ?? []) : ($response.body ?? new Uint8Array());
			//Console.debug(`isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`);
			switch (FORMAT) {
				case "application/protobuf":
				case "application/x-protobuf":
				case "application/vnd.google.protobuf":
					switch (url.pathname) {
						case "/youtubei/v1/get_watch": {
							/******************  initialization start  *******************/
							class get_watch_response$Type extends MessageType {
								constructor() {
									super("get_watch_response", [
										{
											no: 1,
											name: "contents",
											kind: "message",
											repeat: 1 /*RepeatType.PACKED*/,
											T: () => GetWatchResponse,
										},
									]);
								}
							}
							const get_watch_response = new get_watch_response$Type();
							/******************  initialization finish  *******************/
							body = get_watch_response.fromBinary(rawBody);
							Console.debug(`body: ${JSON.stringify(body)}`);
							if (body?.contents?.[0]?.playerResponse?.captions) body.contents[0].playerResponse.captions = setCaptions(body.contents[0].playerResponse.captions, Configs.translationLanguages, url.hostname);
							Console.debug(`body: ${JSON.stringify(body)}`);
							rawBody = get_watch_response.toBinary(body);
							break;
						}
						case "/youtubei/v1/player":
							body = PlayerResponse.fromBinary(rawBody);
							Console.debug(`body: ${JSON.stringify(body)}`);
							/*
							let UF = UnknownFieldHandler.list(body?.streamingData?.adaptiveFormats[body?.streamingData?.adaptiveFormats?.length - 2]);
							Console.debug(`UF: ${JSON.stringify(UF)}`);
							if (UF) {
								UF = UF.map(uf => {
									//uf.no; // 22
									//uf.wireType; // WireType.Varint
									// use the binary reader to decode the raw data:
									let reader = new BinaryReader(uf.data);
									let addedNumber = reader.int32(); // 7777
									Console.debug(`no: ${uf.no}, wireType: ${uf.wireType}, reader: ${reader}, addedNumber: ${addedNumber}`);
								});
							};
							*/
							if (body?.captions) body.captions = setCaptions(body.captions, Configs.translationLanguages, url.hostname);
							Console.debug(`body: ${JSON.stringify(body)}`);
							rawBody = PlayerResponse.toBinary(body);
							break;
						case "/youtubei/v1/browse":
							break;
					}
					break;
				case "application/grpc":
				case "application/grpc+proto":
					break;
			}
			// 写入二进制数据
			$response.body = rawBody;
			break;
		}
	}
})()
	.catch(e => Console.error(e))
	.finally(() => done($response));
