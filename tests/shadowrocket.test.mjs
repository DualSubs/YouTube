import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const moduleText = await readFile(new URL("../modules/DualSubs.YouTube.srmodule", import.meta.url), "utf8");
const rules = moduleText.split("\n").filter(line => /^DualSubs\..* = type=http-/.test(line));
const composite = rules.find(line => line.startsWith("DualSubs.YouTube.Composite.TimedText.response ="));
const pattern = new RegExp(composite.match(/, pattern=(.*?), requires-body=/)[1]);

test("Shadowrocket runs every YouTube and Universal handler in WebView", () => {
	assert.equal(rules.length, 12);
	for (const rule of rules) {
		assert.match(rule, /, engine=webview,/);
		assert.match(rule, /, timeout=60,/);
	}
	assert.doesNotMatch(moduleText, /archive\/js\/v1\.3\//);
});

test("Shadowrocket composites original translated-caption URLs in any parameter position", () => {
	for (const host of ["www.youtube.com", "m.youtube.com"])
		for (const query of [
			"tlang=zh-Hans&v=video&lang=en",
			"v=video&tlang=zh-Hans&lang=en",
			"v=video&lang=en&tlang=zh-Hans",
			"tlang=zh-Hans",
			"v=video&subtype=Official",
			"subtype=External&v=video",
		]) assert.ok(pattern.test(`https://${host}/api/timedtext?${query}`), query);
});

test("Shadowrocket leaves plain captions and explicit Translate requests out of the compositor", () => {
	for (const query of [
		"v=video&lang=en",
		"v=video&tlang=",
		"subtype=Translate&tlang=zh-Hans",
		"tlang=zh-Hans&subtype=Translate",
		"v=video&subtype=Translate&tlang=zh-Hans&lang=en",
		"v=video&subtype=OfficialOther",
		"v=video&not_tlang=zh-Hans",
	]) assert.equal(pattern.test(`https://www.youtube.com/api/timedtext?${query}`), false, query);
	assert.equal(pattern.test("https://example.com/api/timedtext?tlang=zh-Hans"), false);
});
