import { defineConfig } from "@iringo/arguments-builder";

export default defineConfig({
	output: {
		surge: {
			path: "./dist/DualSubs.YouTube.sgmodule",
		},
		loon: {
			path: "./dist/DualSubs.YouTube.plugin",
		},
		customItems: [
			{
				path: "./dist/DualSubs.YouTube.snippet",
				template: "./template/quantumultx.handlebars",
			},
			{
				path: "./dist/DualSubs.YouTube.stoverride",
				template: "./template/stash.handlebars",
			},
			{
				path: "./dist/DualSubs.YouTube.yaml",
				template: "./template/egern.handlebars",
			},
		],
		dts: {
			isExported: true,
			path: "./src/types.d.ts",
		},
		boxjsSettings: {
			path: "./template/boxjs.settings.json",
			scope: "@DualSubs.YouTube.Settings",
		},
	},
	args: [
		{
			key: "Switch",
			name: "总功能开关",
			defaultValue: true,
			type: "boolean",
			description: "是否启用此APP修改",
			exclude: ["surge", "loon"],
		},
		{
			key: "Type",
			name: "[字幕] 启用类型",
			defaultValue: "Official",
			type: "string",
			options: [
				{
					key: "Official",
					label: "官方字幕（合成器）",
				},
				{
					key: "Translate",
					label: "翻译字幕（翻译器）",
				},
			],
			description: "请选择要使用的字幕，双语字幕将使用您选择类型呈现。",
		},
		{
			key: "Types",
			name: "[歌词] 启用类型",
			defaultValue: ["Translate"],
			type: "array",
			options: [
				{
					key: "Translate",
					label: "翻译歌词（翻译器）",
				},
			],
			description:
				"请选择要添加的歌词选项，如果为多选，则会自动决定提供的歌词类型。",
		},
		{
			key: "AutoCC",
			name: "[字幕] 自动显示",
			defaultValue: true,
			type: "boolean",
			description: "是否总是自动开启字幕显示。",
		},
		{
			key: "Position",
			name: "[字幕] 主语言（源语言）字幕位置",
			defaultValue: "Forward",
			type: "string",
			options: [
				{
					key: "Forward",
					label: "上面（第一行）",
				},
				{
					key: "Reverse",
					label: "下面（第二行）",
				},
			],
			description: "主语言（源语言）字幕的显示位置。",
		},
		{
			key: "Languages[0]",
			name: "[翻译器] 主语言（源语言）",
			defaultValue: "AUTO",
			type: "string",
			boxJsType: "selects",
			description:
				"仅当源语言识别不准确时更改此选项。",
			options: [
				{
					"key": "AUTO",
					"label": "自动 - Automatic"
				},
				{
					"key": "ZH",
					"label": "中文（自动）"
				},
				{
					"key": "ZH-HANS",
					"label": "中文（简体）"
				},
				{
					"key": "ZH-HK",
					"label": "中文（香港）"
				},
				{
					"key": "ZH-HANT",
					"label": "中文（繁体）"
				},
				{
					"key": "EN",
					"label": "English - 英语（自动）"
				},
				{
					"key": "ES",
					"label": "Español - 西班牙语（自动）"
				},
				{
					"key": "JA",
					"label": "日本語 - 日语"
				},
				{
					"key": "KO",
					"label": "한국어 - 韩语"
				},
				{
					"key": "DE",
					"label": "Deutsch - 德语"
				},
				{
					"key": "FR",
					"label": "Français - 法语"
				},
				{
					"key": "TR",
					"label": "Türkçe - 土耳其语"
				},
				{
					"key": "KM",
					"label": "ភាសាខ្មែរ - 高棉语"
				}
			],
		},
		{
			key: "Languages[1]",
			name: "[翻译器] 副语言（目标语言）",
			defaultValue: "ZH",
			type: "string",
			boxJsType: "selects",
			description:
				"请指定翻译歌词的目标语言。",
			options: [
				{
					"key": "ZH",
					"label": "中文（自动）"
				},
				{
					"key": "ZH-HANS",
					"label": "中文（简体）"
				},
				{
					"key": "ZH-HK",
					"label": "中文（香港）"
				},
				{
					"key": "ZH-HANT",
					"label": "中文（繁体）"
				},
				{
					"key": "EN",
					"label": "English - 英语（自动）"
				},
				{
					"key": "EN-US",
					"label": "英语（美国）"
				},
				{
					"key": "ES",
					"label": "Español - 西班牙语（自动）"
				},
				{
					"key": "ES-ES",
					"label": "Español - 西班牙语"
				},
				{
					"key": "ES-419",
					"label": "西班牙语（拉丁美洲）"
				},
				{
					"key": "JA",
					"label": "日本語 - 日语"
				},
				{
					"key": "KO",
					"label": "한국어 - 韩语"
				},
				{
					"key": "DE",
					"label": "Deutsch - 德语"
				},
				{
					"key": "FR",
					"label": "Français - 法语"
				},
				{
					"key": "TR",
					"label": "Türkçe - 土耳其语"
				},
				{
					"key": "KM",
					"label": "ភាសាខ្មែរ - 高棉语"
				}
			],
		},
		{
			key: "Vendor",
			name: "[翻译器] 服务商API",
			defaultValue: "Google",
			type: "string",
			description: "请选择翻译器所使用的服务商API，更多翻译选项请使用BoxJs。",
			options: [
				{
					key: "Google",
					label: "Google Translate",
				},
				{
					key: "Microsoft",
					label: "Microsoft Translator（需填写API）",
				},
			],
		},
		{
			key: "ShowOnly",
			name: "[翻译器] 只显示“自动翻译”字幕",
			defaultValue: false,
			type: "boolean",
			description: "是否仅显示“自动翻译”后的字幕，不显示源语言字幕。",
		},
	],
});
