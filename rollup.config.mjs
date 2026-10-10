import { readFile } from "node:fs/promises";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" with { type: "json" };

/**
 * 从同次构建的 JSON 生成纯配置响应。 / Emit config-only responses from this build's JSON.
 * @param {string} [suffix] 开发版后缀 / Development suffix.
 * @returns {import("rollup").Plugin} 配置产物插件 / Configuration artifact plugin.
 */
export function configAsset(suffix = "") {
	return {
		name: "boxjs-config",
		async generateBundle() {
			const metadata = JSON.parse(await readFile(`template/boxjs.panel${suffix}.json`, "utf8"));
			const version = process.env.BUILD_VERSION || pkg.version || "dev";
			for (const app of [metadata]) {
				const id = app.id.replace(/\.beta$/, "");
				const body = await readFile(`./dist/${id}${suffix}.PreferencePanes.json`, "utf8");
				const source = `const response = {status: 200, headers: {"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-PreferencePanes-Version":${JSON.stringify(version)}}, body: $request.method === "HEAD" ? "" : ${JSON.stringify(body)}};\n$done(typeof $task === "undefined" ? {response} : {...response, status:"HTTP/1.1 200 OK"});\n`;
				this.emitFile({ type: "asset", fileName: `config${suffix}.bundle.js`, source });
			}
		},
	};
}

const banner = chunk =>
	`console.log('Date: ${new Date().toLocaleString("zh-CN", { timeZone: "PRC" })}');\nconsole.log('Version: ${process.env.BUILD_VERSION || pkg.version || "dev"}');\nconsole.log('${chunk.fileName}');\nconsole.log('${pkg.displayName}');\n/* 项目主页：${pkg.homepage} */\n/* Project homepage: ${pkg.homepage} */`;

export default [
	{ input: "./src/request.js", output: { file: "./dist/request.bundle.js", format: "es", banner }, plugins: [nodeResolve(), terser(), configAsset()] },
	{ input: "./src/response.js", output: { file: "./dist/response.bundle.js", format: "es", banner }, plugins: [nodeResolve(), terser()] },
];
