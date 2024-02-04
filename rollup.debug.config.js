import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";

export default [
	{
		input: 'src/YouTube.request.beta.js',
		output: {
			file: 'js/YouTube.request.beta.js',
			format: 'es',
			banner: '/* README: https://github.com/DualSubs */',
		},
		plugins: [json(), commonjs()]
	},
	{
		input: 'src/YouTube.response.beta.js',
		output: {
			file: 'js/YouTube.response.beta.js',
			format: 'es',
			banner: '/* README: https://github.com/DualSubs */',
		},
		plugins: [json(), commonjs()]
	},
];
