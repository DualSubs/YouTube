import { defineConfig } from "@iringo/arguments-builder";

export default defineConfig({
	output: {
		surge: {
			path: "./dist/YouTube.sgmodule",
		},
		loon: {
			path: "./dist/YouTube.plugin",
		},
		customItems: [
			{
				path: "./dist/YouTube.snippet",
				template: "./template/quantumultx.handlebars",
			},
			{
				path: "./dist/YouTube.stoverride",
				template: "./template/stash.handlebars",
			},
			{
				path: "./dist/YouTube.yaml",
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
			name: "[字幕]启用类型",
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
			name: "[歌词]启用类型",
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
			name: "[字幕]自动显示",
			defaultValue: true,
			type: "boolean",
			description: "是否总是自动开启字幕显示。",
		},
		{
			key: "ShowOnly",
			name: "[字幕]只显示“自动翻译”字幕",
			defaultValue: false,
			type: "boolean",
			description: "是否仅显示“自动翻译”后的字幕，不显示源语言字幕。",
		},
		{
			key: "Position",
			name: "[字幕]主语言（源语言）字幕位置",
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
	],
});
