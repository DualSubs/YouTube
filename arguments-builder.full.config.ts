import { type ArgumentItem, defineConfig } from "@nsnanocat/arguments-builder";

export const output = {
	surge: {
		path: "./dist/DualSubs.YouTube.sgmodule",
		transformEgern: {
			enable: true,
			path: "./dist/DualSubs.YouTube.yaml"
		}
	},
	loon: {
		path: "./dist/DualSubs.YouTube.plugin"
	},
	customItems: [
		{
			path: "./dist/DualSubs.YouTube.snippet",
			template: "./template/quantumultx.handlebars"
		},
		{
			path: "./dist/DualSubs.YouTube.stoverride",
			template: "./template/stash.handlebars"
		}
	],
	dts: {
		isExported: true,
		path: "./src/types.d.ts"
	},
	boxjsSettings: {
		path: "./template/boxjs.settings.json",
		scope: "@DualSubs.YouTube.Settings"
	}
};

export const argType: ArgumentItem = {
	key: "Type",
	name: "[字幕] 启用类型",
	defaultValue: "Official",
	type: "string",
	options: [
		{ key: "Official", label: "官方字幕（合成器）" },
		{ key: "Translate", label: "翻译字幕（翻译器）" }
	],
	description: "请选择要使用的字幕，双语字幕将使用您选择类型呈现。"
};

export const argTypes: ArgumentItem = {
	key: "Types",
	name: "[歌词] 启用类型",
	defaultValue: [
		"Translate"
	],
	type: "array",
	options: [
		{ key: "Translate", label: "翻译歌词（翻译器）" }
	],
	description: "请选择要添加的歌词选项，如果为多选，则会自动决定提供的歌词类型。"
};

export const argAutoCC: ArgumentItem = {
	key: "AutoCC",
	name: "[字幕] 自动显示",
	defaultValue: true,
	type: "boolean",
	description: "是否总是自动开启字幕显示。"
};

export const argPosition: ArgumentItem = {
	key: "Position",
	name: "[字幕] 主语言（源语言）字幕位置",
	defaultValue: "Forward",
	type: "string",
	options: [
		{ key: "Forward", label: "上面（第一行）" },
		{ key: "Reverse", label: "下面（第二行）" }
	],
	description: "主语言（源语言）字幕的显示位置。"
};

export const argVendor: ArgumentItem = {
	key: "Vendor",
	name: "[翻译器] 服务商API",
	defaultValue: "Google",
	type: "string",
	description: "请选择翻译器所使用的服务商API，更多翻译选项请使用BoxJs。",
	options: [
		{ key: "Google", label: "Google Translate" },
		{ key: "Microsoft", label: "Microsoft Translator（需填写API）" }
	]
};

export const argShowOnly: ArgumentItem = {
	key: "ShowOnly",
	name: "[翻译器] 只显示“自动翻译”字幕",
	defaultValue: false,
	type: "boolean",
	description: "是否仅显示“自动翻译”字幕，不显示源语言字幕。"
};

export const argLogLevel: ArgumentItem = {
	key: "LogLevel",
	name: "[调试] 日志等级",
	type: "string",
	defaultValue: "WARN",
	description: "选择脚本日志的输出等级，低于所选等级的日志将全部输出。",
	options: [
		{ key: "OFF", label: "关闭" },
		{ key: "ERROR", label: "❌ 错误" },
		{ key: "WARN", label: "⚠️ 警告" },
		{ key: "INFO", label: "ℹ️ 信息" },
		{ key: "DEBUG", label: "🅱️ 调试" },
		{ key: "ALL", label: "全部" }
	]
};

export const panelYouTubeTypesDev: ArgumentItem = {
	...argTypes,
	defaultValue: [
		"Translate",
		"External"
	],
	options: [
		{ key: "Translate", label: "翻译歌词（翻译器）" },
		{ key: "External", label: "外部歌词（外部源）" }
	]
};

export const moduleArgs: ArgumentItem[] = [argType, argTypes, argAutoCC, argPosition, argVendor, argShowOnly, argLogLevel];

export default defineConfig({ output, args: moduleArgs });
