import { defineConfig } from "@nsnanocat/arguments-builder";
import { argAutoCC, argLogLevel, argShowOnly, argType, argTypes, panelYouTubeTypesDev } from "./arguments-builder.full.config.ts";

export const panels = [
	{ id: "DualSubs.YouTube", scope: "@DualSubs.YouTube.Settings", args: [argType, argTypes, argAutoCC, argShowOnly, argLogLevel] },
];

export const devPanels = [
	{ id: "DualSubs.YouTube", scope: "@DualSubs.YouTube.Settings", args: [argType, panelYouTubeTypesDev, argAutoCC, argShowOnly, argLogLevel] },
];

export default defineConfig({ args: panels[0].args });
