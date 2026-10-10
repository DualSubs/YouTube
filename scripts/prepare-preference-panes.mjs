import { mkdir, readFile, writeFile } from "node:fs/promises";
import pkg from "../package.json" with { type: "json" };

const suffix = process.argv.includes("--dev") ? ".dev" : "";
const source = JSON.parse(await readFile(`template/boxjs.panel${suffix}.json`, "utf8"));
const app = { ...source, id: source.id.replace(/\.beta$/, "") };
const version = process.env.BUILD_VERSION || pkg.version || "0.0.0";
const body = JSON.stringify(app);
await mkdir("dist", { recursive: true });
await writeFile(`dist/${app.id}${suffix}.PreferencePanes.json`, body);
const script = `const response = {status:200,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-PreferencePanes-Version":${JSON.stringify(version)}},body:$request.method === "HEAD" ? "" : ${JSON.stringify(body)}};\n$done(typeof $task === "undefined" ? {response} : {...response,status:"HTTP/1.1 200 OK"});\n`;
await writeFile(`dist/config${suffix}.bundle.js`, script);
