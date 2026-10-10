import { defineConfig } from "@iringo/arguments-builder";
import config from "./arguments-builder.config";

export default defineConfig({
	...config,
	output: {
		...config.output,
		surge: {
			...config.output.surge,
			path: "./dist/DualSubs.YouTube.dev.sgmodule",
			template: "./template/surge.dev.handlebars",
			transformEgern: { enable: true, path: "./dist/DualSubs.YouTube.dev.yaml" },
		},
		loon: { path: "./dist/DualSubs.YouTube.dev.plugin", template: "./template/loon.dev.handlebars" },
		customItems: config.output.customItems.map(item => ({
			...item,
			path: item.path.replace("DualSubs.YouTube.", "DualSubs.YouTube.dev."),
			template: item.template.replace(".handlebars", ".dev.handlebars"),
		})),
		boxjsSettings: { path: "./dist/DualSubs.YouTube.dev.boxjs.json", scope: "@DualSubs.YouTube.Settings" },
	},
});
