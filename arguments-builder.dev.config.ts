import { defineConfig } from "@nsnanocat/arguments-builder";
import { moduleArgs } from "./arguments-builder.full.config.ts";

export default defineConfig({
	output: {
		surge: {
			path: "./dist/DualSubs.YouTube.dev.sgmodule",
			template: "./template/surge.dev.handlebars",
			transformEgern: {
				enable: true,
				path: "./dist/DualSubs.YouTube.dev.yaml"
			}
		},
		loon: {
			path: "./dist/DualSubs.YouTube.dev.plugin",
			template: "./template/loon.dev.handlebars"
		},
		customItems: [
			{
				path: "./dist/DualSubs.YouTube.dev.snippet",
				template: "./template/quantumultx.dev.handlebars"
			},
			{
				path: "./dist/DualSubs.YouTube.dev.stoverride",
				template: "./template/stash.dev.handlebars"
			}
		],
		boxjsSettings: {
			path: "./dist/DualSubs.YouTube.dev.boxjs.json",
			scope: "@DualSubs.YouTube.Settings"
		}
	},
	args: moduleArgs,
});
