import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
	{
		input: "src/YouTube.request.beta.js",
		output: {
			file: "js/YouTube.request.beta.js",
			format: "es",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿 DualSubs: ▶ YouTube β Request')",
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
	{
		input: "src/YouTube.response.beta.js",
		output: {
			file: "js/YouTube.response.beta.js",
			format: "es",
			banner: "/* README: https://github.com/DualSubs */\nconsole.log('🍿 DualSubs: ▶ YouTube β Response')",
		},
		plugins: [json(), commonjs(), nodeResolve()]
	},
];
