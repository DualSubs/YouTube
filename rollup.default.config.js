import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/YouTube.request.js',
		output: {
			file: 'js/YouTube.request.js',
			format: 'es',
			banner: '/* README: https://github.com/DualSubs */',
		},
		plugins: [json(), commonjs(), terser()]
	},
	{
		input: 'src/YouTube.response.js',
		output: {
			file: 'js/YouTube.response.js',
			format: 'es',
			banner: '/* README: https://github.com/DualSubs */',
		},
		plugins: [json(), commonjs(), terser()]
	},
];
