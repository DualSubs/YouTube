import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
	{
		input: "src/YouTube.request.js",
		output: {
			file: "js/YouTube.request.js",
			format: "es",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿 DualSubs: ▶ YouTube Request')",
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
	{
		input: "src/YouTube.response.js",
		output: {
			file: "js/YouTube.response.js",
			format: "es",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿 DualSubs: ▶ YouTube Response')",
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	},
];
