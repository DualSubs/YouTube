/* README: https://github.com/DualSubs */
/* https://www.lodashjs.com */
class Lodash {
	static name = "Lodash";
	static version = "1.2.2";
	static about() { return console.log(`\n🟧 ${this.name} v${this.version}\n`) };

	static get(object = {}, path = "", defaultValue = undefined) {
		// translate array case to dot case, then split with .
		// a[0].b -> a.0.b -> ['a', '0', 'b']
		if (!Array.isArray(path)) path = this.toPath(path);

		const result = path.reduce((previousValue, currentValue) => {
			return Object(previousValue)[currentValue]; // null undefined get attribute will throwError, Object() can return a object 
		}, object);
		return (result === undefined) ? defaultValue : result;
	}

	static set(object = {}, path = "", value) {
		if (!Array.isArray(path)) path = this.toPath(path);
		path
			.slice(0, -1)
			.reduce(
				(previousValue, currentValue, currentIndex) =>
					(Object(previousValue[currentValue]) === previousValue[currentValue])
						? previousValue[currentValue]
						: previousValue[currentValue] = (/^\d+$/.test(path[currentIndex + 1]) ? [] : {}),
				object
			)[path[path.length - 1]] = value;
		return object
	}

	static unset(object = {}, path = "") {
		if (!Array.isArray(path)) path = this.toPath(path);
		let result = path.reduce((previousValue, currentValue, currentIndex) => {
			if (currentIndex === path.length - 1) {
				delete previousValue[currentValue];
				return true
			}
			return Object(previousValue)[currentValue]
		}, object);
		return result
	}

	static toPath(value) {
		return value.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
	}

	static escape(string) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		};
		return string.replace(/[&<>"']/g, m => map[m])
	};

	static unescape(string) {
		const map = {
			'&amp;': '&',
			'&lt;': '<',
			'&gt;': '>',
			'&quot;': '"',
			'&#39;': "'",
		};
		return string.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, m => map[m])
	}

}

/* https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/setItem */
class $Storage {
	static name = "$Storage";
	static version = "1.0.9";
	static about() { return console.log(`\n🟧 ${this.name} v${this.version}\n`) };
	static data = null
	static dataFile = 'box.dat'
	static #nameRegex = /^@(?<key>[^.]+)(?:\.(?<path>.*))?$/;

	static #platform() {
		if ('undefined' !== typeof $environment && $environment['surge-version'])
			return 'Surge'
		if ('undefined' !== typeof $environment && $environment['stash-version'])
			return 'Stash'
		if ('undefined' !== typeof module && !!module.exports) return 'Node.js'
		if ('undefined' !== typeof $task) return 'Quantumult X'
		if ('undefined' !== typeof $loon) return 'Loon'
		if ('undefined' !== typeof $rocket) return 'Shadowrocket'
		if ('undefined' !== typeof Egern) return 'Egern'
	}

    static getItem(keyName = new String, defaultValue = null) {
        let keyValue = defaultValue;
        // 如果以 @
		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				//console.log(`1: ${key}, ${path}`);
				keyName = key;
				let value = this.getItem(keyName, {});
				//console.log(`2: ${JSON.stringify(value)}`)
				if (typeof value !== "object") value = {};
				//console.log(`3: ${JSON.stringify(value)}`)
				keyValue = Lodash.get(value, path);
				//console.log(`4: ${JSON.stringify(keyValue)}`)
				try {
					keyValue = JSON.parse(keyValue);
				} catch (e) {
					// do nothing
				}				//console.log(`5: ${JSON.stringify(keyValue)}`)
				break;
			default:
				switch (this.#platform()) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						keyValue = $persistentStore.read(keyName);
						break;
					case 'Quantumult X':
						keyValue = $prefs.valueForKey(keyName);
						break;
					case 'Node.js':
						this.data = this.#loaddata(this.dataFile);
						keyValue = this.data?.[keyName];
						break;
					default:
						keyValue = this.data?.[keyName] || null;
						break;
				}				try {
					keyValue = JSON.parse(keyValue);
				} catch (e) {
					// do nothing
				}				break;
		}		return keyValue ?? defaultValue;
    };

	static setItem(keyName = new String, keyValue = new String) {
		let result = false;
		//console.log(`0: ${typeof keyValue}`);
		switch (typeof keyValue) {
			case "object":
				keyValue = JSON.stringify(keyValue);
				break;
			default:
				keyValue = String(keyValue);
				break;
		}		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				//console.log(`1: ${key}, ${path}`);
				keyName = key;
				let value = this.getItem(keyName, {});
				//console.log(`2: ${JSON.stringify(value)}`)
				if (typeof value !== "object") value = {};
				//console.log(`3: ${JSON.stringify(value)}`)
				Lodash.set(value, path, keyValue);
				//console.log(`4: ${JSON.stringify(value)}`)
				result = this.setItem(keyName, value);
				//console.log(`5: ${result}`)
				break;
			default:
				switch (this.#platform()) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						result = $persistentStore.write(keyValue, keyName);
						break;
					case 'Quantumult X':
						result =$prefs.setValueForKey(keyValue, keyName);
						break;
					case 'Node.js':
						this.data = this.#loaddata(this.dataFile);
						this.data[keyName] = keyValue;
						this.#writedata(this.dataFile);
						result = true;
						break;
					default:
						result = this.data?.[keyName] || null;
						break;
				}				break;
		}		return result;
	};

    static removeItem(keyName){
		let result = false;
		switch (keyName.startsWith('@')) {
			case true:
				const { key, path } = keyName.match(this.#nameRegex)?.groups;
				keyName = key;
				let value = this.getItem(keyName);
				if (typeof value !== "object") value = {};
				keyValue = Lodash.unset(value, path);
				result = this.setItem(keyName, value);
				break;
			default:
				switch (this.#platform()) {
					case 'Surge':
					case 'Loon':
					case 'Stash':
					case 'Egern':
					case 'Shadowrocket':
						result = false;
						break;
					case 'Quantumult X':
						result = $prefs.removeValueForKey(keyName);
						break;
					case 'Node.js':
						result = false;
						break;
					default:
						result = false;
						break;
				}				break;
		}		return result;
    }

    static clear() {
		let result = false;
		switch (this.#platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Egern':
			case 'Shadowrocket':
				result = false;
				break;
			case 'Quantumult X':
				result = $prefs.removeAllValues();
				break;
			case 'Node.js':
				result = false;
				break;
			default:
				result = false;
				break;
		}		return result;
    }

	static #loaddata(dataFile) {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs');
			this.path = this.path ? this.path : require('path');
			const curDirDataFilePath = this.path.resolve(dataFile);
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				dataFile
			);
			const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
			const isRootDirDataFile =
				!isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
			if (isCurDirDataFile || isRootDirDataFile) {
				const datPath = isCurDirDataFile
					? curDirDataFilePath
					: rootDirDataFilePath;
				try {
					return JSON.parse(this.fs.readFileSync(datPath))
				} catch (e) {
					return {}
				}
			} else return {}
		} else return {}
	}

	static #writedata(dataFile = this.dataFile) {
		if (this.isNode()) {
			this.fs = this.fs ? this.fs : require('fs');
			this.path = this.path ? this.path : require('path');
			const curDirDataFilePath = this.path.resolve(dataFile);
			const rootDirDataFilePath = this.path.resolve(
				process.cwd(),
				dataFile
			);
			const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath);
			const isRootDirDataFile =
				!isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath);
			const jsondata = JSON.stringify(this.data);
			if (isCurDirDataFile) {
				this.fs.writeFileSync(curDirDataFilePath, jsondata);
			} else if (isRootDirDataFile) {
				this.fs.writeFileSync(rootDirDataFilePath, jsondata);
			} else {
				this.fs.writeFileSync(curDirDataFilePath, jsondata);
			}
		}
	};

}

class ENV {
	static name = "ENV"
	static version = '1.8.3'
	static about() { return console.log(`\n🟧 ${this.name} v${this.version}\n`) }

	constructor(name, opts) {
		console.log(`\n🟧 ${ENV.name} v${ENV.version}\n`);
		this.name = name;
		this.logs = [];
		this.isMute = false;
		this.isMuteLog = false;
		this.logSeparator = '\n';
		this.encoding = 'utf-8';
		this.startTime = new Date().getTime();
		Object.assign(this, opts);
		this.log(`\n🚩 开始!\n${name}\n`);
	}
	
	environment() {
		switch (this.platform()) {
			case 'Surge':
				$environment.app = 'Surge';
				return $environment
			case 'Stash':
				$environment.app = 'Stash';
				return $environment
			case 'Egern':
				$environment.app = 'Egern';
				return $environment
			case 'Loon':
				let environment = $loon.split(' ');
				return {
					"device": environment[0],
					"ios": environment[1],
					"loon-version": environment[2],
					"app": "Loon"
				};
			case 'Quantumult X':
				return {
					"app": "Quantumult X"
				};
			case 'Node.js':
				process.env.app = 'Node.js';
				return process.env
			default:
				return {}
		}
	}

	platform() {
		if ('undefined' !== typeof $environment && $environment['surge-version'])
			return 'Surge'
		if ('undefined' !== typeof $environment && $environment['stash-version'])
			return 'Stash'
		if ('undefined' !== typeof module && !!module.exports) return 'Node.js'
		if ('undefined' !== typeof $task) return 'Quantumult X'
		if ('undefined' !== typeof $loon) return 'Loon'
		if ('undefined' !== typeof $rocket) return 'Shadowrocket'
		if ('undefined' !== typeof Egern) return 'Egern'
	}

	isNode() {
		return 'Node.js' === this.platform()
	}

	isQuanX() {
		return 'Quantumult X' === this.platform()
	}

	isSurge() {
		return 'Surge' === this.platform()
	}

	isLoon() {
		return 'Loon' === this.platform()
	}

	isShadowrocket() {
		return 'Shadowrocket' === this.platform()
	}

	isStash() {
		return 'Stash' === this.platform()
	}

	isEgern() {
		return 'Egern' === this.platform()
	}

	async getScript(url) {
		return await this.fetch(url).then(response => response.body);
	}

	async runScript(script, runOpts) {
		let httpapi = $Storage.getItem('@chavy_boxjs_userCfgs.httpapi');
		httpapi = httpapi?.replace?.(/\n/g, '')?.trim();
		let httpapi_timeout = $Storage.getItem('@chavy_boxjs_userCfgs.httpapi_timeout');
		httpapi_timeout = (httpapi_timeout * 1) ?? 20;
		httpapi_timeout = runOpts?.timeout ?? httpapi_timeout;
		const [password, address] = httpapi.split('@');
		const request = {
			url: `http://${address}/v1/scripting/evaluate`,
			body: {
				script_text: script,
				mock_type: 'cron',
				timeout: httpapi_timeout
			},
			headers: { 'X-Key': password, 'Accept': '*/*' },
			timeout: httpapi_timeout
		};
		await this.fetch(request).then(response => response.body, error => this.logErr(error));
	}

	initGotEnv(opts) {
		this.got = this.got ? this.got : require('got');
		this.cktough = this.cktough ? this.cktough : require('tough-cookie');
		this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
		if (opts) {
			opts.headers = opts.headers ? opts.headers : {};
			if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
				opts.cookieJar = this.ckjar;
			}
		}
	}

	async fetch(request = {} || "", option = {}) {
		// 初始化参数
		switch (request.constructor) {
			case Object:
				request = { ...option, ...request };
				break;
			case String:
				request = { ...option, "url": request };
				break;
		}		// 自动判断请求方法
		if (!request.method) {
			request.method = "GET";
			if (request.body ?? request.bodyBytes) request.method = "POST";
		}		// 移除请求头中的部分参数, 让其自动生成
		delete request.headers?.Host;
		delete request.headers?.[":authority"];
		delete request.headers?.['Content-Length'];
		delete request.headers?.['content-length'];
		// 定义请求方法（小写）
		const method = request.method.toLocaleLowerCase();
		// 判断平台
		switch (this.platform()) {
			case 'Loon':
			case 'Surge':
			case 'Stash':
			case 'Egern':
			case 'Shadowrocket':
			default:
				// 转换请求参数
				if (request.timeout) {
					request.timeout = parseInt(request.timeout, 10);
					if (this.isSurge()) ; else request.timeout = request.timeout * 1000;
				}				if (request.policy) {
					if (this.isLoon()) request.node = request.policy;
					if (this.isStash()) Lodash.set(request, "headers.X-Stash-Selected-Proxy", encodeURI(request.policy));
					if (this.isShadowrocket()) Lodash.set(request, "headers.X-Surge-Proxy", request.policy);
				}				if (typeof request.redirection === "boolean") request["auto-redirect"] = request.redirection;
				// 转换请求体
				if (request.bodyBytes && !request.body) {
					request.body = request.bodyBytes;
					delete request.bodyBytes;
				}				// 发送请求
				return await new Promise((resolve, reject) => {
					$httpClient[method](request, (error, response, body) => {
						if (error) reject(error);
						else {
							response.ok = /^2\d\d$/.test(response.status);
							response.statusCode = response.status;
							if (body) {
								response.body = body;
								if (request["binary-mode"] == true) response.bodyBytes = body;
							}							resolve(response);
						}
					});
				});
			case 'Quantumult X':
				// 转换请求参数
				if (request.policy) Lodash.set(request, "opts.policy", request.policy);
				if (typeof request["auto-redirect"] === "boolean") Lodash.set(request, "opts.redirection", request["auto-redirect"]);
				// 转换请求体
				if (request.body instanceof ArrayBuffer) {
					request.bodyBytes = request.body;
					delete request.body;
				} else if (ArrayBuffer.isView(request.body)) {
					request.bodyBytes = request.body.buffer.slice(request.body.byteOffset, request.body.byteLength + request.body.byteOffset);
					delete object.body;
				} else if (request.body) delete request.bodyBytes;
				// 发送请求
				return await $task.fetch(request).then(
					response => {
						response.ok = /^2\d\d$/.test(response.statusCode);
						response.status = response.statusCode;
						return response;
					},
					reason => Promise.reject(reason.error));
			case 'Node.js':
				let iconv = require('iconv-lite');
				this.initGotEnv(request);
				const { url, ...option } = request;
				return await this.got[method](url, option)
					.on('redirect', (response, nextOpts) => {
						try {
							if (response.headers['set-cookie']) {
								const ck = response.headers['set-cookie']
									.map(this.cktough.Cookie.parse)
									.toString();
								if (ck) {
									this.ckjar.setCookieSync(ck, null);
								}
								nextOpts.cookieJar = this.ckjar;
							}
						} catch (e) {
							this.logErr(e);
						}
						// this.ckjar.setCookieSync(response.headers['set-cookie'].map(Cookie.parse).toString())
					})
					.then(
						response => {
							response.statusCode = response.status;
							response.body = iconv.decode(response.rawBody, this.encoding);
							response.bodyBytes = response.rawBody;
							return response;
						},
						error => Promise.reject(error.message));
		}	};

	/**
	 *
	 * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
	 *    :$.time('yyyyMMddHHmmssS')
	 *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
	 *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
	 * @param {string} format 格式化参数
	 * @param {number} ts 可选: 根据指定时间戳返回格式化日期
	 *
	 */
	time(format, ts = null) {
		const date = ts ? new Date(ts) : new Date();
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			'S': date.getMilliseconds()
		};
		if (/(y+)/.test(format))
			format = format.replace(
				RegExp.$1,
				(date.getFullYear() + '').substr(4 - RegExp.$1.length)
			);
		for (let k in o)
			if (new RegExp('(' + k + ')').test(format))
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length == 1
						? o[k]
						: ('00' + o[k]).substr(('' + o[k]).length)
				);
		return format
	}

	/**
	 * 系统通知
	 *
	 * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
	 *
	 * 示例:
	 * $.msg(title, subt, desc, 'twitter://')
	 * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
	 * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
	 *
	 * @param {*} title 标题
	 * @param {*} subt 副标题
	 * @param {*} desc 通知详情
	 * @param {*} opts 通知参数
	 *
	 */
	msg(title = name, subt = '', desc = '', opts) {
		const toEnvOpts = (rawopts) => {
			switch (typeof rawopts) {
				case undefined:
					return rawopts
				case 'string':
					switch (this.platform()) {
						case 'Surge':
						case 'Stash':
						case 'Egern':
						default:
							return { url: rawopts }
						case 'Loon':
						case 'Shadowrocket':
							return rawopts
						case 'Quantumult X':
							return { 'open-url': rawopts }
						case 'Node.js':
							return undefined
					}
				case 'object':
					switch (this.platform()) {
						case 'Surge':
						case 'Stash':
						case 'Egern':
						case 'Shadowrocket':
						default: {
							let openUrl =
								rawopts.url || rawopts.openUrl || rawopts['open-url'];
							return { url: openUrl }
						}
						case 'Loon': {
							let openUrl =
								rawopts.openUrl || rawopts.url || rawopts['open-url'];
							let mediaUrl = rawopts.mediaUrl || rawopts['media-url'];
							return { openUrl, mediaUrl }
						}
						case 'Quantumult X': {
							let openUrl =
								rawopts['open-url'] || rawopts.url || rawopts.openUrl;
							let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl;
							let updatePasteboard =
								rawopts['update-pasteboard'] || rawopts.updatePasteboard;
							return {
								'open-url': openUrl,
								'media-url': mediaUrl,
								'update-pasteboard': updatePasteboard
							}
						}
						case 'Node.js':
							return undefined
					}
				default:
					return undefined
			}
		};
		if (!this.isMute) {
			switch (this.platform()) {
				case 'Surge':
				case 'Loon':
				case 'Stash':
				case 'Egern':
				case 'Shadowrocket':
				default:
					$notification.post(title, subt, desc, toEnvOpts(opts));
					break
				case 'Quantumult X':
					$notify(title, subt, desc, toEnvOpts(opts));
					break
				case 'Node.js':
					break
			}
		}
		if (!this.isMuteLog) {
			let logs = ['', '==============📣系统通知📣=============='];
			logs.push(title);
			subt ? logs.push(subt) : '';
			desc ? logs.push(desc) : '';
			console.log(logs.join('\n'));
			this.logs = this.logs.concat(logs);
		}
	}

	log(...logs) {
		if (logs.length > 0) {
			this.logs = [...this.logs, ...logs];
		}
		console.log(logs.join(this.logSeparator));
	}

	logErr(error) {
		switch (this.platform()) {
			case 'Surge':
			case 'Loon':
			case 'Stash':
			case 'Egern':
			case 'Shadowrocket':
			case 'Quantumult X':
			default:
				this.log('', `❗️ ${this.name}, 错误!`, error);
				break
			case 'Node.js':
				this.log('', `❗️${this.name}, 错误!`, error.stack);
				break
		}
	}

	wait(time) {
		return new Promise((resolve) => setTimeout(resolve, time))
	}

	done(object = {}) {
		const endTime = new Date().getTime();
		const costTime = (endTime - this.startTime) / 1000;
		this.log("", `🚩 ${this.name}, 结束! 🕛 ${costTime} 秒`, "");
		switch (this.platform()) {
			case 'Surge':
				if (object.policy) Lodash.set(object, "headers.X-Surge-Policy", object.policy);
				$done(object);
				break;
			case 'Loon':
				if (object.policy) object.node = object.policy;
				$done(object);
				break;
			case 'Stash':
				if (object.policy) Lodash.set(object, "headers.X-Stash-Selected-Proxy", encodeURI(object.policy));
				$done(object);
				break;
			case 'Egern':
				$done(object);
				break;
			case 'Shadowrocket':
			default:
				$done(object);
				break;
			case 'Quantumult X':
				if (object.policy) Lodash.set(object, "opts.policy", object.policy);
				// 移除不可写字段
				delete object["auto-redirect"];
				delete object["auto-cookie"];
				delete object["binary-mode"];
				delete object.charset;
				delete object.host;
				delete object.insecure;
				delete object.method; // 1.4.x 不可写
				delete object.opt; // $task.fetch() 参数, 不可写
				delete object.path; // 可写, 但会与 url 冲突
				delete object.policy;
				delete object["policy-descriptor"];
				delete object.scheme;
				delete object.sessionIndex;
				delete object.statusCode;
				delete object.timeout;
				if (object.body instanceof ArrayBuffer) {
					object.bodyBytes = object.body;
					delete object.body;
				} else if (ArrayBuffer.isView(object.body)) {
					object.bodyBytes = object.body.buffer.slice(object.body.byteOffset, object.body.byteLength + object.body.byteOffset);
					delete object.body;
				} else if (object.body) delete object.bodyBytes;
				$done(object);
				break;
			case 'Node.js':
				process.exit(1);
				break;
		}
	}
}

var Settings$1 = {
	Switch: true,
	Type: "Translate",
	Types: [
		"Official",
		"Translate"
	],
	Languages: [
		"EN",
		"ZH"
	],
	CacheSize: 50
};
var Configs$1 = {
	breakLine: {
		"text/xml": "&#x000A;",
		"application/xml": "&#x000A;",
		"text/vtt": "\n",
		"application/vtt": "\n",
		"text/json": "\n",
		"application/json": "\n"
	}
};
var Default = {
	Settings: Settings$1,
	Configs: Configs$1
};

var Default$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs$1,
	Settings: Settings$1,
	default: Default
});

var Settings = {
	Switch: true,
	Type: "Official",
	Types: [
		"Translate",
		"External"
	],
	Languages: [
		"AUTO",
		"ZH"
	],
	AutoCC: true,
	ShowOnly: false
};
var Configs = {
	Languages: {
		BG: "bg-BG",
		CS: "cs",
		DA: "da-DK",
		DE: "de",
		EL: "el",
		EN: "en",
		"EN-GB": "en-GB",
		"EN-US": "en-US",
		"EN-US SDH": "en-US SDH",
		ES: "es",
		"ES-419": "es-419",
		"ES-ES": "es-ES",
		ET: "et-EE",
		FI: "fi",
		FR: "fr",
		HU: "hu-HU",
		ID: "id",
		IS: "is-IS",
		IT: "it",
		JA: "ja",
		KO: "ko",
		LT: "lt-LT",
		LV: "lv-LV",
		NL: "nl-NL",
		NO: "nb-NO",
		PL: "pl-PL",
		PT: "pt",
		"PT-PT": "pt-PT",
		"PT-BR": "pt-BR",
		RO: "ro-RO",
		RU: "ru-RU",
		SK: "sk-SK",
		SL: "sl-SI",
		SV: "sv-SE",
		YUE: "yue",
		"YUE-HK": "yue-HK",
		ZH: "zh",
		"ZH-HANS": "zh-Hans",
		"ZH-HK": "zh-Hant-HK",
		"ZH-HANT": "zh-Hant",
		"ZH-TW": "zh-TW"
	},
	translationLanguages: {
		DESKTOP: [
			{
				languageCode: "sq",
				languageName: {
					simpleText: "Shqip - 阿尔巴尼亚语"
				}
			},
			{
				languageCode: "ak",
				languageName: {
					simpleText: "Ákán - 阿肯语"
				}
			},
			{
				languageCode: "ar",
				languageName: {
					simpleText: "العربية - 阿拉伯语"
				}
			},
			{
				languageCode: "am",
				languageName: {
					simpleText: "አማርኛ - 阿姆哈拉语"
				}
			},
			{
				languageCode: "as",
				languageName: {
					simpleText: "অসমীয়া - 阿萨姆语"
				}
			},
			{
				languageCode: "az",
				languageName: {
					simpleText: "آذربايجان ديلی - 阿塞拜疆语"
				}
			},
			{
				languageCode: "ee",
				languageName: {
					simpleText: "Èʋegbe - 埃维语"
				}
			},
			{
				languageCode: "ay",
				languageName: {
					simpleText: "Aymar aru - 艾马拉语"
				}
			},
			{
				languageCode: "ga",
				languageName: {
					simpleText: "Gaeilge - 爱尔兰语"
				}
			},
			{
				languageCode: "et",
				languageName: {
					simpleText: "Eesti - 爱沙尼亚语"
				}
			},
			{
				languageCode: "or",
				languageName: {
					simpleText: "ଓଡ଼ିଆ - 奥里亚语"
				}
			},
			{
				languageCode: "om",
				languageName: {
					simpleText: "Afaan Oromoo - 奥罗莫语"
				}
			},
			{
				languageCode: "eu",
				languageName: {
					simpleText: "Euskara - 巴斯克语"
				}
			},
			{
				languageCode: "be",
				languageName: {
					simpleText: "Беларуская - 白俄罗斯语"
				}
			},
			{
				languageCode: "bg",
				languageName: {
					simpleText: "Български - 保加利亚语"
				}
			},
			{
				languageCode: "nso",
				languageName: {
					simpleText: "Sesotho sa Leboa - 北索托语"
				}
			},
			{
				languageCode: "is",
				languageName: {
					simpleText: "Íslenska - 冰岛语"
				}
			},
			{
				languageCode: "pl",
				languageName: {
					simpleText: "Polski - 波兰语"
				}
			},
			{
				languageCode: "bs",
				languageName: {
					simpleText: "Bosanski - 波斯尼亚语"
				}
			},
			{
				languageCode: "fa",
				languageName: {
					simpleText: "فارسی - 波斯语"
				}
			},
			{
				languageCode: "bho",
				languageName: {
					simpleText: "भोजपुरी - 博杰普尔语"
				}
			},
			{
				languageCode: "ts",
				languageName: {
					simpleText: "Xitsonga - 聪加语"
				}
			},
			{
				languageCode: "tt",
				languageName: {
					simpleText: "Татарча - 鞑靼语"
				}
			},
			{
				languageCode: "da",
				languageName: {
					simpleText: "Dansk - 丹麦语"
				}
			},
			{
				languageCode: "de",
				languageName: {
					simpleText: "Deutsch - 德语"
				}
			},
			{
				languageCode: "dv",
				languageName: {
					simpleText: "ދިވެހިބަސް - 迪维希语"
				}
			},
			{
				languageCode: "ru",
				languageName: {
					simpleText: "Русский - 俄语"
				}
			},
			{
				languageCode: "fr",
				languageName: {
					simpleText: "français - 法语"
				}
			},
			{
				languageCode: "sa",
				languageName: {
					simpleText: "संस्कृतम् - 梵语"
				}
			},
			{
				languageCode: "fil",
				languageName: {
					simpleText: "Filipino - 菲律宾语"
				}
			},
			{
				languageCode: "fi",
				languageName: {
					simpleText: "suomi - 芬兰语"
				}
			},
			{
				languageCode: "km",
				languageName: {
					simpleText: "ភាសាខ្មែរ - 高棉语"
				}
			},
			{
				languageCode: "ka",
				languageName: {
					simpleText: "ქართული - 格鲁吉亚语"
				}
			},
			{
				languageCode: "gu",
				languageName: {
					simpleText: "ગુજરાતી - 古吉拉特语"
				}
			},
			{
				languageCode: "gn",
				languageName: {
					simpleText: "Avañe'ẽ - 瓜拉尼语"
				}
			},
			{
				languageCode: "kk",
				languageName: {
					simpleText: "Қазақ тілі - 哈萨克语"
				}
			},
			{
				languageCode: "ht",
				languageName: {
					simpleText: "Kreyòl ayisyen - 海地克里奥尔语"
				}
			},
			{
				languageCode: "ko",
				languageName: {
					simpleText: "한국어 - 韩语"
				}
			},
			{
				languageCode: "ha",
				languageName: {
					simpleText: "هَوُسَ - 豪萨语"
				}
			},
			{
				languageCode: "nl",
				languageName: {
					simpleText: "Nederlands - 荷兰语"
				}
			},
			{
				languageCode: "gl",
				languageName: {
					simpleText: "Galego - 加利西亚语"
				}
			},
			{
				languageCode: "ca",
				languageName: {
					simpleText: "català - 加泰罗尼亚语"
				}
			},
			{
				languageCode: "cs",
				languageName: {
					simpleText: "čeština - 捷克语"
				}
			},
			{
				languageCode: "kn",
				languageName: {
					simpleText: "ಕನ್ನಡ - 卡纳达语"
				}
			},
			{
				languageCode: "ky",
				languageName: {
					simpleText: "кыргыз тили - 吉尔吉斯语"
				}
			},
			{
				languageCode: "xh",
				languageName: {
					simpleText: "isiXhosa - 科萨语"
				}
			},
			{
				languageCode: "co",
				languageName: {
					simpleText: "corsu - 科西嘉语"
				}
			},
			{
				languageCode: "hr",
				languageName: {
					simpleText: "hrvatski - 克罗地亚语"
				}
			},
			{
				languageCode: "qu",
				languageName: {
					simpleText: "Runa Simi - 克丘亚语"
				}
			},
			{
				languageCode: "ku",
				languageName: {
					simpleText: "Kurdî - 库尔德语"
				}
			},
			{
				languageCode: "la",
				languageName: {
					simpleText: "lingua latīna - 拉丁语"
				}
			},
			{
				languageCode: "lv",
				languageName: {
					simpleText: "latviešu valoda - 拉脱维亚语"
				}
			},
			{
				languageCode: "lo",
				languageName: {
					simpleText: "ພາສາລາວ - 老挝语"
				}
			},
			{
				languageCode: "lt",
				languageName: {
					simpleText: "lietuvių kalba - 立陶宛语"
				}
			},
			{
				languageCode: "ln",
				languageName: {
					simpleText: "lingála - 林加拉语"
				}
			},
			{
				languageCode: "lg",
				languageName: {
					simpleText: "Luganda - 卢干达语"
				}
			},
			{
				languageCode: "lb",
				languageName: {
					simpleText: "Lëtzebuergesch - 卢森堡语"
				}
			},
			{
				languageCode: "rw",
				languageName: {
					simpleText: "Kinyarwanda - 卢旺达语"
				}
			},
			{
				languageCode: "ro",
				languageName: {
					simpleText: "Română - 罗马尼亚语"
				}
			},
			{
				languageCode: "mt",
				languageName: {
					simpleText: "Malti - 马耳他语"
				}
			},
			{
				languageCode: "mr",
				languageName: {
					simpleText: "मराठी - 马拉地语"
				}
			},
			{
				languageCode: "mg",
				languageName: {
					simpleText: "Malagasy - 马拉加斯语"
				}
			},
			{
				languageCode: "ml",
				languageName: {
					simpleText: "മലയാളം - 马拉雅拉姆语"
				}
			},
			{
				languageCode: "ms",
				languageName: {
					simpleText: "bahasa Melayu - 马来语"
				}
			},
			{
				languageCode: "mk",
				languageName: {
					simpleText: "македонски јазик - 马其顿语"
				}
			},
			{
				languageCode: "mi",
				languageName: {
					simpleText: "te reo Māori - 毛利语"
				}
			},
			{
				languageCode: "mn",
				languageName: {
					simpleText: "Монгол хэл - 蒙古语"
				}
			},
			{
				languageCode: "bn",
				languageName: {
					simpleText: "বাংলা - 孟加拉语"
				}
			},
			{
				languageCode: "my",
				languageName: {
					simpleText: "ဗမာစာ - 缅甸语"
				}
			},
			{
				languageCode: "hmn",
				languageName: {
					simpleText: "Hmoob - 苗语"
				}
			},
			{
				languageCode: "af",
				languageName: {
					simpleText: "Afrikaans - 南非荷兰语"
				}
			},
			{
				languageCode: "st",
				languageName: {
					simpleText: "Sesotho - 南索托语"
				}
			},
			{
				languageCode: "ne",
				languageName: {
					simpleText: "नेपाली - 尼泊尔语"
				}
			},
			{
				languageCode: "no",
				languageName: {
					simpleText: "Norsk - 挪威语"
				}
			},
			{
				languageCode: "pa",
				languageName: {
					simpleText: "ਪੰਜਾਬੀ - 旁遮普语"
				}
			},
			{
				languageCode: "pt",
				languageName: {
					simpleText: "Português - 葡萄牙语"
				}
			},
			{
				languageCode: "ps",
				languageName: {
					simpleText: "پښتو - 普什图语"
				}
			},
			{
				languageCode: "ny",
				languageName: {
					simpleText: "chiCheŵa - 齐切瓦语"
				}
			},
			{
				languageCode: "ja",
				languageName: {
					simpleText: "日本語 - 日语"
				}
			},
			{
				languageCode: "sv",
				languageName: {
					simpleText: "Svenska - 瑞典语"
				}
			},
			{
				languageCode: "sm",
				languageName: {
					simpleText: "Gagana fa'a Samoa - 萨摩亚语"
				}
			},
			{
				languageCode: "sr",
				languageName: {
					simpleText: "Српски језик - 塞尔维亚语"
				}
			},
			{
				languageCode: "si",
				languageName: {
					simpleText: "සිංහල - 僧伽罗语"
				}
			},
			{
				languageCode: "sn",
				languageName: {
					simpleText: "ChiShona - 绍纳语"
				}
			},
			{
				languageCode: "eo",
				languageName: {
					simpleText: "Esperanto - 世界语"
				}
			},
			{
				languageCode: "sk",
				languageName: {
					simpleText: "slovenčina - 斯洛伐克语"
				}
			},
			{
				languageCode: "sl",
				languageName: {
					simpleText: "slovenščina - 斯洛文尼亚语"
				}
			},
			{
				languageCode: "sw",
				languageName: {
					simpleText: "Kiswahili - 斯瓦希里语"
				}
			},
			{
				languageCode: "gd",
				languageName: {
					simpleText: "Gàidhlig - 苏格兰盖尔语"
				}
			},
			{
				languageCode: "ceb",
				languageName: {
					simpleText: "Binisaya - 宿务语"
				}
			},
			{
				languageCode: "so",
				languageName: {
					simpleText: "Soomaaliga - 索马里语"
				}
			},
			{
				languageCode: "tg",
				languageName: {
					simpleText: "тоҷикӣ - 塔吉克语"
				}
			},
			{
				languageCode: "te",
				languageName: {
					simpleText: "తెలుగు - 泰卢固语"
				}
			},
			{
				languageCode: "ta",
				languageName: {
					simpleText: "தமிழ் - 泰米尔语"
				}
			},
			{
				languageCode: "th",
				languageName: {
					simpleText: "ไทย - 泰语"
				}
			},
			{
				languageCode: "ti",
				languageName: {
					simpleText: "ትግርኛ - 提格利尼亚语"
				}
			},
			{
				languageCode: "tr",
				languageName: {
					simpleText: "Türkçe - 土耳其语"
				}
			},
			{
				languageCode: "tk",
				languageName: {
					simpleText: "Türkmen - 土库曼语"
				}
			},
			{
				languageCode: "cy",
				languageName: {
					simpleText: "Cymraeg - 威尔士语"
				}
			},
			{
				languageCode: "ug",
				languageName: {
					simpleText: "ئۇيغۇرچە - 维吾尔语"
				}
			},
			{
				languageCode: "und",
				languageName: {
					simpleText: "Unknown - 未知语言"
				}
			},
			{
				languageCode: "ur",
				languageName: {
					simpleText: "اردو - 乌尔都语"
				}
			},
			{
				languageCode: "uk",
				languageName: {
					simpleText: "українська - 乌克兰语"
				}
			},
			{
				languageCode: "uz",
				languageName: {
					simpleText: "O'zbek - 乌兹别克语"
				}
			},
			{
				languageCode: "es",
				languageName: {
					simpleText: "Español - 西班牙语"
				}
			},
			{
				languageCode: "fy",
				languageName: {
					simpleText: "Frysk - 西弗里西亚语"
				}
			},
			{
				languageCode: "iw",
				languageName: {
					simpleText: "עברית - 希伯来语"
				}
			},
			{
				languageCode: "el",
				languageName: {
					simpleText: "Ελληνικά - 希腊语"
				}
			},
			{
				languageCode: "haw",
				languageName: {
					simpleText: "ʻŌlelo Hawaiʻi - 夏威夷语"
				}
			},
			{
				languageCode: "sd",
				languageName: {
					simpleText: "سنڌي - 信德语"
				}
			},
			{
				languageCode: "hu",
				languageName: {
					simpleText: "magyar - 匈牙利语"
				}
			},
			{
				languageCode: "su",
				languageName: {
					simpleText: "Basa Sunda - 巽他语"
				}
			},
			{
				languageCode: "hy",
				languageName: {
					simpleText: "հայերեն - 亚美尼亚语"
				}
			},
			{
				languageCode: "ig",
				languageName: {
					simpleText: "Igbo - 伊博语"
				}
			},
			{
				languageCode: "it",
				languageName: {
					simpleText: "Italiano - 意大利语"
				}
			},
			{
				languageCode: "yi",
				languageName: {
					simpleText: "ייִדיש - 意第绪语"
				}
			},
			{
				languageCode: "hi",
				languageName: {
					simpleText: "हिन्दी - 印地语"
				}
			},
			{
				languageCode: "id",
				languageName: {
					simpleText: "Bahasa Indonesia - 印度尼西亚语"
				}
			},
			{
				languageCode: "en",
				languageName: {
					simpleText: "English - 英语"
				}
			},
			{
				languageCode: "yo",
				languageName: {
					simpleText: "Yorùbá - 约鲁巴语"
				}
			},
			{
				languageCode: "vi",
				languageName: {
					simpleText: "Tiếng Việt - 越南语"
				}
			},
			{
				languageCode: "jv",
				languageName: {
					simpleText: "Basa Jawa - 爪哇语"
				}
			},
			{
				languageCode: "zh-Hant",
				languageName: {
					simpleText: "中文（繁體）- 中文（繁体）"
				}
			},
			{
				languageCode: "zh-Hans",
				languageName: {
					simpleText: "中文（简体）"
				}
			},
			{
				languageCode: "zu",
				languageName: {
					simpleText: "isiZulu - 祖鲁语"
				}
			},
			{
				languageCode: "kri",
				languageName: {
					simpleText: "Krìì - 克里语"
				}
			}
		],
		MOBILE: [
			{
				languageCode: "sq",
				languageName: {
					runs: [
						{
							text: "Shqip - 阿尔巴尼亚语"
						}
					]
				}
			},
			{
				languageCode: "ak",
				languageName: {
					runs: [
						{
							text: "Ákán - 阿肯语"
						}
					]
				}
			},
			{
				languageCode: "ar",
				languageName: {
					runs: [
						{
							text: "العربية - 阿拉伯语"
						}
					]
				}
			},
			{
				languageCode: "am",
				languageName: {
					runs: [
						{
							text: "አማርኛ - 阿姆哈拉语"
						}
					]
				}
			},
			{
				languageCode: "as",
				languageName: {
					runs: [
						{
							text: "অসমীয়া - 阿萨姆语"
						}
					]
				}
			},
			{
				languageCode: "az",
				languageName: {
					runs: [
						{
							text: "Azərbaycanca - 阿塞拜疆语"
						}
					]
				}
			},
			{
				languageCode: "ee",
				languageName: {
					runs: [
						{
							text: "Eʋegbe - 埃维语"
						}
					]
				}
			},
			{
				languageCode: "ay",
				languageName: {
					runs: [
						{
							text: "Aymar - 艾马拉语"
						}
					]
				}
			},
			{
				languageCode: "ga",
				languageName: {
					runs: [
						{
							text: "Gaeilge - 爱尔兰语"
						}
					]
				}
			},
			{
				languageCode: "et",
				languageName: {
					runs: [
						{
							text: "Eesti - 爱沙尼亚语"
						}
					]
				}
			},
			{
				languageCode: "or",
				languageName: {
					runs: [
						{
							text: "ଓଡ଼ିଆ - 奥里亚语"
						}
					]
				}
			},
			{
				languageCode: "om",
				languageName: {
					runs: [
						{
							text: "Oromoo - 奥罗莫语"
						}
					]
				}
			},
			{
				languageCode: "eu",
				languageName: {
					runs: [
						{
							text: "Euskara - 巴斯克语"
						}
					]
				}
			},
			{
				languageCode: "be",
				languageName: {
					runs: [
						{
							text: "Беларуская - 白俄罗斯语"
						}
					]
				}
			},
			{
				languageCode: "bg",
				languageName: {
					runs: [
						{
							text: "Български - 保加利亚语"
						}
					]
				}
			},
			{
				languageCode: "nso",
				languageName: {
					runs: [
						{
							text: "Sesotho sa Leboa - 北索托语"
						}
					]
				}
			},
			{
				languageCode: "is",
				languageName: {
					runs: [
						{
							text: "Íslenska - 冰岛语"
						}
					]
				}
			},
			{
				languageCode: "pl",
				languageName: {
					runs: [
						{
							text: "Polski - 波兰语"
						}
					]
				}
			},
			{
				languageCode: "bs",
				languageName: {
					runs: [
						{
							text: "Bosanski - 波斯尼亚语"
						}
					]
				}
			},
			{
				languageCode: "fa",
				languageName: {
					runs: [
						{
							text: "فارسی - 波斯语"
						}
					]
				}
			},
			{
				languageCode: "bho",
				languageName: {
					runs: [
						{
							text: "भोजपुरी - 博杰普尔语"
						}
					]
				}
			},
			{
				languageCode: "ts",
				languageName: {
					runs: [
						{
							text: "Xitsonga - 聪加语"
						}
					]
				}
			},
			{
				languageCode: "tt",
				languageName: {
					runs: [
						{
							text: "Татарча - 鞑靼语"
						}
					]
				}
			},
			{
				languageCode: "da",
				languageName: {
					runs: [
						{
							text: "Dansk - 丹麦语"
						}
					]
				}
			},
			{
				languageCode: "de",
				languageName: {
					runs: [
						{
							text: "Deutsch - 德语"
						}
					]
				}
			},
			{
				languageCode: "dv",
				languageName: {
					runs: [
						{
							text: "ދިވެހިބަސް - 迪维希语"
						}
					]
				}
			},
			{
				languageCode: "ru",
				languageName: {
					runs: [
						{
							text: "Русский - 俄语"
						}
					]
				}
			},
			{
				languageCode: "fr",
				languageName: {
					runs: [
						{
							text: "Français - 法语"
						}
					]
				}
			},
			{
				languageCode: "sa",
				languageName: {
					runs: [
						{
							text: "संस्कृतम् - 梵语"
						}
					]
				}
			},
			{
				languageCode: "fil",
				languageName: {
					runs: [
						{
							text: "Filipino - 菲律宾语"
						}
					]
				}
			},
			{
				languageCode: "fi",
				languageName: {
					runs: [
						{
							text: "Suomi - 芬兰语"
						}
					]
				}
			},
			{
				languageCode: "km",
				languageName: {
					runs: [
						{
							text: "ភាសាខ្មែរ - 高棉语"
						}
					]
				}
			},
			{
				languageCode: "ka",
				languageName: {
					runs: [
						{
							text: "ქართული - 格鲁吉亚语"
						}
					]
				}
			},
			{
				languageCode: "gu",
				languageName: {
					runs: [
						{
							text: "ગુજરાતી - 古吉拉特语"
						}
					]
				}
			},
			{
				languageCode: "gn",
				languageName: {
					runs: [
						{
							text: "Avañe'ẽ - 瓜拉尼语"
						}
					]
				}
			},
			{
				languageCode: "kk",
				languageName: {
					runs: [
						{
							text: "Қазақ тілі - 哈萨克语"
						}
					]
				}
			},
			{
				languageCode: "ht",
				languageName: {
					runs: [
						{
							text: "海地克里奥尔语"
						}
					]
				}
			},
			{
				languageCode: "ko",
				languageName: {
					runs: [
						{
							text: "한국말 - 韩语"
						}
					]
				}
			},
			{
				languageCode: "ha",
				languageName: {
					runs: [
						{
							text: "هَوُسَ - 豪萨语"
						}
					]
				}
			},
			{
				languageCode: "nl",
				languageName: {
					runs: [
						{
							text: "Nederlands - 荷兰语"
						}
					]
				}
			},
			{
				languageCode: "gl",
				languageName: {
					runs: [
						{
							text: "Galego - 加利西亚语"
						}
					]
				}
			},
			{
				languageCode: "ca",
				languageName: {
					runs: [
						{
							text: "Català - 加泰罗尼亚语"
						}
					]
				}
			},
			{
				languageCode: "cs",
				languageName: {
					runs: [
						{
							text: "Čeština - 捷克语"
						}
					]
				}
			},
			{
				languageCode: "kn",
				languageName: {
					runs: [
						{
							text: "ಕನ್ನಡ - 卡纳达语"
						}
					]
				}
			},
			{
				languageCode: "ky",
				languageName: {
					runs: [
						{
							text: "Кыргызча - 吉尔吉斯语"
						}
					]
				}
			},
			{
				languageCode: "xh",
				languageName: {
					runs: [
						{
							text: "isiXhosa - 科萨语"
						}
					]
				}
			},
			{
				languageCode: "co",
				languageName: {
					runs: [
						{
							text: "Corsu - 科西嘉语"
						}
					]
				}
			},
			{
				languageCode: "hr",
				languageName: {
					runs: [
						{
							text: "Hrvatski - 克罗地亚语"
						}
					]
				}
			},
			{
				languageCode: "qu",
				languageName: {
					runs: [
						{
							text: "Runa Simi - 克丘亚语"
						}
					]
				}
			},
			{
				languageCode: "ku",
				languageName: {
					runs: [
						{
							text: "Kurdî - 库尔德语"
						}
					]
				}
			},
			{
				languageCode: "la",
				languageName: {
					runs: [
						{
							text: "lingua latīna - 拉丁语"
						}
					]
				}
			},
			{
				languageCode: "lv",
				languageName: {
					runs: [
						{
							text: "Latviešu - 拉脱维亚语"
						}
					]
				}
			},
			{
				languageCode: "lo",
				languageName: {
					runs: [
						{
							text: "ລາວ - 老挝语"
						}
					]
				}
			},
			{
				languageCode: "lt",
				languageName: {
					runs: [
						{
							text: "Lietuvių - 立陶宛语"
						}
					]
				}
			},
			{
				languageCode: "ln",
				languageName: {
					runs: [
						{
							text: "Lingála - 林加拉语"
						}
					]
				}
			},
			{
				languageCode: "lg",
				languageName: {
					runs: [
						{
							text: "Luganda - 卢干达语"
						}
					]
				}
			},
			{
				languageCode: "lb",
				languageName: {
					runs: [
						{
							text: "Lëtzebuergesch - 卢森堡语"
						}
					]
				}
			},
			{
				languageCode: "rw",
				languageName: {
					runs: [
						{
							text: "Kinyarwanda - 卢旺达语"
						}
					]
				}
			},
			{
				languageCode: "ro",
				languageName: {
					runs: [
						{
							text: "Română - 罗马尼亚语"
						}
					]
				}
			},
			{
				languageCode: "mt",
				languageName: {
					runs: [
						{
							text: "Malti - 马耳他语"
						}
					]
				}
			},
			{
				languageCode: "mr",
				languageName: {
					runs: [
						{
							text: "मराठी - 马拉地语"
						}
					]
				}
			},
			{
				languageCode: "mg",
				languageName: {
					runs: [
						{
							text: "Malagasy - 马拉加斯语"
						}
					]
				}
			},
			{
				languageCode: "ml",
				languageName: {
					runs: [
						{
							text: "മലയാളം - 马拉雅拉姆语"
						}
					]
				}
			},
			{
				languageCode: "ms",
				languageName: {
					runs: [
						{
							text: "Bahasa Melayu - 马来语"
						}
					]
				}
			},
			{
				languageCode: "mk",
				languageName: {
					runs: [
						{
							text: "македонски - 马其顿语"
						}
					]
				}
			},
			{
				languageCode: "mi",
				languageName: {
					runs: [
						{
							text: "Māori - 毛利语"
						}
					]
				}
			},
			{
				languageCode: "mn",
				languageName: {
					runs: [
						{
							text: "Монгол - 蒙古语"
						}
					]
				}
			},
			{
				languageCode: "bn",
				languageName: {
					runs: [
						{
							text: "বাংলা - 孟加拉语"
						}
					]
				}
			},
			{
				languageCode: "my",
				languageName: {
					runs: [
						{
							text: "ဗမာစာ - 缅甸语"
						}
					]
				}
			},
			{
				languageCode: "hmn",
				languageName: {
					runs: [
						{
							text: "Hmoob - 苗语"
						}
					]
				}
			},
			{
				languageCode: "af",
				languageName: {
					runs: [
						{
							text: "Afrikaans - 南非荷兰语"
						}
					]
				}
			},
			{
				languageCode: "st",
				languageName: {
					runs: [
						{
							text: "Sesotho - 南索托语"
						}
					]
				}
			},
			{
				languageCode: "ne",
				languageName: {
					runs: [
						{
							text: "नेपाली - 尼泊尔语"
						}
					]
				}
			},
			{
				languageCode: "no",
				languageName: {
					runs: [
						{
							text: "Norsk - 挪威语"
						}
					]
				}
			},
			{
				languageCode: "pa",
				languageName: {
					runs: [
						{
							text: "ਪੰਜਾਬੀ - 旁遮普语"
						}
					]
				}
			},
			{
				languageCode: "pt",
				languageName: {
					runs: [
						{
							text: "Português - 葡萄牙语"
						}
					]
				}
			},
			{
				languageCode: "ps",
				languageName: {
					runs: [
						{
							text: "پښتو - 普什图语"
						}
					]
				}
			},
			{
				languageCode: "ny",
				languageName: {
					runs: [
						{
							text: "chiCheŵa - 齐切瓦语"
						}
					]
				}
			},
			{
				languageCode: "ja",
				languageName: {
					runs: [
						{
							text: "日本語 - 日语"
						}
					]
				}
			},
			{
				languageCode: "sv",
				languageName: {
					runs: [
						{
							text: "Svenska - 瑞典语"
						}
					]
				}
			},
			{
				languageCode: "sm",
				languageName: {
					runs: [
						{
							text: "Gagana Samoa - 萨摩亚语"
						}
					]
				}
			},
			{
				languageCode: "sr",
				languageName: {
					runs: [
						{
							text: "Српски језик - 塞尔维亚语"
						}
					]
				}
			},
			{
				languageCode: "si",
				languageName: {
					runs: [
						{
							text: "සිංහල - 僧伽罗语"
						}
					]
				}
			},
			{
				languageCode: "sn",
				languageName: {
					runs: [
						{
							text: "ChiShona - 绍纳语"
						}
					]
				}
			},
			{
				languageCode: "eo",
				languageName: {
					runs: [
						{
							text: "Esperanto - 世界语"
						}
					]
				}
			},
			{
				languageCode: "sk",
				languageName: {
					runs: [
						{
							text: "Slovenčina - 斯洛伐克语"
						}
					]
				}
			},
			{
				languageCode: "sl",
				languageName: {
					runs: [
						{
							text: "Slovenščina - 斯洛文尼亚语"
						}
					]
				}
			},
			{
				languageCode: "sw",
				languageName: {
					runs: [
						{
							text: "Kiswahili - 斯瓦希里语"
						}
					]
				}
			},
			{
				languageCode: "gd",
				languageName: {
					runs: [
						{
							text: "Gàidhlig - 苏格兰盖尔语"
						}
					]
				}
			},
			{
				languageCode: "ceb",
				languageName: {
					runs: [
						{
							text: "Cebuano - 宿务语"
						}
					]
				}
			},
			{
				languageCode: "so",
				languageName: {
					runs: [
						{
							text: "Soomaaliga - 索马里语"
						}
					]
				}
			},
			{
				languageCode: "tg",
				languageName: {
					runs: [
						{
							text: "тоҷикӣ - 塔吉克语"
						}
					]
				}
			},
			{
				languageCode: "te",
				languageName: {
					runs: [
						{
							text: "తెలుగు - 泰卢固语"
						}
					]
				}
			},
			{
				languageCode: "ta",
				languageName: {
					runs: [
						{
							text: "தமிழ் - 泰米尔语"
						}
					]
				}
			},
			{
				languageCode: "th",
				languageName: {
					runs: [
						{
							text: "ไทย - 泰语"
						}
					]
				}
			},
			{
				languageCode: "ti",
				languageName: {
					runs: [
						{
							text: "ትግርኛ - 提格利尼亚语"
						}
					]
				}
			},
			{
				languageCode: "tr",
				languageName: {
					runs: [
						{
							text: "Türkçe - 土耳其语"
						}
					]
				}
			},
			{
				languageCode: "tk",
				languageName: {
					runs: [
						{
							text: "Türkmen - 土库曼语"
						}
					]
				}
			},
			{
				languageCode: "cy",
				languageName: {
					runs: [
						{
							text: "Cymraeg - 威尔士语"
						}
					]
				}
			},
			{
				languageCode: "ug",
				languageName: {
					runs: [
						{
							text: "ئۇيغۇرچە - 维吾尔语"
						}
					]
				}
			},
			{
				languageCode: "und",
				languageName: {
					runs: [
						{
							text: "Unknown - 未知语言"
						}
					]
				}
			},
			{
				languageCode: "ur",
				languageName: {
					runs: [
						{
							text: "اردو - 乌尔都语"
						}
					]
				}
			},
			{
				languageCode: "uk",
				languageName: {
					runs: [
						{
							text: "Українська - 乌克兰语"
						}
					]
				}
			},
			{
				languageCode: "uz",
				languageName: {
					runs: [
						{
							text: "O‘zbek - 乌兹别克语"
						}
					]
				}
			},
			{
				languageCode: "es",
				languageName: {
					runs: [
						{
							text: "Español - 西班牙语"
						}
					]
				}
			},
			{
				languageCode: "fy",
				languageName: {
					runs: [
						{
							text: "Frysk - 西弗里西亚语"
						}
					]
				}
			},
			{
				languageCode: "iw",
				languageName: {
					runs: [
						{
							text: "עברית - 希伯来语"
						}
					]
				}
			},
			{
				languageCode: "el",
				languageName: {
					runs: [
						{
							text: "Ελληνικά - 希腊语"
						}
					]
				}
			},
			{
				languageCode: "haw",
				languageName: {
					runs: [
						{
							text: "ʻŌlelo Hawaiʻi - 夏威夷语"
						}
					]
				}
			},
			{
				languageCode: "sd",
				languageName: {
					runs: [
						{
							text: "سنڌي - 信德语"
						}
					]
				}
			},
			{
				languageCode: "hu",
				languageName: {
					runs: [
						{
							text: "Magyar - 匈牙利语"
						}
					]
				}
			},
			{
				languageCode: "su",
				languageName: {
					runs: [
						{
							text: "Basa Sunda - 巽他语"
						}
					]
				}
			},
			{
				languageCode: "hy",
				languageName: {
					runs: [
						{
							text: "Հայերեն - 亚美尼亚语"
						}
					]
				}
			},
			{
				languageCode: "ig",
				languageName: {
					runs: [
						{
							text: "Igbo - 伊博语"
						}
					]
				}
			},
			{
				languageCode: "it",
				languageName: {
					runs: [
						{
							text: "Italiano - 意大利语"
						}
					]
				}
			},
			{
				languageCode: "yi",
				languageName: {
					runs: [
						{
							text: "ייִדיש - 意第绪语"
						}
					]
				}
			},
			{
				languageCode: "hi",
				languageName: {
					runs: [
						{
							text: "हिन्दी - 印地语"
						}
					]
				}
			},
			{
				languageCode: "id",
				languageName: {
					runs: [
						{
							text: "Bahasa Indonesia - 印度尼西亚语"
						}
					]
				}
			},
			{
				languageCode: "en",
				languageName: {
					runs: [
						{
							text: "English - 英语"
						}
					]
				}
			},
			{
				languageCode: "yo",
				languageName: {
					runs: [
						{
							text: "Yorùbá - 约鲁巴语"
						}
					]
				}
			},
			{
				languageCode: "vi",
				languageName: {
					runs: [
						{
							text: "Tiếng Việt - 越南语"
						}
					]
				}
			},
			{
				languageCode: "jv",
				languageName: {
					runs: [
						{
							text: "Basa Jawa - 爪哇语"
						}
					]
				}
			},
			{
				languageCode: "zh-Hant",
				languageName: {
					runs: [
						{
							text: "中文（繁體） - 中文（繁体）"
						}
					]
				}
			},
			{
				languageCode: "zh-Hans",
				languageName: {
					runs: [
						{
							text: "中文（简体）"
						}
					]
				}
			},
			{
				languageCode: "zu",
				languageName: {
					runs: [
						{
							text: "isiZulu - 祖鲁语"
						}
					]
				}
			},
			{
				languageCode: "kri",
				languageName: {
					runs: [
						{
							text: "Krìì - 克里语"
						}
					]
				}
			}
		]
	}
};
var YouTube = {
	Settings: Settings,
	Configs: Configs
};

var YouTube$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Configs: Configs,
	Settings: Settings,
	default: YouTube
});

var Database$1 = Database = {
	"Default": Default$1,
	"YouTube": YouTube$1,
};

/**
 * Get Storage Variables
 * @link https://github.com/NanoCat-Me/ENV/blob/main/getStorage.mjs
 * @author VirgilClyne
 * @param {String} key - Persistent Store Key
 * @param {Array} names - Platform Names
 * @param {Object} database - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getStorage(key, names, database) {
    //console.log(`☑️ ${this.name}, Get Environment Variables`, "");
    /***************** BoxJs *****************/
    // 包装为局部变量，用完释放内存
    // BoxJs的清空操作返回假值空字符串, 逻辑或操作符会在左侧操作数为假值时返回右侧操作数。
    let BoxJs = $Storage.getItem(key, database);
    //console.log(`🚧 ${this.name}, Get Environment Variables`, `BoxJs类型: ${typeof BoxJs}`, `BoxJs内容: ${JSON.stringify(BoxJs)}`, "");
    /***************** Argument *****************/
    let Argument = {};
    if (typeof $argument !== "undefined") {
        if (Boolean($argument)) {
            //console.log(`🎉 ${this.name}, $Argument`);
            let arg = Object.fromEntries($argument.split("&").map((item) => item.split("=").map(i => i.replace(/\"/g, ''))));
            //console.log(JSON.stringify(arg));
            for (let item in arg) Lodash.set(Argument, item, arg[item]);
            //console.log(JSON.stringify(Argument));
        }        //console.log(`✅ ${this.name}, Get Environment Variables`, `Argument类型: ${typeof Argument}`, `Argument内容: ${JSON.stringify(Argument)}`, "");
    }    /***************** Store *****************/
    const Store = { Settings: database?.Default?.Settings || {}, Configs: database?.Default?.Configs || {}, Caches: {} };
    if (!Array.isArray(names)) names = [names];
    //console.log(`🚧 ${this.name}, Get Environment Variables`, `names类型: ${typeof names}`, `names内容: ${JSON.stringify(names)}`, "");
    for (let name of names) {
        Store.Settings = { ...Store.Settings, ...database?.[name]?.Settings, ...Argument, ...BoxJs?.[name]?.Settings };
        Store.Configs = { ...Store.Configs, ...database?.[name]?.Configs };
        if (BoxJs?.[name]?.Caches && typeof BoxJs?.[name]?.Caches === "string") BoxJs[name].Caches = JSON.parse(BoxJs?.[name]?.Caches);
        Store.Caches = { ...Store.Caches, ...BoxJs?.[name]?.Caches };
    }    //console.log(`🚧 ${this.name}, Get Environment Variables`, `Store.Settings类型: ${typeof Store.Settings}`, `Store.Settings: ${JSON.stringify(Store.Settings)}`, "");
    traverseObject(Store.Settings, (key, value) => {
        //console.log(`🚧 ${this.name}, traverseObject`, `${key}: ${typeof value}`, `${key}: ${JSON.stringify(value)}`, "");
        if (value === "true" || value === "false") value = JSON.parse(value); // 字符串转Boolean
        else if (typeof value === "string") {
            if (value.includes(",")) value = value.split(",").map(item => string2number(item)); // 字符串转数组转数字
            else value = string2number(value); // 字符串转数字
        }        return value;
    });
    //console.log(`✅ ${this.name}, Get Environment Variables`, `Store: ${typeof Store.Caches}`, `Store内容: ${JSON.stringify(Store)}`, "");
    return Store;

    /***************** function *****************/
    function traverseObject(o, c) { for (var t in o) { var n = o[t]; o[t] = "object" == typeof n && null !== n ? traverseObject(n, c) : c(t, n); } return o }
    function string2number(string) { if (string && !isNaN(string)) string = parseInt(string, 10); return string }
}

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {Object} $ - ENV
 * @param {String} name - Persistent Store Key
 * @param {Array} platforms - Platform Names
 * @param {Object} database - Default DataBase
 * @return {Object} { Settings, Caches, Configs }
 */
function setENV(name, platforms, database) {
	console.log(`☑️ Set Environment Variables`, "");
	let { Settings, Caches, Configs } = getStorage(name, platforms, database);
	/***************** Settings *****************/
	if (!Array.isArray(Settings?.Types)) Settings.Types = (Settings.Types) ? [Settings.Types] : []; // 只有一个选项时，无逗号分隔
	if (platforms.includes("YouTube")) {
		Settings.AutoCC = $Storage.getItem("自动显示翻译字幕") ?? Settings.AutoCC;
		switch (Settings.AutoCC) {
			case "是":
				Settings.AutoCC = true;
				break;
			case "否":
				Settings.AutoCC = false;
				break;
		}		Settings.ShowOnly = $Storage.getItem("仅输出字幕译文") ?? Settings.ShowOnly;
		switch (Settings.ShowOnly) {
			case "是":
				Settings.ShowOnly = true;
				break;
			case "否":
				Settings.ShowOnly = false;
				break;
		}		Settings.Position = $Storage.getItem("字幕译文的位置") ?? Settings.Position;
		switch (Settings.Position) {
			case "译文位于原文之上":
				Settings.Position = "Forward";
				break;
			case "译文位于原文之下":
				Settings.Position = "Reverse";
				break;
		}	}	console.log(`✅ Set Environment Variables, Settings: ${typeof Settings}, Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	//console.log(`✅ Set Environment Variables, Caches: ${typeof Caches}, Caches内容: ${JSON.stringify(Caches)}`, "");
	if (typeof Caches?.Playlists !== "object" || Array.isArray(Caches?.Playlists)) Caches.Playlists = {}; // 创建Playlists缓存
	Caches.Playlists.Master = new Map(JSON.parse(Caches?.Playlists?.Master || "[]")); // Strings转Array转Map
	Caches.Playlists.Subtitle = new Map(JSON.parse(Caches?.Playlists?.Subtitle || "[]")); // Strings转Array转Map
	if (typeof Caches?.Subtitles !== "object") Caches.Subtitles = new Map(JSON.parse(Caches?.Subtitles || "[]")); // Strings转Array转Map
	if (typeof Caches?.Metadatas !== "object" || Array.isArray(Caches?.Metadatas)) Caches.Metadatas = {}; // 创建Playlists缓存
	if (typeof Caches?.Metadatas?.Tracks !== "object") Caches.Metadatas.Tracks = new Map(JSON.parse(Caches?.Metadatas?.Tracks || "[]")); // Strings转Array转Map
	/***************** Configs *****************/
	return { Settings, Caches, Configs };
}

/**
 * Set Cache
 * @author VirgilClyne
 * @param {Map} cache - Playlists Cache / Subtitles Cache
 * @param {Number} cacheSize - Cache Size
 * @return {Boolean} isSaved
 */
function setCache(cache, cacheSize = 100) {
	console.log(`☑️ Set Cache, cacheSize: ${cacheSize}`, "");
	cache = Array.from(cache || []); // Map转Array
	cache = cache.slice(-cacheSize); // 限制缓存大小
	console.log(`✅ Set Cache`, "");
	return cache;
}

/**
 * Get the type of a JSON value.
 * Distinguishes between array, null and object.
 */
function typeofJsonValue(value) {
    let t = typeof value;
    if (t == "object") {
        if (Array.isArray(value))
            return "array";
        if (value === null)
            return "null";
    }
    return t;
}
/**
 * Is this a JSON object (instead of an array or null)?
 */
function isJsonObject(value) {
    return value !== null && typeof value == "object" && !Array.isArray(value);
}

// lookup table from base64 character to byte
let encTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
// lookup table from base64 character *code* to byte because lookup by number is fast
let decTable = [];
for (let i = 0; i < encTable.length; i++)
    decTable[encTable[i].charCodeAt(0)] = i;
// support base64url variants
decTable["-".charCodeAt(0)] = encTable.indexOf("+");
decTable["_".charCodeAt(0)] = encTable.indexOf("/");
/**
 * Decodes a base64 string to a byte array.
 *
 * - ignores white-space, including line breaks and tabs
 * - allows inner padding (can decode concatenated base64 strings)
 * - does not require padding
 * - understands base64url encoding:
 *   "-" instead of "+",
 *   "_" instead of "/",
 *   no padding
 */
function base64decode(base64Str) {
    // estimate byte size, not accounting for inner padding and whitespace
    let es = base64Str.length * 3 / 4;
    // if (es % 3 !== 0)
    // throw new Error('invalid base64 string');
    if (base64Str[base64Str.length - 2] == '=')
        es -= 2;
    else if (base64Str[base64Str.length - 1] == '=')
        es -= 1;
    let bytes = new Uint8Array(es), bytePos = 0, // position in byte array
    groupPos = 0, // position in base64 group
    b, // current byte
    p = 0 // previous byte
    ;
    for (let i = 0; i < base64Str.length; i++) {
        b = decTable[base64Str.charCodeAt(i)];
        if (b === undefined) {
            // noinspection FallThroughInSwitchStatementJS
            switch (base64Str[i]) {
                case '=':
                    groupPos = 0; // reset state when padding found
                case '\n':
                case '\r':
                case '\t':
                case ' ':
                    continue; // skip white-space, and padding
                default:
                    throw Error(`invalid base64 string.`);
            }
        }
        switch (groupPos) {
            case 0:
                p = b;
                groupPos = 1;
                break;
            case 1:
                bytes[bytePos++] = p << 2 | (b & 48) >> 4;
                p = b;
                groupPos = 2;
                break;
            case 2:
                bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
                p = b;
                groupPos = 3;
                break;
            case 3:
                bytes[bytePos++] = (p & 3) << 6 | b;
                groupPos = 0;
                break;
        }
    }
    if (groupPos == 1)
        throw Error(`invalid base64 string.`);
    return bytes.subarray(0, bytePos);
}
/**
 * Encodes a byte array to a base64 string.
 * Adds padding at the end.
 * Does not insert newlines.
 */
function base64encode(bytes) {
    let base64 = '', groupPos = 0, // position in base64 group
    b, // current byte
    p = 0; // carry over from previous byte
    for (let i = 0; i < bytes.length; i++) {
        b = bytes[i];
        switch (groupPos) {
            case 0:
                base64 += encTable[b >> 2];
                p = (b & 3) << 4;
                groupPos = 1;
                break;
            case 1:
                base64 += encTable[p | b >> 4];
                p = (b & 15) << 2;
                groupPos = 2;
                break;
            case 2:
                base64 += encTable[p | b >> 6];
                base64 += encTable[b & 63];
                groupPos = 0;
                break;
        }
    }
    // padding required?
    if (groupPos) {
        base64 += encTable[p];
        base64 += '=';
        if (groupPos == 1)
            base64 += '=';
    }
    return base64;
}

/**
 * This handler implements the default behaviour for unknown fields.
 * When reading data, unknown fields are stored on the message, in a
 * symbol property.
 * When writing data, the symbol property is queried and unknown fields
 * are serialized into the output again.
 */
var UnknownFieldHandler;
(function (UnknownFieldHandler) {
    /**
     * The symbol used to store unknown fields for a message.
     * The property must conform to `UnknownFieldContainer`.
     */
    UnknownFieldHandler.symbol = Symbol.for("protobuf-ts/unknown");
    /**
     * Store an unknown field during binary read directly on the message.
     * This method is compatible with `BinaryReadOptions.readUnknownField`.
     */
    UnknownFieldHandler.onRead = (typeName, message, fieldNo, wireType, data) => {
        let container = is(message) ? message[UnknownFieldHandler.symbol] : message[UnknownFieldHandler.symbol] = [];
        container.push({ no: fieldNo, wireType, data });
    };
    /**
     * Write unknown fields stored for the message to the writer.
     * This method is compatible with `BinaryWriteOptions.writeUnknownFields`.
     */
    UnknownFieldHandler.onWrite = (typeName, message, writer) => {
        for (let { no, wireType, data } of UnknownFieldHandler.list(message))
            writer.tag(no, wireType).raw(data);
    };
    /**
     * List unknown fields stored for the message.
     * Note that there may be multiples fields with the same number.
     */
    UnknownFieldHandler.list = (message, fieldNo) => {
        if (is(message)) {
            let all = message[UnknownFieldHandler.symbol];
            return fieldNo ? all.filter(uf => uf.no == fieldNo) : all;
        }
        return [];
    };
    /**
     * Returns the last unknown field by field number.
     */
    UnknownFieldHandler.last = (message, fieldNo) => UnknownFieldHandler.list(message, fieldNo).slice(-1)[0];
    const is = (message) => message && Array.isArray(message[UnknownFieldHandler.symbol]);
})(UnknownFieldHandler || (UnknownFieldHandler = {}));
/**
 * Protobuf binary format wire types.
 *
 * A wire type provides just enough information to find the length of the
 * following value.
 *
 * See https://developers.google.com/protocol-buffers/docs/encoding#structure
 */
var WireType;
(function (WireType) {
    /**
     * Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
     */
    WireType[WireType["Varint"] = 0] = "Varint";
    /**
     * Used for fixed64, sfixed64, double.
     * Always 8 bytes with little-endian byte order.
     */
    WireType[WireType["Bit64"] = 1] = "Bit64";
    /**
     * Used for string, bytes, embedded messages, packed repeated fields
     *
     * Only repeated numeric types (types which use the varint, 32-bit,
     * or 64-bit wire types) can be packed. In proto3, such fields are
     * packed by default.
     */
    WireType[WireType["LengthDelimited"] = 2] = "LengthDelimited";
    /**
     * Used for groups
     * @deprecated
     */
    WireType[WireType["StartGroup"] = 3] = "StartGroup";
    /**
     * Used for groups
     * @deprecated
     */
    WireType[WireType["EndGroup"] = 4] = "EndGroup";
    /**
     * Used for fixed32, sfixed32, float.
     * Always 4 bytes with little-endian byte order.
     */
    WireType[WireType["Bit32"] = 5] = "Bit32";
})(WireType || (WireType = {}));

// Copyright 2008 Google Inc.  All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
// * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
// * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Code generated by the Protocol Buffer compiler is owned by the owner
// of the input file used when generating it.  This code is not
// standalone and requires a support library to be linked with it.  This
// support library is itself covered by the above license.
/**
 * Read a 64 bit varint as two JS numbers.
 *
 * Returns tuple:
 * [0]: low bits
 * [0]: high bits
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L175
 */
function varint64read() {
    let lowBits = 0;
    let highBits = 0;
    for (let shift = 0; shift < 28; shift += 7) {
        let b = this.buf[this.pos++];
        lowBits |= (b & 0x7F) << shift;
        if ((b & 0x80) == 0) {
            this.assertBounds();
            return [lowBits, highBits];
        }
    }
    let middleByte = this.buf[this.pos++];
    // last four bits of the first 32 bit number
    lowBits |= (middleByte & 0x0F) << 28;
    // 3 upper bits are part of the next 32 bit number
    highBits = (middleByte & 0x70) >> 4;
    if ((middleByte & 0x80) == 0) {
        this.assertBounds();
        return [lowBits, highBits];
    }
    for (let shift = 3; shift <= 31; shift += 7) {
        let b = this.buf[this.pos++];
        highBits |= (b & 0x7F) << shift;
        if ((b & 0x80) == 0) {
            this.assertBounds();
            return [lowBits, highBits];
        }
    }
    throw new Error('invalid varint');
}
/**
 * Write a 64 bit varint, given as two JS numbers, to the given bytes array.
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
 */
function varint64write(lo, hi, bytes) {
    for (let i = 0; i < 28; i = i + 7) {
        const shift = lo >>> i;
        const hasNext = !((shift >>> 7) == 0 && hi == 0);
        const byte = (hasNext ? shift | 0x80 : shift) & 0xFF;
        bytes.push(byte);
        if (!hasNext) {
            return;
        }
    }
    const splitBits = ((lo >>> 28) & 0x0F) | ((hi & 0x07) << 4);
    const hasMoreBits = !((hi >> 3) == 0);
    bytes.push((hasMoreBits ? splitBits | 0x80 : splitBits) & 0xFF);
    if (!hasMoreBits) {
        return;
    }
    for (let i = 3; i < 31; i = i + 7) {
        const shift = hi >>> i;
        const hasNext = !((shift >>> 7) == 0);
        const byte = (hasNext ? shift | 0x80 : shift) & 0xFF;
        bytes.push(byte);
        if (!hasNext) {
            return;
        }
    }
    bytes.push((hi >>> 31) & 0x01);
}
// constants for binary math
const TWO_PWR_32_DBL$1 = (1 << 16) * (1 << 16);
/**
 * Parse decimal string of 64 bit integer value as two JS numbers.
 *
 * Returns tuple:
 * [0]: minus sign?
 * [1]: low bits
 * [2]: high bits
 *
 * Copyright 2008 Google Inc.
 */
function int64fromString(dec) {
    // Check for minus sign.
    let minus = dec[0] == '-';
    if (minus)
        dec = dec.slice(1);
    // Work 6 decimal digits at a time, acting like we're converting base 1e6
    // digits to binary. This is safe to do with floating point math because
    // Number.isSafeInteger(ALL_32_BITS * 1e6) == true.
    const base = 1e6;
    let lowBits = 0;
    let highBits = 0;
    function add1e6digit(begin, end) {
        // Note: Number('') is 0.
        const digit1e6 = Number(dec.slice(begin, end));
        highBits *= base;
        lowBits = lowBits * base + digit1e6;
        // Carry bits from lowBits to highBits
        if (lowBits >= TWO_PWR_32_DBL$1) {
            highBits = highBits + ((lowBits / TWO_PWR_32_DBL$1) | 0);
            lowBits = lowBits % TWO_PWR_32_DBL$1;
        }
    }
    add1e6digit(-24, -18);
    add1e6digit(-18, -12);
    add1e6digit(-12, -6);
    add1e6digit(-6);
    return [minus, lowBits, highBits];
}
/**
 * Format 64 bit integer value (as two JS numbers) to decimal string.
 *
 * Copyright 2008 Google Inc.
 */
function int64toString(bitsLow, bitsHigh) {
    // Skip the expensive conversion if the number is small enough to use the
    // built-in conversions.
    if ((bitsHigh >>> 0) <= 0x1FFFFF) {
        return '' + (TWO_PWR_32_DBL$1 * bitsHigh + (bitsLow >>> 0));
    }
    // What this code is doing is essentially converting the input number from
    // base-2 to base-1e7, which allows us to represent the 64-bit range with
    // only 3 (very large) digits. Those digits are then trivial to convert to
    // a base-10 string.
    // The magic numbers used here are -
    // 2^24 = 16777216 = (1,6777216) in base-1e7.
    // 2^48 = 281474976710656 = (2,8147497,6710656) in base-1e7.
    // Split 32:32 representation into 16:24:24 representation so our
    // intermediate digits don't overflow.
    let low = bitsLow & 0xFFFFFF;
    let mid = (((bitsLow >>> 24) | (bitsHigh << 8)) >>> 0) & 0xFFFFFF;
    let high = (bitsHigh >> 16) & 0xFFFF;
    // Assemble our three base-1e7 digits, ignoring carries. The maximum
    // value in a digit at this step is representable as a 48-bit integer, which
    // can be stored in a 64-bit floating point number.
    let digitA = low + (mid * 6777216) + (high * 6710656);
    let digitB = mid + (high * 8147497);
    let digitC = (high * 2);
    // Apply carries from A to B and from B to C.
    let base = 10000000;
    if (digitA >= base) {
        digitB += Math.floor(digitA / base);
        digitA %= base;
    }
    if (digitB >= base) {
        digitC += Math.floor(digitB / base);
        digitB %= base;
    }
    // Convert base-1e7 digits to base-10, with optional leading zeroes.
    function decimalFrom1e7(digit1e7, needLeadingZeros) {
        let partial = digit1e7 ? String(digit1e7) : '';
        if (needLeadingZeros) {
            return '0000000'.slice(partial.length) + partial;
        }
        return partial;
    }
    return decimalFrom1e7(digitC, /*needLeadingZeros=*/ 0) +
        decimalFrom1e7(digitB, /*needLeadingZeros=*/ digitC) +
        // If the final 1e7 digit didn't need leading zeros, we would have
        // returned via the trivial code path at the top.
        decimalFrom1e7(digitA, /*needLeadingZeros=*/ 1);
}
/**
 * Write a 32 bit varint, signed or unsigned. Same as `varint64write(0, value, bytes)`
 *
 * Copyright 2008 Google Inc.  All rights reserved.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/1b18833f4f2a2f681f4e4a25cdf3b0a43115ec26/js/binary/encoder.js#L144
 */
function varint32write(value, bytes) {
    if (value >= 0) {
        // write value as varint 32
        while (value > 0x7f) {
            bytes.push((value & 0x7f) | 0x80);
            value = value >>> 7;
        }
        bytes.push(value);
    }
    else {
        for (let i = 0; i < 9; i++) {
            bytes.push(value & 127 | 128);
            value = value >> 7;
        }
        bytes.push(1);
    }
}
/**
 * Read an unsigned 32 bit varint.
 *
 * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L220
 */
function varint32read() {
    let b = this.buf[this.pos++];
    let result = b & 0x7F;
    if ((b & 0x80) == 0) {
        this.assertBounds();
        return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 0x7F) << 7;
    if ((b & 0x80) == 0) {
        this.assertBounds();
        return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 0x7F) << 14;
    if ((b & 0x80) == 0) {
        this.assertBounds();
        return result;
    }
    b = this.buf[this.pos++];
    result |= (b & 0x7F) << 21;
    if ((b & 0x80) == 0) {
        this.assertBounds();
        return result;
    }
    // Extract only last 4 bits
    b = this.buf[this.pos++];
    result |= (b & 0x0F) << 28;
    for (let readBytes = 5; ((b & 0x80) !== 0) && readBytes < 10; readBytes++)
        b = this.buf[this.pos++];
    if ((b & 0x80) != 0)
        throw new Error('invalid varint');
    this.assertBounds();
    // Result can have 32 bits, convert it to unsigned
    return result >>> 0;
}

let BI;
function detectBi() {
    const dv = new DataView(new ArrayBuffer(8));
    const ok = globalThis.BigInt !== undefined
        && typeof dv.getBigInt64 === "function"
        && typeof dv.getBigUint64 === "function"
        && typeof dv.setBigInt64 === "function"
        && typeof dv.setBigUint64 === "function";
    BI = ok ? {
        MIN: BigInt("-9223372036854775808"),
        MAX: BigInt("9223372036854775807"),
        UMIN: BigInt("0"),
        UMAX: BigInt("18446744073709551615"),
        C: BigInt,
        V: dv,
    } : undefined;
}
detectBi();
function assertBi(bi) {
    if (!bi)
        throw new Error("BigInt unavailable, see https://github.com/timostamm/protobuf-ts/blob/v1.0.8/MANUAL.md#bigint-support");
}
// used to validate from(string) input (when bigint is unavailable)
const RE_DECIMAL_STR = /^-?[0-9]+$/;
// constants for binary math
const TWO_PWR_32_DBL = 0x100000000;
const HALF_2_PWR_32 = 0x080000000;
// base class for PbLong and PbULong provides shared code
class SharedPbLong {
    /**
     * Create a new instance with the given bits.
     */
    constructor(lo, hi) {
        this.lo = lo | 0;
        this.hi = hi | 0;
    }
    /**
     * Is this instance equal to 0?
     */
    isZero() {
        return this.lo == 0 && this.hi == 0;
    }
    /**
     * Convert to a native number.
     */
    toNumber() {
        let result = this.hi * TWO_PWR_32_DBL + (this.lo >>> 0);
        if (!Number.isSafeInteger(result))
            throw new Error("cannot convert to safe number");
        return result;
    }
}
/**
 * 64-bit unsigned integer as two 32-bit values.
 * Converts between `string`, `number` and `bigint` representations.
 */
class PbULong extends SharedPbLong {
    /**
     * Create instance from a `string`, `number` or `bigint`.
     */
    static from(value) {
        if (BI)
            // noinspection FallThroughInSwitchStatementJS
            switch (typeof value) {
                case "string":
                    if (value == "0")
                        return this.ZERO;
                    if (value == "")
                        throw new Error('string is no integer');
                    value = BI.C(value);
                case "number":
                    if (value === 0)
                        return this.ZERO;
                    value = BI.C(value);
                case "bigint":
                    if (!value)
                        return this.ZERO;
                    if (value < BI.UMIN)
                        throw new Error('signed value for ulong');
                    if (value > BI.UMAX)
                        throw new Error('ulong too large');
                    BI.V.setBigUint64(0, value, true);
                    return new PbULong(BI.V.getInt32(0, true), BI.V.getInt32(4, true));
            }
        else
            switch (typeof value) {
                case "string":
                    if (value == "0")
                        return this.ZERO;
                    value = value.trim();
                    if (!RE_DECIMAL_STR.test(value))
                        throw new Error('string is no integer');
                    let [minus, lo, hi] = int64fromString(value);
                    if (minus)
                        throw new Error('signed value for ulong');
                    return new PbULong(lo, hi);
                case "number":
                    if (value == 0)
                        return this.ZERO;
                    if (!Number.isSafeInteger(value))
                        throw new Error('number is no integer');
                    if (value < 0)
                        throw new Error('signed value for ulong');
                    return new PbULong(value, value / TWO_PWR_32_DBL);
            }
        throw new Error('unknown value ' + typeof value);
    }
    /**
     * Convert to decimal string.
     */
    toString() {
        return BI ? this.toBigInt().toString() : int64toString(this.lo, this.hi);
    }
    /**
     * Convert to native bigint.
     */
    toBigInt() {
        assertBi(BI);
        BI.V.setInt32(0, this.lo, true);
        BI.V.setInt32(4, this.hi, true);
        return BI.V.getBigUint64(0, true);
    }
}
/**
 * ulong 0 singleton.
 */
PbULong.ZERO = new PbULong(0, 0);
/**
 * 64-bit signed integer as two 32-bit values.
 * Converts between `string`, `number` and `bigint` representations.
 */
class PbLong extends SharedPbLong {
    /**
     * Create instance from a `string`, `number` or `bigint`.
     */
    static from(value) {
        if (BI)
            // noinspection FallThroughInSwitchStatementJS
            switch (typeof value) {
                case "string":
                    if (value == "0")
                        return this.ZERO;
                    if (value == "")
                        throw new Error('string is no integer');
                    value = BI.C(value);
                case "number":
                    if (value === 0)
                        return this.ZERO;
                    value = BI.C(value);
                case "bigint":
                    if (!value)
                        return this.ZERO;
                    if (value < BI.MIN)
                        throw new Error('signed long too small');
                    if (value > BI.MAX)
                        throw new Error('signed long too large');
                    BI.V.setBigInt64(0, value, true);
                    return new PbLong(BI.V.getInt32(0, true), BI.V.getInt32(4, true));
            }
        else
            switch (typeof value) {
                case "string":
                    if (value == "0")
                        return this.ZERO;
                    value = value.trim();
                    if (!RE_DECIMAL_STR.test(value))
                        throw new Error('string is no integer');
                    let [minus, lo, hi] = int64fromString(value);
                    if (minus) {
                        if (hi > HALF_2_PWR_32 || (hi == HALF_2_PWR_32 && lo != 0))
                            throw new Error('signed long too small');
                    }
                    else if (hi >= HALF_2_PWR_32)
                        throw new Error('signed long too large');
                    let pbl = new PbLong(lo, hi);
                    return minus ? pbl.negate() : pbl;
                case "number":
                    if (value == 0)
                        return this.ZERO;
                    if (!Number.isSafeInteger(value))
                        throw new Error('number is no integer');
                    return value > 0
                        ? new PbLong(value, value / TWO_PWR_32_DBL)
                        : new PbLong(-value, -value / TWO_PWR_32_DBL).negate();
            }
        throw new Error('unknown value ' + typeof value);
    }
    /**
     * Do we have a minus sign?
     */
    isNegative() {
        return (this.hi & HALF_2_PWR_32) !== 0;
    }
    /**
     * Negate two's complement.
     * Invert all the bits and add one to the result.
     */
    negate() {
        let hi = ~this.hi, lo = this.lo;
        if (lo)
            lo = ~lo + 1;
        else
            hi += 1;
        return new PbLong(lo, hi);
    }
    /**
     * Convert to decimal string.
     */
    toString() {
        if (BI)
            return this.toBigInt().toString();
        if (this.isNegative()) {
            let n = this.negate();
            return '-' + int64toString(n.lo, n.hi);
        }
        return int64toString(this.lo, this.hi);
    }
    /**
     * Convert to native bigint.
     */
    toBigInt() {
        assertBi(BI);
        BI.V.setInt32(0, this.lo, true);
        BI.V.setInt32(4, this.hi, true);
        return BI.V.getBigInt64(0, true);
    }
}
/**
 * long 0 singleton.
 */
PbLong.ZERO = new PbLong(0, 0);

const defaultsRead$1 = {
    readUnknownField: true,
    readerFactory: bytes => new BinaryReader(bytes),
};
/**
 * Make options for reading binary data form partial options.
 */
function binaryReadOptions(options) {
    return options ? Object.assign(Object.assign({}, defaultsRead$1), options) : defaultsRead$1;
}
class BinaryReader {
    constructor(buf, textDecoder) {
        this.varint64 = varint64read; // dirty cast for `this`
        /**
         * Read a `uint32` field, an unsigned 32 bit varint.
         */
        this.uint32 = varint32read; // dirty cast for `this` and access to protected `buf`
        this.buf = buf;
        this.len = buf.length;
        this.pos = 0;
        this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        this.textDecoder = textDecoder !== null && textDecoder !== void 0 ? textDecoder : new TextDecoder("utf-8", {
            fatal: true,
            ignoreBOM: true,
        });
    }
    /**
     * Reads a tag - field number and wire type.
     */
    tag() {
        let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
        if (fieldNo <= 0 || wireType < 0 || wireType > 5)
            throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
        return [fieldNo, wireType];
    }
    /**
     * Skip one element on the wire and return the skipped data.
     * Supports WireType.StartGroup since v2.0.0-alpha.23.
     */
    skip(wireType) {
        let start = this.pos;
        // noinspection FallThroughInSwitchStatementJS
        switch (wireType) {
            case WireType.Varint:
                while (this.buf[this.pos++] & 0x80) {
                    // ignore
                }
                break;
            case WireType.Bit64:
                this.pos += 4;
            case WireType.Bit32:
                this.pos += 4;
                break;
            case WireType.LengthDelimited:
                let len = this.uint32();
                this.pos += len;
                break;
            case WireType.StartGroup:
                // From descriptor.proto: Group type is deprecated, not supported in proto3.
                // But we must still be able to parse and treat as unknown.
                let t;
                while ((t = this.tag()[1]) !== WireType.EndGroup) {
                    this.skip(t);
                }
                break;
            default:
                throw new Error("cant skip wire type " + wireType);
        }
        this.assertBounds();
        return this.buf.subarray(start, this.pos);
    }
    /**
     * Throws error if position in byte array is out of range.
     */
    assertBounds() {
        if (this.pos > this.len)
            throw new RangeError("premature EOF");
    }
    /**
     * Read a `int32` field, a signed 32 bit varint.
     */
    int32() {
        return this.uint32() | 0;
    }
    /**
     * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
     */
    sint32() {
        let zze = this.uint32();
        // decode zigzag
        return (zze >>> 1) ^ -(zze & 1);
    }
    /**
     * Read a `int64` field, a signed 64-bit varint.
     */
    int64() {
        return new PbLong(...this.varint64());
    }
    /**
     * Read a `uint64` field, an unsigned 64-bit varint.
     */
    uint64() {
        return new PbULong(...this.varint64());
    }
    /**
     * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64() {
        let [lo, hi] = this.varint64();
        // decode zig zag
        let s = -(lo & 1);
        lo = ((lo >>> 1 | (hi & 1) << 31) ^ s);
        hi = (hi >>> 1 ^ s);
        return new PbLong(lo, hi);
    }
    /**
     * Read a `bool` field, a variant.
     */
    bool() {
        let [lo, hi] = this.varint64();
        return lo !== 0 || hi !== 0;
    }
    /**
     * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
     */
    fixed32() {
        return this.view.getUint32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
     */
    sfixed32() {
        return this.view.getInt32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
     */
    fixed64() {
        return new PbULong(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
     */
    sfixed64() {
        return new PbLong(this.sfixed32(), this.sfixed32());
    }
    /**
     * Read a `float` field, 32-bit floating point number.
     */
    float() {
        return this.view.getFloat32((this.pos += 4) - 4, true);
    }
    /**
     * Read a `double` field, a 64-bit floating point number.
     */
    double() {
        return this.view.getFloat64((this.pos += 8) - 8, true);
    }
    /**
     * Read a `bytes` field, length-delimited arbitrary data.
     */
    bytes() {
        let len = this.uint32();
        let start = this.pos;
        this.pos += len;
        this.assertBounds();
        return this.buf.subarray(start, start + len);
    }
    /**
     * Read a `string` field, length-delimited data converted to UTF-8 text.
     */
    string() {
        return this.textDecoder.decode(this.bytes());
    }
}

/**
 * assert that condition is true or throw error (with message)
 */
function assert(condition, msg) {
    if (!condition) {
        throw new Error(msg);
    }
}
const FLOAT32_MAX = 3.4028234663852886e+38, FLOAT32_MIN = -3.4028234663852886e+38, UINT32_MAX = 0xFFFFFFFF, INT32_MAX = 0X7FFFFFFF, INT32_MIN = -0X80000000;
function assertInt32(arg) {
    if (typeof arg !== "number")
        throw new Error('invalid int 32: ' + typeof arg);
    if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
        throw new Error('invalid int 32: ' + arg);
}
function assertUInt32(arg) {
    if (typeof arg !== "number")
        throw new Error('invalid uint 32: ' + typeof arg);
    if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
        throw new Error('invalid uint 32: ' + arg);
}
function assertFloat32(arg) {
    if (typeof arg !== "number")
        throw new Error('invalid float 32: ' + typeof arg);
    if (!Number.isFinite(arg))
        return;
    if (arg > FLOAT32_MAX || arg < FLOAT32_MIN)
        throw new Error('invalid float 32: ' + arg);
}

const defaultsWrite$1 = {
    writeUnknownFields: true,
    writerFactory: () => new BinaryWriter(),
};
/**
 * Make options for writing binary data form partial options.
 */
function binaryWriteOptions(options) {
    return options ? Object.assign(Object.assign({}, defaultsWrite$1), options) : defaultsWrite$1;
}
class BinaryWriter {
    constructor(textEncoder) {
        /**
         * Previous fork states.
         */
        this.stack = [];
        this.textEncoder = textEncoder !== null && textEncoder !== void 0 ? textEncoder : new TextEncoder();
        this.chunks = [];
        this.buf = [];
    }
    /**
     * Return all bytes written and reset this writer.
     */
    finish() {
        this.chunks.push(new Uint8Array(this.buf)); // flush the buffer
        let len = 0;
        for (let i = 0; i < this.chunks.length; i++)
            len += this.chunks[i].length;
        let bytes = new Uint8Array(len);
        let offset = 0;
        for (let i = 0; i < this.chunks.length; i++) {
            bytes.set(this.chunks[i], offset);
            offset += this.chunks[i].length;
        }
        this.chunks = [];
        return bytes;
    }
    /**
     * Start a new fork for length-delimited data like a message
     * or a packed repeated field.
     *
     * Must be joined later with `join()`.
     */
    fork() {
        this.stack.push({ chunks: this.chunks, buf: this.buf });
        this.chunks = [];
        this.buf = [];
        return this;
    }
    /**
     * Join the last fork. Write its length and bytes, then
     * return to the previous state.
     */
    join() {
        // get chunk of fork
        let chunk = this.finish();
        // restore previous state
        let prev = this.stack.pop();
        if (!prev)
            throw new Error('invalid state, fork stack empty');
        this.chunks = prev.chunks;
        this.buf = prev.buf;
        // write length of chunk as varint
        this.uint32(chunk.byteLength);
        return this.raw(chunk);
    }
    /**
     * Writes a tag (field number and wire type).
     *
     * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
     *
     * Generated code should compute the tag ahead of time and call `uint32()`.
     */
    tag(fieldNo, type) {
        return this.uint32((fieldNo << 3 | type) >>> 0);
    }
    /**
     * Write a chunk of raw bytes.
     */
    raw(chunk) {
        if (this.buf.length) {
            this.chunks.push(new Uint8Array(this.buf));
            this.buf = [];
        }
        this.chunks.push(chunk);
        return this;
    }
    /**
     * Write a `uint32` value, an unsigned 32 bit varint.
     */
    uint32(value) {
        assertUInt32(value);
        // write value as varint 32, inlined for speed
        while (value > 0x7f) {
            this.buf.push((value & 0x7f) | 0x80);
            value = value >>> 7;
        }
        this.buf.push(value);
        return this;
    }
    /**
     * Write a `int32` value, a signed 32 bit varint.
     */
    int32(value) {
        assertInt32(value);
        varint32write(value, this.buf);
        return this;
    }
    /**
     * Write a `bool` value, a variant.
     */
    bool(value) {
        this.buf.push(value ? 1 : 0);
        return this;
    }
    /**
     * Write a `bytes` value, length-delimited arbitrary data.
     */
    bytes(value) {
        this.uint32(value.byteLength); // write length of chunk as varint
        return this.raw(value);
    }
    /**
     * Write a `string` value, length-delimited data converted to UTF-8 text.
     */
    string(value) {
        let chunk = this.textEncoder.encode(value);
        this.uint32(chunk.byteLength); // write length of chunk as varint
        return this.raw(chunk);
    }
    /**
     * Write a `float` value, 32-bit floating point number.
     */
    float(value) {
        assertFloat32(value);
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setFloat32(0, value, true);
        return this.raw(chunk);
    }
    /**
     * Write a `double` value, a 64-bit floating point number.
     */
    double(value) {
        let chunk = new Uint8Array(8);
        new DataView(chunk.buffer).setFloat64(0, value, true);
        return this.raw(chunk);
    }
    /**
     * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
     */
    fixed32(value) {
        assertUInt32(value);
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setUint32(0, value, true);
        return this.raw(chunk);
    }
    /**
     * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
     */
    sfixed32(value) {
        assertInt32(value);
        let chunk = new Uint8Array(4);
        new DataView(chunk.buffer).setInt32(0, value, true);
        return this.raw(chunk);
    }
    /**
     * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
     */
    sint32(value) {
        assertInt32(value);
        // zigzag encode
        value = ((value << 1) ^ (value >> 31)) >>> 0;
        varint32write(value, this.buf);
        return this;
    }
    /**
     * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
     */
    sfixed64(value) {
        let chunk = new Uint8Array(8);
        let view = new DataView(chunk.buffer);
        let long = PbLong.from(value);
        view.setInt32(0, long.lo, true);
        view.setInt32(4, long.hi, true);
        return this.raw(chunk);
    }
    /**
     * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
     */
    fixed64(value) {
        let chunk = new Uint8Array(8);
        let view = new DataView(chunk.buffer);
        let long = PbULong.from(value);
        view.setInt32(0, long.lo, true);
        view.setInt32(4, long.hi, true);
        return this.raw(chunk);
    }
    /**
     * Write a `int64` value, a signed 64-bit varint.
     */
    int64(value) {
        let long = PbLong.from(value);
        varint64write(long.lo, long.hi, this.buf);
        return this;
    }
    /**
     * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
     */
    sint64(value) {
        let long = PbLong.from(value), 
        // zigzag encode
        sign = long.hi >> 31, lo = (long.lo << 1) ^ sign, hi = ((long.hi << 1) | (long.lo >>> 31)) ^ sign;
        varint64write(lo, hi, this.buf);
        return this;
    }
    /**
     * Write a `uint64` value, an unsigned 64-bit varint.
     */
    uint64(value) {
        let long = PbULong.from(value);
        varint64write(long.lo, long.hi, this.buf);
        return this;
    }
}

const defaultsWrite = {
    emitDefaultValues: false,
    enumAsInteger: false,
    useProtoFieldName: false,
    prettySpaces: 0,
}, defaultsRead = {
    ignoreUnknownFields: false,
};
/**
 * Make options for reading JSON data from partial options.
 */
function jsonReadOptions(options) {
    return options ? Object.assign(Object.assign({}, defaultsRead), options) : defaultsRead;
}
/**
 * Make options for writing JSON data from partial options.
 */
function jsonWriteOptions(options) {
    return options ? Object.assign(Object.assign({}, defaultsWrite), options) : defaultsWrite;
}

/**
 * The symbol used as a key on message objects to store the message type.
 *
 * Note that this is an experimental feature - it is here to stay, but
 * implementation details may change without notice.
 */
const MESSAGE_TYPE = Symbol.for("protobuf-ts/message-type");

/**
 * Converts snake_case to lowerCamelCase.
 *
 * Should behave like protoc:
 * https://github.com/protocolbuffers/protobuf/blob/e8ae137c96444ea313485ed1118c5e43b2099cf1/src/google/protobuf/compiler/java/java_helpers.cc#L118
 */
function lowerCamelCase(snakeCase) {
    let capNext = false;
    const sb = [];
    for (let i = 0; i < snakeCase.length; i++) {
        let next = snakeCase.charAt(i);
        if (next == '_') {
            capNext = true;
        }
        else if (/\d/.test(next)) {
            sb.push(next);
            capNext = true;
        }
        else if (capNext) {
            sb.push(next.toUpperCase());
            capNext = false;
        }
        else if (i == 0) {
            sb.push(next.toLowerCase());
        }
        else {
            sb.push(next);
        }
    }
    return sb.join('');
}

/**
 * Scalar value types. This is a subset of field types declared by protobuf
 * enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
 * are omitted, but the numerical values are identical.
 */
var ScalarType;
(function (ScalarType) {
    // 0 is reserved for errors.
    // Order is weird for historical reasons.
    ScalarType[ScalarType["DOUBLE"] = 1] = "DOUBLE";
    ScalarType[ScalarType["FLOAT"] = 2] = "FLOAT";
    // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
    // negative values are likely.
    ScalarType[ScalarType["INT64"] = 3] = "INT64";
    ScalarType[ScalarType["UINT64"] = 4] = "UINT64";
    // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
    // negative values are likely.
    ScalarType[ScalarType["INT32"] = 5] = "INT32";
    ScalarType[ScalarType["FIXED64"] = 6] = "FIXED64";
    ScalarType[ScalarType["FIXED32"] = 7] = "FIXED32";
    ScalarType[ScalarType["BOOL"] = 8] = "BOOL";
    ScalarType[ScalarType["STRING"] = 9] = "STRING";
    // Tag-delimited aggregate.
    // Group type is deprecated and not supported in proto3. However, Proto3
    // implementations should still be able to parse the group wire format and
    // treat group fields as unknown fields.
    // TYPE_GROUP = 10,
    // TYPE_MESSAGE = 11,  // Length-delimited aggregate.
    // New in version 2.
    ScalarType[ScalarType["BYTES"] = 12] = "BYTES";
    ScalarType[ScalarType["UINT32"] = 13] = "UINT32";
    // TYPE_ENUM = 14,
    ScalarType[ScalarType["SFIXED32"] = 15] = "SFIXED32";
    ScalarType[ScalarType["SFIXED64"] = 16] = "SFIXED64";
    ScalarType[ScalarType["SINT32"] = 17] = "SINT32";
    ScalarType[ScalarType["SINT64"] = 18] = "SINT64";
})(ScalarType || (ScalarType = {}));
/**
 * JavaScript representation of 64 bit integral types. Equivalent to the
 * field option "jstype".
 *
 * By default, protobuf-ts represents 64 bit types as `bigint`.
 *
 * You can change the default behaviour by enabling the plugin parameter
 * `long_type_string`, which will represent 64 bit types as `string`.
 *
 * Alternatively, you can change the behaviour for individual fields
 * with the field option "jstype":
 *
 * ```protobuf
 * uint64 my_field = 1 [jstype = JS_STRING];
 * uint64 other_field = 2 [jstype = JS_NUMBER];
 * ```
 */
var LongType;
(function (LongType) {
    /**
     * Use JavaScript `bigint`.
     *
     * Field option `[jstype = JS_NORMAL]`.
     */
    LongType[LongType["BIGINT"] = 0] = "BIGINT";
    /**
     * Use JavaScript `string`.
     *
     * Field option `[jstype = JS_STRING]`.
     */
    LongType[LongType["STRING"] = 1] = "STRING";
    /**
     * Use JavaScript `number`.
     *
     * Large values will loose precision.
     *
     * Field option `[jstype = JS_NUMBER]`.
     */
    LongType[LongType["NUMBER"] = 2] = "NUMBER";
})(LongType || (LongType = {}));
/**
 * Protobuf 2.1.0 introduced packed repeated fields.
 * Setting the field option `[packed = true]` enables packing.
 *
 * In proto3, all repeated fields are packed by default.
 * Setting the field option `[packed = false]` disables packing.
 *
 * Packed repeated fields are encoded with a single tag,
 * then a length-delimiter, then the element values.
 *
 * Unpacked repeated fields are encoded with a tag and
 * value for each element.
 *
 * `bytes` and `string` cannot be packed.
 */
var RepeatType;
(function (RepeatType) {
    /**
     * The field is not repeated.
     */
    RepeatType[RepeatType["NO"] = 0] = "NO";
    /**
     * The field is repeated and should be packed.
     * Invalid for `bytes` and `string`, they cannot be packed.
     */
    RepeatType[RepeatType["PACKED"] = 1] = "PACKED";
    /**
     * The field is repeated but should not be packed.
     * The only valid repeat type for repeated `bytes` and `string`.
     */
    RepeatType[RepeatType["UNPACKED"] = 2] = "UNPACKED";
})(RepeatType || (RepeatType = {}));
/**
 * Turns PartialFieldInfo into FieldInfo.
 */
function normalizeFieldInfo(field) {
    var _a, _b, _c, _d;
    field.localName = (_a = field.localName) !== null && _a !== void 0 ? _a : lowerCamelCase(field.name);
    field.jsonName = (_b = field.jsonName) !== null && _b !== void 0 ? _b : lowerCamelCase(field.name);
    field.repeat = (_c = field.repeat) !== null && _c !== void 0 ? _c : RepeatType.NO;
    field.opt = (_d = field.opt) !== null && _d !== void 0 ? _d : (field.repeat ? false : field.oneof ? false : field.kind == "message");
    return field;
}

/**
 * Is the given value a valid oneof group?
 *
 * We represent protobuf `oneof` as algebraic data types (ADT) in generated
 * code. But when working with messages of unknown type, the ADT does not
 * help us.
 *
 * This type guard checks if the given object adheres to the ADT rules, which
 * are as follows:
 *
 * 1) Must be an object.
 *
 * 2) Must have a "oneofKind" discriminator property.
 *
 * 3) If "oneofKind" is `undefined`, no member field is selected. The object
 * must not have any other properties.
 *
 * 4) If "oneofKind" is a `string`, the member field with this name is
 * selected.
 *
 * 5) If a member field is selected, the object must have a second property
 * with this name. The property must not be `undefined`.
 *
 * 6) No extra properties are allowed. The object has either one property
 * (no selection) or two properties (selection).
 *
 */
function isOneofGroup(any) {
    if (typeof any != 'object' || any === null || !any.hasOwnProperty('oneofKind')) {
        return false;
    }
    switch (typeof any.oneofKind) {
        case "string":
            if (any[any.oneofKind] === undefined)
                return false;
            return Object.keys(any).length == 2;
        case "undefined":
            return Object.keys(any).length == 1;
        default:
            return false;
    }
}

// noinspection JSMethodCanBeStatic
class ReflectionTypeCheck {
    constructor(info) {
        var _a;
        this.fields = (_a = info.fields) !== null && _a !== void 0 ? _a : [];
    }
    prepare() {
        if (this.data)
            return;
        const req = [], known = [], oneofs = [];
        for (let field of this.fields) {
            if (field.oneof) {
                if (!oneofs.includes(field.oneof)) {
                    oneofs.push(field.oneof);
                    req.push(field.oneof);
                    known.push(field.oneof);
                }
            }
            else {
                known.push(field.localName);
                switch (field.kind) {
                    case "scalar":
                    case "enum":
                        if (!field.opt || field.repeat)
                            req.push(field.localName);
                        break;
                    case "message":
                        if (field.repeat)
                            req.push(field.localName);
                        break;
                    case "map":
                        req.push(field.localName);
                        break;
                }
            }
        }
        this.data = { req, known, oneofs: Object.values(oneofs) };
    }
    /**
     * Is the argument a valid message as specified by the
     * reflection information?
     *
     * Checks all field types recursively. The `depth`
     * specifies how deep into the structure the check will be.
     *
     * With a depth of 0, only the presence of fields
     * is checked.
     *
     * With a depth of 1 or more, the field types are checked.
     *
     * With a depth of 2 or more, the members of map, repeated
     * and message fields are checked.
     *
     * Message fields will be checked recursively with depth - 1.
     *
     * The number of map entries / repeated values being checked
     * is < depth.
     */
    is(message, depth, allowExcessProperties = false) {
        if (depth < 0)
            return true;
        if (message === null || message === undefined || typeof message != 'object')
            return false;
        this.prepare();
        let keys = Object.keys(message), data = this.data;
        // if a required field is missing in arg, this cannot be a T
        if (keys.length < data.req.length || data.req.some(n => !keys.includes(n)))
            return false;
        if (!allowExcessProperties) {
            // if the arg contains a key we dont know, this is not a literal T
            if (keys.some(k => !data.known.includes(k)))
                return false;
        }
        // "With a depth of 0, only the presence and absence of fields is checked."
        // "With a depth of 1 or more, the field types are checked."
        if (depth < 1) {
            return true;
        }
        // check oneof group
        for (const name of data.oneofs) {
            const group = message[name];
            if (!isOneofGroup(group))
                return false;
            if (group.oneofKind === undefined)
                continue;
            const field = this.fields.find(f => f.localName === group.oneofKind);
            if (!field)
                return false; // we found no field, but have a kind, something is wrong
            if (!this.field(group[group.oneofKind], field, allowExcessProperties, depth))
                return false;
        }
        // check types
        for (const field of this.fields) {
            if (field.oneof !== undefined)
                continue;
            if (!this.field(message[field.localName], field, allowExcessProperties, depth))
                return false;
        }
        return true;
    }
    field(arg, field, allowExcessProperties, depth) {
        let repeated = field.repeat;
        switch (field.kind) {
            case "scalar":
                if (arg === undefined)
                    return field.opt;
                if (repeated)
                    return this.scalars(arg, field.T, depth, field.L);
                return this.scalar(arg, field.T, field.L);
            case "enum":
                if (arg === undefined)
                    return field.opt;
                if (repeated)
                    return this.scalars(arg, ScalarType.INT32, depth);
                return this.scalar(arg, ScalarType.INT32);
            case "message":
                if (arg === undefined)
                    return true;
                if (repeated)
                    return this.messages(arg, field.T(), allowExcessProperties, depth);
                return this.message(arg, field.T(), allowExcessProperties, depth);
            case "map":
                if (typeof arg != 'object' || arg === null)
                    return false;
                if (depth < 2)
                    return true;
                if (!this.mapKeys(arg, field.K, depth))
                    return false;
                switch (field.V.kind) {
                    case "scalar":
                        return this.scalars(Object.values(arg), field.V.T, depth, field.V.L);
                    case "enum":
                        return this.scalars(Object.values(arg), ScalarType.INT32, depth);
                    case "message":
                        return this.messages(Object.values(arg), field.V.T(), allowExcessProperties, depth);
                }
                break;
        }
        return true;
    }
    message(arg, type, allowExcessProperties, depth) {
        if (allowExcessProperties) {
            return type.isAssignable(arg, depth);
        }
        return type.is(arg, depth);
    }
    messages(arg, type, allowExcessProperties, depth) {
        if (!Array.isArray(arg))
            return false;
        if (depth < 2)
            return true;
        if (allowExcessProperties) {
            for (let i = 0; i < arg.length && i < depth; i++)
                if (!type.isAssignable(arg[i], depth - 1))
                    return false;
        }
        else {
            for (let i = 0; i < arg.length && i < depth; i++)
                if (!type.is(arg[i], depth - 1))
                    return false;
        }
        return true;
    }
    scalar(arg, type, longType) {
        let argType = typeof arg;
        switch (type) {
            case ScalarType.UINT64:
            case ScalarType.FIXED64:
            case ScalarType.INT64:
            case ScalarType.SFIXED64:
            case ScalarType.SINT64:
                switch (longType) {
                    case LongType.BIGINT:
                        return argType == "bigint";
                    case LongType.NUMBER:
                        return argType == "number" && !isNaN(arg);
                    default:
                        return argType == "string";
                }
            case ScalarType.BOOL:
                return argType == 'boolean';
            case ScalarType.STRING:
                return argType == 'string';
            case ScalarType.BYTES:
                return arg instanceof Uint8Array;
            case ScalarType.DOUBLE:
            case ScalarType.FLOAT:
                return argType == 'number' && !isNaN(arg);
            default:
                // case ScalarType.UINT32:
                // case ScalarType.FIXED32:
                // case ScalarType.INT32:
                // case ScalarType.SINT32:
                // case ScalarType.SFIXED32:
                return argType == 'number' && Number.isInteger(arg);
        }
    }
    scalars(arg, type, depth, longType) {
        if (!Array.isArray(arg))
            return false;
        if (depth < 2)
            return true;
        if (Array.isArray(arg))
            for (let i = 0; i < arg.length && i < depth; i++)
                if (!this.scalar(arg[i], type, longType))
                    return false;
        return true;
    }
    mapKeys(map, type, depth) {
        let keys = Object.keys(map);
        switch (type) {
            case ScalarType.INT32:
            case ScalarType.FIXED32:
            case ScalarType.SFIXED32:
            case ScalarType.SINT32:
            case ScalarType.UINT32:
                return this.scalars(keys.slice(0, depth).map(k => parseInt(k)), type, depth);
            case ScalarType.BOOL:
                return this.scalars(keys.slice(0, depth).map(k => k == 'true' ? true : k == 'false' ? false : k), type, depth);
            default:
                return this.scalars(keys, type, depth, LongType.STRING);
        }
    }
}

/**
 * Utility method to convert a PbLong or PbUlong to a JavaScript
 * representation during runtime.
 *
 * Works with generated field information, `undefined` is equivalent
 * to `STRING`.
 */
function reflectionLongConvert(long, type) {
    switch (type) {
        case LongType.BIGINT:
            return long.toBigInt();
        case LongType.NUMBER:
            return long.toNumber();
        default:
            // case undefined:
            // case LongType.STRING:
            return long.toString();
    }
}

/**
 * Reads proto3 messages in canonical JSON format using reflection information.
 *
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 */
class ReflectionJsonReader {
    constructor(info) {
        this.info = info;
    }
    prepare() {
        var _a;
        if (this.fMap === undefined) {
            this.fMap = {};
            const fieldsInput = (_a = this.info.fields) !== null && _a !== void 0 ? _a : [];
            for (const field of fieldsInput) {
                this.fMap[field.name] = field;
                this.fMap[field.jsonName] = field;
                this.fMap[field.localName] = field;
            }
        }
    }
    // Cannot parse JSON <type of jsonValue> for <type name>#<fieldName>.
    assert(condition, fieldName, jsonValue) {
        if (!condition) {
            let what = typeofJsonValue(jsonValue);
            if (what == "number" || what == "boolean")
                what = jsonValue.toString();
            throw new Error(`Cannot parse JSON ${what} for ${this.info.typeName}#${fieldName}`);
        }
    }
    /**
     * Reads a message from canonical JSON format into the target message.
     *
     * Repeated fields are appended. Map entries are added, overwriting
     * existing keys.
     *
     * If a message field is already present, it will be merged with the
     * new data.
     */
    read(input, message, options) {
        this.prepare();
        const oneofsHandled = [];
        for (const [jsonKey, jsonValue] of Object.entries(input)) {
            const field = this.fMap[jsonKey];
            if (!field) {
                if (!options.ignoreUnknownFields)
                    throw new Error(`Found unknown field while reading ${this.info.typeName} from JSON format. JSON key: ${jsonKey}`);
                continue;
            }
            const localName = field.localName;
            // handle oneof ADT
            let target; // this will be the target for the field value, whether it is member of a oneof or not
            if (field.oneof) {
                if (jsonValue === null && (field.kind !== 'enum' || field.T()[0] !== 'google.protobuf.NullValue')) {
                    continue;
                }
                // since json objects are unordered by specification, it is not possible to take the last of multiple oneofs
                if (oneofsHandled.includes(field.oneof))
                    throw new Error(`Multiple members of the oneof group "${field.oneof}" of ${this.info.typeName} are present in JSON.`);
                oneofsHandled.push(field.oneof);
                target = message[field.oneof] = {
                    oneofKind: localName
                };
            }
            else {
                target = message;
            }
            // we have handled oneof above. we just have read the value into `target`.
            if (field.kind == 'map') {
                if (jsonValue === null) {
                    continue;
                }
                // check input
                this.assert(isJsonObject(jsonValue), field.name, jsonValue);
                // our target to put map entries into
                const fieldObj = target[localName];
                // read entries
                for (const [jsonObjKey, jsonObjValue] of Object.entries(jsonValue)) {
                    this.assert(jsonObjValue !== null, field.name + " map value", null);
                    // read value
                    let val;
                    switch (field.V.kind) {
                        case "message":
                            val = field.V.T().internalJsonRead(jsonObjValue, options);
                            break;
                        case "enum":
                            val = this.enum(field.V.T(), jsonObjValue, field.name, options.ignoreUnknownFields);
                            if (val === false)
                                continue;
                            break;
                        case "scalar":
                            val = this.scalar(jsonObjValue, field.V.T, field.V.L, field.name);
                            break;
                    }
                    this.assert(val !== undefined, field.name + " map value", jsonObjValue);
                    // read key
                    let key = jsonObjKey;
                    if (field.K == ScalarType.BOOL)
                        key = key == "true" ? true : key == "false" ? false : key;
                    key = this.scalar(key, field.K, LongType.STRING, field.name).toString();
                    fieldObj[key] = val;
                }
            }
            else if (field.repeat) {
                if (jsonValue === null)
                    continue;
                // check input
                this.assert(Array.isArray(jsonValue), field.name, jsonValue);
                // our target to put array entries into
                const fieldArr = target[localName];
                // read array entries
                for (const jsonItem of jsonValue) {
                    this.assert(jsonItem !== null, field.name, null);
                    let val;
                    switch (field.kind) {
                        case "message":
                            val = field.T().internalJsonRead(jsonItem, options);
                            break;
                        case "enum":
                            val = this.enum(field.T(), jsonItem, field.name, options.ignoreUnknownFields);
                            if (val === false)
                                continue;
                            break;
                        case "scalar":
                            val = this.scalar(jsonItem, field.T, field.L, field.name);
                            break;
                    }
                    this.assert(val !== undefined, field.name, jsonValue);
                    fieldArr.push(val);
                }
            }
            else {
                switch (field.kind) {
                    case "message":
                        if (jsonValue === null && field.T().typeName != 'google.protobuf.Value') {
                            this.assert(field.oneof === undefined, field.name + " (oneof member)", null);
                            continue;
                        }
                        target[localName] = field.T().internalJsonRead(jsonValue, options, target[localName]);
                        break;
                    case "enum":
                        let val = this.enum(field.T(), jsonValue, field.name, options.ignoreUnknownFields);
                        if (val === false)
                            continue;
                        target[localName] = val;
                        break;
                    case "scalar":
                        target[localName] = this.scalar(jsonValue, field.T, field.L, field.name);
                        break;
                }
            }
        }
    }
    /**
     * Returns `false` for unrecognized string representations.
     *
     * google.protobuf.NullValue accepts only JSON `null` (or the old `"NULL_VALUE"`).
     */
    enum(type, json, fieldName, ignoreUnknownFields) {
        if (type[0] == 'google.protobuf.NullValue')
            assert(json === null || json === "NULL_VALUE", `Unable to parse field ${this.info.typeName}#${fieldName}, enum ${type[0]} only accepts null.`);
        if (json === null)
            // we require 0 to be default value for all enums
            return 0;
        switch (typeof json) {
            case "number":
                assert(Number.isInteger(json), `Unable to parse field ${this.info.typeName}#${fieldName}, enum can only be integral number, got ${json}.`);
                return json;
            case "string":
                let localEnumName = json;
                if (type[2] && json.substring(0, type[2].length) === type[2])
                    // lookup without the shared prefix
                    localEnumName = json.substring(type[2].length);
                let enumNumber = type[1][localEnumName];
                if (typeof enumNumber === 'undefined' && ignoreUnknownFields) {
                    return false;
                }
                assert(typeof enumNumber == "number", `Unable to parse field ${this.info.typeName}#${fieldName}, enum ${type[0]} has no value for "${json}".`);
                return enumNumber;
        }
        assert(false, `Unable to parse field ${this.info.typeName}#${fieldName}, cannot parse enum value from ${typeof json}".`);
    }
    scalar(json, type, longType, fieldName) {
        let e;
        try {
            switch (type) {
                // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
                // Either numbers or strings are accepted. Exponent notation is also accepted.
                case ScalarType.DOUBLE:
                case ScalarType.FLOAT:
                    if (json === null)
                        return .0;
                    if (json === "NaN")
                        return Number.NaN;
                    if (json === "Infinity")
                        return Number.POSITIVE_INFINITY;
                    if (json === "-Infinity")
                        return Number.NEGATIVE_INFINITY;
                    if (json === "") {
                        e = "empty string";
                        break;
                    }
                    if (typeof json == "string" && json.trim().length !== json.length) {
                        e = "extra whitespace";
                        break;
                    }
                    if (typeof json != "string" && typeof json != "number") {
                        break;
                    }
                    let float = Number(json);
                    if (Number.isNaN(float)) {
                        e = "not a number";
                        break;
                    }
                    if (!Number.isFinite(float)) {
                        // infinity and -infinity are handled by string representation above, so this is an error
                        e = "too large or small";
                        break;
                    }
                    if (type == ScalarType.FLOAT)
                        assertFloat32(float);
                    return float;
                // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
                case ScalarType.INT32:
                case ScalarType.FIXED32:
                case ScalarType.SFIXED32:
                case ScalarType.SINT32:
                case ScalarType.UINT32:
                    if (json === null)
                        return 0;
                    let int32;
                    if (typeof json == "number")
                        int32 = json;
                    else if (json === "")
                        e = "empty string";
                    else if (typeof json == "string") {
                        if (json.trim().length !== json.length)
                            e = "extra whitespace";
                        else
                            int32 = Number(json);
                    }
                    if (int32 === undefined)
                        break;
                    if (type == ScalarType.UINT32)
                        assertUInt32(int32);
                    else
                        assertInt32(int32);
                    return int32;
                // int64, fixed64, uint64: JSON value will be a decimal string. Either numbers or strings are accepted.
                case ScalarType.INT64:
                case ScalarType.SFIXED64:
                case ScalarType.SINT64:
                    if (json === null)
                        return reflectionLongConvert(PbLong.ZERO, longType);
                    if (typeof json != "number" && typeof json != "string")
                        break;
                    return reflectionLongConvert(PbLong.from(json), longType);
                case ScalarType.FIXED64:
                case ScalarType.UINT64:
                    if (json === null)
                        return reflectionLongConvert(PbULong.ZERO, longType);
                    if (typeof json != "number" && typeof json != "string")
                        break;
                    return reflectionLongConvert(PbULong.from(json), longType);
                // bool:
                case ScalarType.BOOL:
                    if (json === null)
                        return false;
                    if (typeof json !== "boolean")
                        break;
                    return json;
                // string:
                case ScalarType.STRING:
                    if (json === null)
                        return "";
                    if (typeof json !== "string") {
                        e = "extra whitespace";
                        break;
                    }
                    try {
                        encodeURIComponent(json);
                    }
                    catch (e) {
                        e = "invalid UTF8";
                        break;
                    }
                    return json;
                // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
                // Either standard or URL-safe base64 encoding with/without paddings are accepted.
                case ScalarType.BYTES:
                    if (json === null || json === "")
                        return new Uint8Array(0);
                    if (typeof json !== 'string')
                        break;
                    return base64decode(json);
            }
        }
        catch (error) {
            e = error.message;
        }
        this.assert(false, fieldName + (e ? " - " + e : ""), json);
    }
}

/**
 * Writes proto3 messages in canonical JSON format using reflection
 * information.
 *
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 */
class ReflectionJsonWriter {
    constructor(info) {
        var _a;
        this.fields = (_a = info.fields) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * Converts the message to a JSON object, based on the field descriptors.
     */
    write(message, options) {
        const json = {}, source = message;
        for (const field of this.fields) {
            // field is not part of a oneof, simply write as is
            if (!field.oneof) {
                let jsonValue = this.field(field, source[field.localName], options);
                if (jsonValue !== undefined)
                    json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
                continue;
            }
            // field is part of a oneof
            const group = source[field.oneof];
            if (group.oneofKind !== field.localName)
                continue; // not selected, skip
            const opt = field.kind == 'scalar' || field.kind == 'enum'
                ? Object.assign(Object.assign({}, options), { emitDefaultValues: true }) : options;
            let jsonValue = this.field(field, group[field.localName], opt);
            assert(jsonValue !== undefined);
            json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
        }
        return json;
    }
    field(field, value, options) {
        let jsonValue = undefined;
        if (field.kind == 'map') {
            assert(typeof value == "object" && value !== null);
            const jsonObj = {};
            switch (field.V.kind) {
                case "scalar":
                    for (const [entryKey, entryValue] of Object.entries(value)) {
                        const val = this.scalar(field.V.T, entryValue, field.name, false, true);
                        assert(val !== undefined);
                        jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
                    }
                    break;
                case "message":
                    const messageType = field.V.T();
                    for (const [entryKey, entryValue] of Object.entries(value)) {
                        const val = this.message(messageType, entryValue, field.name, options);
                        assert(val !== undefined);
                        jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
                    }
                    break;
                case "enum":
                    const enumInfo = field.V.T();
                    for (const [entryKey, entryValue] of Object.entries(value)) {
                        assert(entryValue === undefined || typeof entryValue == 'number');
                        const val = this.enum(enumInfo, entryValue, field.name, false, true, options.enumAsInteger);
                        assert(val !== undefined);
                        jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
                    }
                    break;
            }
            if (options.emitDefaultValues || Object.keys(jsonObj).length > 0)
                jsonValue = jsonObj;
        }
        else if (field.repeat) {
            assert(Array.isArray(value));
            const jsonArr = [];
            switch (field.kind) {
                case "scalar":
                    for (let i = 0; i < value.length; i++) {
                        const val = this.scalar(field.T, value[i], field.name, field.opt, true);
                        assert(val !== undefined);
                        jsonArr.push(val);
                    }
                    break;
                case "enum":
                    const enumInfo = field.T();
                    for (let i = 0; i < value.length; i++) {
                        assert(value[i] === undefined || typeof value[i] == 'number');
                        const val = this.enum(enumInfo, value[i], field.name, field.opt, true, options.enumAsInteger);
                        assert(val !== undefined);
                        jsonArr.push(val);
                    }
                    break;
                case "message":
                    const messageType = field.T();
                    for (let i = 0; i < value.length; i++) {
                        const val = this.message(messageType, value[i], field.name, options);
                        assert(val !== undefined);
                        jsonArr.push(val);
                    }
                    break;
            }
            // add converted array to json output
            if (options.emitDefaultValues || jsonArr.length > 0 || options.emitDefaultValues)
                jsonValue = jsonArr;
        }
        else {
            switch (field.kind) {
                case "scalar":
                    jsonValue = this.scalar(field.T, value, field.name, field.opt, options.emitDefaultValues);
                    break;
                case "enum":
                    jsonValue = this.enum(field.T(), value, field.name, field.opt, options.emitDefaultValues, options.enumAsInteger);
                    break;
                case "message":
                    jsonValue = this.message(field.T(), value, field.name, options);
                    break;
            }
        }
        return jsonValue;
    }
    /**
     * Returns `null` as the default for google.protobuf.NullValue.
     */
    enum(type, value, fieldName, optional, emitDefaultValues, enumAsInteger) {
        if (type[0] == 'google.protobuf.NullValue')
            return !emitDefaultValues && !optional ? undefined : null;
        if (value === undefined) {
            assert(optional);
            return undefined;
        }
        if (value === 0 && !emitDefaultValues && !optional)
            // we require 0 to be default value for all enums
            return undefined;
        assert(typeof value == 'number');
        assert(Number.isInteger(value));
        if (enumAsInteger || !type[1].hasOwnProperty(value))
            // if we don't now the enum value, just return the number
            return value;
        if (type[2])
            // restore the dropped prefix
            return type[2] + type[1][value];
        return type[1][value];
    }
    message(type, value, fieldName, options) {
        if (value === undefined)
            return options.emitDefaultValues ? null : undefined;
        return type.internalJsonWrite(value, options);
    }
    scalar(type, value, fieldName, optional, emitDefaultValues) {
        if (value === undefined) {
            assert(optional);
            return undefined;
        }
        const ed = emitDefaultValues || optional;
        // noinspection FallThroughInSwitchStatementJS
        switch (type) {
            // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
            case ScalarType.INT32:
            case ScalarType.SFIXED32:
            case ScalarType.SINT32:
                if (value === 0)
                    return ed ? 0 : undefined;
                assertInt32(value);
                return value;
            case ScalarType.FIXED32:
            case ScalarType.UINT32:
                if (value === 0)
                    return ed ? 0 : undefined;
                assertUInt32(value);
                return value;
            // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
            // Either numbers or strings are accepted. Exponent notation is also accepted.
            case ScalarType.FLOAT:
                assertFloat32(value);
            case ScalarType.DOUBLE:
                if (value === 0)
                    return ed ? 0 : undefined;
                assert(typeof value == 'number');
                if (Number.isNaN(value))
                    return 'NaN';
                if (value === Number.POSITIVE_INFINITY)
                    return 'Infinity';
                if (value === Number.NEGATIVE_INFINITY)
                    return '-Infinity';
                return value;
            // string:
            case ScalarType.STRING:
                if (value === "")
                    return ed ? '' : undefined;
                assert(typeof value == 'string');
                return value;
            // bool:
            case ScalarType.BOOL:
                if (value === false)
                    return ed ? false : undefined;
                assert(typeof value == 'boolean');
                return value;
            // JSON value will be a decimal string. Either numbers or strings are accepted.
            case ScalarType.UINT64:
            case ScalarType.FIXED64:
                assert(typeof value == 'number' || typeof value == 'string' || typeof value == 'bigint');
                let ulong = PbULong.from(value);
                if (ulong.isZero() && !ed)
                    return undefined;
                return ulong.toString();
            // JSON value will be a decimal string. Either numbers or strings are accepted.
            case ScalarType.INT64:
            case ScalarType.SFIXED64:
            case ScalarType.SINT64:
                assert(typeof value == 'number' || typeof value == 'string' || typeof value == 'bigint');
                let long = PbLong.from(value);
                if (long.isZero() && !ed)
                    return undefined;
                return long.toString();
            // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
            // Either standard or URL-safe base64 encoding with/without paddings are accepted.
            case ScalarType.BYTES:
                assert(value instanceof Uint8Array);
                if (!value.byteLength)
                    return ed ? "" : undefined;
                return base64encode(value);
        }
    }
}

/**
 * Creates the default value for a scalar type.
 */
function reflectionScalarDefault(type, longType = LongType.STRING) {
    switch (type) {
        case ScalarType.BOOL:
            return false;
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
            return reflectionLongConvert(PbULong.ZERO, longType);
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
            return reflectionLongConvert(PbLong.ZERO, longType);
        case ScalarType.DOUBLE:
        case ScalarType.FLOAT:
            return 0.0;
        case ScalarType.BYTES:
            return new Uint8Array(0);
        case ScalarType.STRING:
            return "";
        default:
            // case ScalarType.INT32:
            // case ScalarType.UINT32:
            // case ScalarType.SINT32:
            // case ScalarType.FIXED32:
            // case ScalarType.SFIXED32:
            return 0;
    }
}

/**
 * Reads proto3 messages in binary format using reflection information.
 *
 * https://developers.google.com/protocol-buffers/docs/encoding
 */
class ReflectionBinaryReader {
    constructor(info) {
        this.info = info;
    }
    prepare() {
        var _a;
        if (!this.fieldNoToField) {
            const fieldsInput = (_a = this.info.fields) !== null && _a !== void 0 ? _a : [];
            this.fieldNoToField = new Map(fieldsInput.map(field => [field.no, field]));
        }
    }
    /**
     * Reads a message from binary format into the target message.
     *
     * Repeated fields are appended. Map entries are added, overwriting
     * existing keys.
     *
     * If a message field is already present, it will be merged with the
     * new data.
     */
    read(reader, message, options, length) {
        this.prepare();
        const end = length === undefined ? reader.len : reader.pos + length;
        while (reader.pos < end) {
            // read the tag and find the field
            const [fieldNo, wireType] = reader.tag(), field = this.fieldNoToField.get(fieldNo);
            if (!field) {
                let u = options.readUnknownField;
                if (u == "throw")
                    throw new Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.info.typeName}`);
                let d = reader.skip(wireType);
                if (u !== false)
                    (u === true ? UnknownFieldHandler.onRead : u)(this.info.typeName, message, fieldNo, wireType, d);
                continue;
            }
            // target object for the field we are reading
            let target = message, repeated = field.repeat, localName = field.localName;
            // if field is member of oneof ADT, use ADT as target
            if (field.oneof) {
                target = target[field.oneof];
                // if other oneof member selected, set new ADT
                if (target.oneofKind !== localName)
                    target = message[field.oneof] = {
                        oneofKind: localName
                    };
            }
            // we have handled oneof above, we just have read the value into `target[localName]`
            switch (field.kind) {
                case "scalar":
                case "enum":
                    let T = field.kind == "enum" ? ScalarType.INT32 : field.T;
                    let L = field.kind == "scalar" ? field.L : undefined;
                    if (repeated) {
                        let arr = target[localName]; // safe to assume presence of array, oneof cannot contain repeated values
                        if (wireType == WireType.LengthDelimited && T != ScalarType.STRING && T != ScalarType.BYTES) {
                            let e = reader.uint32() + reader.pos;
                            while (reader.pos < e)
                                arr.push(this.scalar(reader, T, L));
                        }
                        else
                            arr.push(this.scalar(reader, T, L));
                    }
                    else
                        target[localName] = this.scalar(reader, T, L);
                    break;
                case "message":
                    if (repeated) {
                        let arr = target[localName]; // safe to assume presence of array, oneof cannot contain repeated values
                        let msg = field.T().internalBinaryRead(reader, reader.uint32(), options);
                        arr.push(msg);
                    }
                    else
                        target[localName] = field.T().internalBinaryRead(reader, reader.uint32(), options, target[localName]);
                    break;
                case "map":
                    let [mapKey, mapVal] = this.mapEntry(field, reader, options);
                    // safe to assume presence of map object, oneof cannot contain repeated values
                    target[localName][mapKey] = mapVal;
                    break;
            }
        }
    }
    /**
     * Read a map field, expecting key field = 1, value field = 2
     */
    mapEntry(field, reader, options) {
        let length = reader.uint32();
        let end = reader.pos + length;
        let key = undefined; // javascript only allows number or string for object properties
        let val = undefined;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    if (field.K == ScalarType.BOOL)
                        key = reader.bool().toString();
                    else
                        // long types are read as string, number types are okay as number
                        key = this.scalar(reader, field.K, LongType.STRING);
                    break;
                case 2:
                    switch (field.V.kind) {
                        case "scalar":
                            val = this.scalar(reader, field.V.T, field.V.L);
                            break;
                        case "enum":
                            val = reader.int32();
                            break;
                        case "message":
                            val = field.V.T().internalBinaryRead(reader, reader.uint32(), options);
                            break;
                    }
                    break;
                default:
                    throw new Error(`Unknown field ${fieldNo} (wire type ${wireType}) in map entry for ${this.info.typeName}#${field.name}`);
            }
        }
        if (key === undefined) {
            let keyRaw = reflectionScalarDefault(field.K);
            key = field.K == ScalarType.BOOL ? keyRaw.toString() : keyRaw;
        }
        if (val === undefined)
            switch (field.V.kind) {
                case "scalar":
                    val = reflectionScalarDefault(field.V.T, field.V.L);
                    break;
                case "enum":
                    val = 0;
                    break;
                case "message":
                    val = field.V.T().create();
                    break;
            }
        return [key, val];
    }
    scalar(reader, type, longType) {
        switch (type) {
            case ScalarType.INT32:
                return reader.int32();
            case ScalarType.STRING:
                return reader.string();
            case ScalarType.BOOL:
                return reader.bool();
            case ScalarType.DOUBLE:
                return reader.double();
            case ScalarType.FLOAT:
                return reader.float();
            case ScalarType.INT64:
                return reflectionLongConvert(reader.int64(), longType);
            case ScalarType.UINT64:
                return reflectionLongConvert(reader.uint64(), longType);
            case ScalarType.FIXED64:
                return reflectionLongConvert(reader.fixed64(), longType);
            case ScalarType.FIXED32:
                return reader.fixed32();
            case ScalarType.BYTES:
                return reader.bytes();
            case ScalarType.UINT32:
                return reader.uint32();
            case ScalarType.SFIXED32:
                return reader.sfixed32();
            case ScalarType.SFIXED64:
                return reflectionLongConvert(reader.sfixed64(), longType);
            case ScalarType.SINT32:
                return reader.sint32();
            case ScalarType.SINT64:
                return reflectionLongConvert(reader.sint64(), longType);
        }
    }
}

/**
 * Writes proto3 messages in binary format using reflection information.
 *
 * https://developers.google.com/protocol-buffers/docs/encoding
 */
class ReflectionBinaryWriter {
    constructor(info) {
        this.info = info;
    }
    prepare() {
        if (!this.fields) {
            const fieldsInput = this.info.fields ? this.info.fields.concat() : [];
            this.fields = fieldsInput.sort((a, b) => a.no - b.no);
        }
    }
    /**
     * Writes the message to binary format.
     */
    write(message, writer, options) {
        this.prepare();
        for (const field of this.fields) {
            let value, // this will be our field value, whether it is member of a oneof or not
            emitDefault, // whether we emit the default value (only true for oneof members)
            repeated = field.repeat, localName = field.localName;
            // handle oneof ADT
            if (field.oneof) {
                const group = message[field.oneof];
                if (group.oneofKind !== localName)
                    continue; // if field is not selected, skip
                value = group[localName];
                emitDefault = true;
            }
            else {
                value = message[localName];
                emitDefault = false;
            }
            // we have handled oneof above. we just have to honor `emitDefault`.
            switch (field.kind) {
                case "scalar":
                case "enum":
                    let T = field.kind == "enum" ? ScalarType.INT32 : field.T;
                    if (repeated) {
                        assert(Array.isArray(value));
                        if (repeated == RepeatType.PACKED)
                            this.packed(writer, T, field.no, value);
                        else
                            for (const item of value)
                                this.scalar(writer, T, field.no, item, true);
                    }
                    else if (value === undefined)
                        assert(field.opt);
                    else
                        this.scalar(writer, T, field.no, value, emitDefault || field.opt);
                    break;
                case "message":
                    if (repeated) {
                        assert(Array.isArray(value));
                        for (const item of value)
                            this.message(writer, options, field.T(), field.no, item);
                    }
                    else {
                        this.message(writer, options, field.T(), field.no, value);
                    }
                    break;
                case "map":
                    assert(typeof value == 'object' && value !== null);
                    for (const [key, val] of Object.entries(value))
                        this.mapEntry(writer, options, field, key, val);
                    break;
            }
        }
        let u = options.writeUnknownFields;
        if (u !== false)
            (u === true ? UnknownFieldHandler.onWrite : u)(this.info.typeName, message, writer);
    }
    mapEntry(writer, options, field, key, value) {
        writer.tag(field.no, WireType.LengthDelimited);
        writer.fork();
        // javascript only allows number or string for object properties
        // we convert from our representation to the protobuf type
        let keyValue = key;
        switch (field.K) {
            case ScalarType.INT32:
            case ScalarType.FIXED32:
            case ScalarType.UINT32:
            case ScalarType.SFIXED32:
            case ScalarType.SINT32:
                keyValue = Number.parseInt(key);
                break;
            case ScalarType.BOOL:
                assert(key == 'true' || key == 'false');
                keyValue = key == 'true';
                break;
        }
        // write key, expecting key field number = 1
        this.scalar(writer, field.K, 1, keyValue, true);
        // write value, expecting value field number = 2
        switch (field.V.kind) {
            case 'scalar':
                this.scalar(writer, field.V.T, 2, value, true);
                break;
            case 'enum':
                this.scalar(writer, ScalarType.INT32, 2, value, true);
                break;
            case 'message':
                this.message(writer, options, field.V.T(), 2, value);
                break;
        }
        writer.join();
    }
    message(writer, options, handler, fieldNo, value) {
        if (value === undefined)
            return;
        handler.internalBinaryWrite(value, writer.tag(fieldNo, WireType.LengthDelimited).fork(), options);
        writer.join();
    }
    /**
     * Write a single scalar value.
     */
    scalar(writer, type, fieldNo, value, emitDefault) {
        let [wireType, method, isDefault] = this.scalarInfo(type, value);
        if (!isDefault || emitDefault) {
            writer.tag(fieldNo, wireType);
            writer[method](value);
        }
    }
    /**
     * Write an array of scalar values in packed format.
     */
    packed(writer, type, fieldNo, value) {
        if (!value.length)
            return;
        assert(type !== ScalarType.BYTES && type !== ScalarType.STRING);
        // write tag
        writer.tag(fieldNo, WireType.LengthDelimited);
        // begin length-delimited
        writer.fork();
        // write values without tags
        let [, method,] = this.scalarInfo(type);
        for (let i = 0; i < value.length; i++)
            writer[method](value[i]);
        // end length delimited
        writer.join();
    }
    /**
     * Get information for writing a scalar value.
     *
     * Returns tuple:
     * [0]: appropriate WireType
     * [1]: name of the appropriate method of IBinaryWriter
     * [2]: whether the given value is a default value
     *
     * If argument `value` is omitted, [2] is always false.
     */
    scalarInfo(type, value) {
        let t = WireType.Varint;
        let m;
        let i = value === undefined;
        let d = value === 0;
        switch (type) {
            case ScalarType.INT32:
                m = "int32";
                break;
            case ScalarType.STRING:
                d = i || !value.length;
                t = WireType.LengthDelimited;
                m = "string";
                break;
            case ScalarType.BOOL:
                d = value === false;
                m = "bool";
                break;
            case ScalarType.UINT32:
                m = "uint32";
                break;
            case ScalarType.DOUBLE:
                t = WireType.Bit64;
                m = "double";
                break;
            case ScalarType.FLOAT:
                t = WireType.Bit32;
                m = "float";
                break;
            case ScalarType.INT64:
                d = i || PbLong.from(value).isZero();
                m = "int64";
                break;
            case ScalarType.UINT64:
                d = i || PbULong.from(value).isZero();
                m = "uint64";
                break;
            case ScalarType.FIXED64:
                d = i || PbULong.from(value).isZero();
                t = WireType.Bit64;
                m = "fixed64";
                break;
            case ScalarType.BYTES:
                d = i || !value.byteLength;
                t = WireType.LengthDelimited;
                m = "bytes";
                break;
            case ScalarType.FIXED32:
                t = WireType.Bit32;
                m = "fixed32";
                break;
            case ScalarType.SFIXED32:
                t = WireType.Bit32;
                m = "sfixed32";
                break;
            case ScalarType.SFIXED64:
                d = i || PbLong.from(value).isZero();
                t = WireType.Bit64;
                m = "sfixed64";
                break;
            case ScalarType.SINT32:
                m = "sint32";
                break;
            case ScalarType.SINT64:
                d = i || PbLong.from(value).isZero();
                m = "sint64";
                break;
        }
        return [t, m, i || d];
    }
}

/**
 * Creates an instance of the generic message, using the field
 * information.
 */
function reflectionCreate(type) {
    /**
     * This ternary can be removed in the next major version.
     * The `Object.create()` code path utilizes a new `messagePrototype`
     * property on the `IMessageType` which has this same `MESSAGE_TYPE`
     * non-enumerable property on it. Doing it this way means that we only
     * pay the cost of `Object.defineProperty()` once per `IMessageType`
     * class of once per "instance". The falsy code path is only provided
     * for backwards compatibility in cases where the runtime library is
     * updated without also updating the generated code.
     */
    const msg = type.messagePrototype
        ? Object.create(type.messagePrototype)
        : Object.defineProperty({}, MESSAGE_TYPE, { value: type });
    for (let field of type.fields) {
        let name = field.localName;
        if (field.opt)
            continue;
        if (field.oneof)
            msg[field.oneof] = { oneofKind: undefined };
        else if (field.repeat)
            msg[name] = [];
        else
            switch (field.kind) {
                case "scalar":
                    msg[name] = reflectionScalarDefault(field.T, field.L);
                    break;
                case "enum":
                    // we require 0 to be default value for all enums
                    msg[name] = 0;
                    break;
                case "map":
                    msg[name] = {};
                    break;
            }
    }
    return msg;
}

/**
 * Copy partial data into the target message.
 *
 * If a singular scalar or enum field is present in the source, it
 * replaces the field in the target.
 *
 * If a singular message field is present in the source, it is merged
 * with the target field by calling mergePartial() of the responsible
 * message type.
 *
 * If a repeated field is present in the source, its values replace
 * all values in the target array, removing extraneous values.
 * Repeated message fields are copied, not merged.
 *
 * If a map field is present in the source, entries are added to the
 * target map, replacing entries with the same key. Entries that only
 * exist in the target remain. Entries with message values are copied,
 * not merged.
 *
 * Note that this function differs from protobuf merge semantics,
 * which appends repeated fields.
 */
function reflectionMergePartial(info, target, source) {
    let fieldValue, // the field value we are working with
    input = source, output; // where we want our field value to go
    for (let field of info.fields) {
        let name = field.localName;
        if (field.oneof) {
            const group = input[field.oneof]; // this is the oneof`s group in the source
            if ((group === null || group === void 0 ? void 0 : group.oneofKind) == undefined) { // the user is free to omit
                continue; // we skip this field, and all other members too
            }
            fieldValue = group[name]; // our value comes from the the oneof group of the source
            output = target[field.oneof]; // and our output is the oneof group of the target
            output.oneofKind = group.oneofKind; // always update discriminator
            if (fieldValue == undefined) {
                delete output[name]; // remove any existing value
                continue; // skip further work on field
            }
        }
        else {
            fieldValue = input[name]; // we are using the source directly
            output = target; // we want our field value to go directly into the target
            if (fieldValue == undefined) {
                continue; // skip further work on field, existing value is used as is
            }
        }
        if (field.repeat)
            output[name].length = fieldValue.length; // resize target array to match source array
        // now we just work with `fieldValue` and `output` to merge the value
        switch (field.kind) {
            case "scalar":
            case "enum":
                if (field.repeat)
                    for (let i = 0; i < fieldValue.length; i++)
                        output[name][i] = fieldValue[i]; // not a reference type
                else
                    output[name] = fieldValue; // not a reference type
                break;
            case "message":
                let T = field.T();
                if (field.repeat)
                    for (let i = 0; i < fieldValue.length; i++)
                        output[name][i] = T.create(fieldValue[i]);
                else if (output[name] === undefined)
                    output[name] = T.create(fieldValue); // nothing to merge with
                else
                    T.mergePartial(output[name], fieldValue);
                break;
            case "map":
                // Map and repeated fields are simply overwritten, not appended or merged
                switch (field.V.kind) {
                    case "scalar":
                    case "enum":
                        Object.assign(output[name], fieldValue); // elements are not reference types
                        break;
                    case "message":
                        let T = field.V.T();
                        for (let k of Object.keys(fieldValue))
                            output[name][k] = T.create(fieldValue[k]);
                        break;
                }
                break;
        }
    }
}

/**
 * Determines whether two message of the same type have the same field values.
 * Checks for deep equality, traversing repeated fields, oneof groups, maps
 * and messages recursively.
 * Will also return true if both messages are `undefined`.
 */
function reflectionEquals(info, a, b) {
    if (a === b)
        return true;
    if (!a || !b)
        return false;
    for (let field of info.fields) {
        let localName = field.localName;
        let val_a = field.oneof ? a[field.oneof][localName] : a[localName];
        let val_b = field.oneof ? b[field.oneof][localName] : b[localName];
        switch (field.kind) {
            case "enum":
            case "scalar":
                let t = field.kind == "enum" ? ScalarType.INT32 : field.T;
                if (!(field.repeat
                    ? repeatedPrimitiveEq(t, val_a, val_b)
                    : primitiveEq(t, val_a, val_b)))
                    return false;
                break;
            case "map":
                if (!(field.V.kind == "message"
                    ? repeatedMsgEq(field.V.T(), objectValues(val_a), objectValues(val_b))
                    : repeatedPrimitiveEq(field.V.kind == "enum" ? ScalarType.INT32 : field.V.T, objectValues(val_a), objectValues(val_b))))
                    return false;
                break;
            case "message":
                let T = field.T();
                if (!(field.repeat
                    ? repeatedMsgEq(T, val_a, val_b)
                    : T.equals(val_a, val_b)))
                    return false;
                break;
        }
    }
    return true;
}
const objectValues = Object.values;
function primitiveEq(type, a, b) {
    if (a === b)
        return true;
    if (type !== ScalarType.BYTES)
        return false;
    let ba = a;
    let bb = b;
    if (ba.length !== bb.length)
        return false;
    for (let i = 0; i < ba.length; i++)
        if (ba[i] != bb[i])
            return false;
    return true;
}
function repeatedPrimitiveEq(type, a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++)
        if (!primitiveEq(type, a[i], b[i]))
            return false;
    return true;
}
function repeatedMsgEq(type, a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++)
        if (!type.equals(a[i], b[i]))
            return false;
    return true;
}

/**
 * This standard message type provides reflection-based
 * operations to work with a message.
 */
class MessageType {
    constructor(name, fields, options) {
        this.defaultCheckDepth = 16;
        this.typeName = name;
        this.fields = fields.map(normalizeFieldInfo);
        this.options = options !== null && options !== void 0 ? options : {};
        this.messagePrototype = Object.defineProperty({}, MESSAGE_TYPE, { value: this });
        this.refTypeCheck = new ReflectionTypeCheck(this);
        this.refJsonReader = new ReflectionJsonReader(this);
        this.refJsonWriter = new ReflectionJsonWriter(this);
        this.refBinReader = new ReflectionBinaryReader(this);
        this.refBinWriter = new ReflectionBinaryWriter(this);
    }
    create(value) {
        let message = reflectionCreate(this);
        if (value !== undefined) {
            reflectionMergePartial(this, message, value);
        }
        return message;
    }
    /**
     * Clone the message.
     *
     * Unknown fields are discarded.
     */
    clone(message) {
        let copy = this.create();
        reflectionMergePartial(this, copy, message);
        return copy;
    }
    /**
     * Determines whether two message of the same type have the same field values.
     * Checks for deep equality, traversing repeated fields, oneof groups, maps
     * and messages recursively.
     * Will also return true if both messages are `undefined`.
     */
    equals(a, b) {
        return reflectionEquals(this, a, b);
    }
    /**
     * Is the given value assignable to our message type
     * and contains no [excess properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks)?
     */
    is(arg, depth = this.defaultCheckDepth) {
        return this.refTypeCheck.is(arg, depth, false);
    }
    /**
     * Is the given value assignable to our message type,
     * regardless of [excess properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks)?
     */
    isAssignable(arg, depth = this.defaultCheckDepth) {
        return this.refTypeCheck.is(arg, depth, true);
    }
    /**
     * Copy partial data into the target message.
     */
    mergePartial(target, source) {
        reflectionMergePartial(this, target, source);
    }
    /**
     * Create a new message from binary format.
     */
    fromBinary(data, options) {
        let opt = binaryReadOptions(options);
        return this.internalBinaryRead(opt.readerFactory(data), data.byteLength, opt);
    }
    /**
     * Read a new message from a JSON value.
     */
    fromJson(json, options) {
        return this.internalJsonRead(json, jsonReadOptions(options));
    }
    /**
     * Read a new message from a JSON string.
     * This is equivalent to `T.fromJson(JSON.parse(json))`.
     */
    fromJsonString(json, options) {
        let value = JSON.parse(json);
        return this.fromJson(value, options);
    }
    /**
     * Write the message to canonical JSON value.
     */
    toJson(message, options) {
        return this.internalJsonWrite(message, jsonWriteOptions(options));
    }
    /**
     * Convert the message to canonical JSON string.
     * This is equivalent to `JSON.stringify(T.toJson(t))`
     */
    toJsonString(message, options) {
        var _a;
        let value = this.toJson(message, options);
        return JSON.stringify(value, null, (_a = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a !== void 0 ? _a : 0);
    }
    /**
     * Write the message to binary format.
     */
    toBinary(message, options) {
        let opt = binaryWriteOptions(options);
        return this.internalBinaryWrite(message, opt.writerFactory(), opt).finish();
    }
    /**
     * This is an internal method. If you just want to read a message from
     * JSON, use `fromJson()` or `fromJsonString()`.
     *
     * Reads JSON value and merges the fields into the target
     * according to protobuf rules. If the target is omitted,
     * a new instance is created first.
     */
    internalJsonRead(json, options, target) {
        if (json !== null && typeof json == "object" && !Array.isArray(json)) {
            let message = target !== null && target !== void 0 ? target : this.create();
            this.refJsonReader.read(json, message, options);
            return message;
        }
        throw new Error(`Unable to parse message ${this.typeName} from JSON ${typeofJsonValue(json)}.`);
    }
    /**
     * This is an internal method. If you just want to write a message
     * to JSON, use `toJson()` or `toJsonString().
     *
     * Writes JSON value and returns it.
     */
    internalJsonWrite(message, options) {
        return this.refJsonWriter.write(message, options);
    }
    /**
     * This is an internal method. If you just want to write a message
     * in binary format, use `toBinary()`.
     *
     * Serializes the message in binary format and appends it to the given
     * writer. Returns passed writer.
     */
    internalBinaryWrite(message, writer, options) {
        this.refBinWriter.write(message, writer, options);
        return writer;
    }
    /**
     * This is an internal method. If you just want to read a message from
     * binary data, use `fromBinary()`.
     *
     * Reads data from binary format and merges the fields into
     * the target according to protobuf rules. If the target is
     * omitted, a new instance is created first.
     */
    internalBinaryRead(reader, length, options, target) {
        let message = target !== null && target !== void 0 ? target : this.create();
        this.refBinReader.read(reader, message, options, length);
        return message;
    }
}

const $ = new ENV("🍿 DualSubs: ▶ YouTube v1.4.0(4) request.beta");

// 构造回复数据
let $response = undefined;

/***************** Processing *****************/
// 解构URL
const url = new URL($request.url);
$.log(`⚠ url: ${url.toJSON()}`, "");
// 获取连接参数
const METHOD = $request.method, HOST = url.hostname, PATH = url.pathname;
$.log(`⚠ METHOD: ${METHOD}, HOST: ${HOST}, PATH: ${PATH}` , "");
// 解析格式
const FORMAT = ($request.headers?.["Content-Type"] ?? $request.headers?.["content-type"])?.split(";")?.[0];
$.log(`⚠ FORMAT: ${FORMAT}`, "");
!(async () => {
	// 读取设置
	const { Settings, Caches, Configs } = setENV("DualSubs", "YouTube", Database$1);
	$.log(`⚠ Settings.Switch: ${Settings?.Switch}`, "");
	switch (Settings.Switch) {
		case true:
		default:
			// 获取字幕类型与语言
			const Type = url.searchParams.get("subtype") ?? Settings.Type, Languages = [url.searchParams.get("lang")?.toUpperCase?.() ?? Settings.Languages[0], (url.searchParams.get("tlang") ?? Caches?.tlang)?.toUpperCase?.() ?? Settings.Languages[1]];
			$.log(`⚠ Type: ${Type}, Languages: ${Languages}`, "");
			// 创建空数据
			let body = {};
			// 方法判断
			switch (METHOD) {
				case "POST":
				case "PUT":
				case "PATCH":
				case "DELETE":
					// 格式判断
					switch (FORMAT) {
						case undefined: // 视为无body
							break;
						case "application/x-www-form-urlencoded":
						case "text/plain":
						default:
							break;
						case "application/x-mpegURL":
						case "application/x-mpegurl":
						case "application/vnd.apple.mpegurl":
						case "audio/mpegurl":
							//body = M3U8.parse($request.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = M3U8.stringify(body);
							break;
						case "text/xml":
						case "text/html":
						case "text/plist":
						case "application/xml":
						case "application/plist":
						case "application/x-plist":
							//body = XML.parse($request.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = XML.stringify(body);
							break;
						case "text/vtt":
						case "application/vtt":
							//body = VTT.parse($request.body);
							//$.log(`🚧 body: ${JSON.stringify(body)}`, "");
							//$request.body = VTT.stringify(body);
							break;
						case "text/json":
						case "application/json":
							body = JSON.parse($request.body ?? "{}");
							switch (PATH) {
								case "/youtubei/v1/player":
									// 找功能
									if (body?.playbackContext) { // 有播放设置
										$.log(`⚠ playbackContext`, "");
										if (body?.playbackContext.contentPlaybackContext) { // 有播放设置内容
											body.playbackContext.contentPlaybackContext.autoCaptionsDefaultOn = true; // 默认开启自动字幕
										}									}									break;
								case "/youtubei/v1/browse":
									if (body?.browseId?.startsWith?.("MPLYt_")) url.searchParams.set("subtype", "Translate");
									break;
								}							$request.body = JSON.stringify(body);
							break;
						case "application/protobuf":
						case "application/x-protobuf":
						case "application/vnd.google.protobuf":
						case "application/grpc":
						case "application/grpc+proto":
						case "application/octet-stream":
							//$.log(`🚧 调试信息`, `$request: ${JSON.stringify($request, null, 2)}`, "");
							let rawBody = $.isQuanX() ? new Uint8Array($request.bodyBytes ?? []) : $request.body ?? new Uint8Array();
							//$.log(`🚧 调试信息`, `isBuffer? ${ArrayBuffer.isView(rawBody)}: ${JSON.stringify(rawBody)}`, "");
							switch (FORMAT) {
								case "application/protobuf":
								case "application/x-protobuf":
								case "application/vnd.google.protobuf":
									/******************  initialization start  *******************/
									class Context$Type extends MessageType {
										constructor() {
											super("Context", [
												{ no: 1, name: "client", kind: "message", T: () => Client },
												{ no: 9, name: "adSignalsInfo", kind: "message", T: () => AdSignalsInfo }
											]);
										}
									}
									const Context = new Context$Type();
									class Client$Type extends MessageType {
										constructor() {
											super("Client", [
												{ no: 1, name: "hl", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
												{ no: 2, name: "gl", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
												{ no: 12, name: "deviceMake", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 13, name: "deviceModel", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 16, name: "clientName", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
												{ no: 17, name: "clientVersion", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 18, name: "osName", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 19, name: "osVersion", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
												{ no: 80, name: "timeZone", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
											]);
										}
									}
									const Client = new Client$Type();
									class AdSignalsInfo$Type extends MessageType {
										constructor() {
											super("AdSignalsInfo", [
												{ no: 1, name: "params", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 9 /*ScalarType.STRING*/ } }
											]);
										}
									}
									const AdSignalsInfo = new AdSignalsInfo$Type();
									/******************  initialization finish  *******************/
									switch (PATH) {
										case "/youtubei/v1/player":
											/******************  initialization start  *******************/
											// proto/player.request.js
											class Player$Type extends MessageType {
												constructor() {
													super("Player", [
														{ no: 1, name: "context", kind: "message", T: () => Context },
														{ no: 2, name: "videoId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
														{ no: 4, name: "playbackContext", kind: "message", T: () => PlaybackContext }
													]);
												}
											}
											const Player = new Player$Type();
											class PlaybackContext$Type extends MessageType {
												constructor() {
													super("PlaybackContext", [
														{ no: 1, name: "contentPlaybackContext", kind: "message", T: () => ContentPlaybackContext }
													]);
												}
											}
											const PlaybackContext = new PlaybackContext$Type();
											class ContentPlaybackContext$Type extends MessageType {
												constructor() {
													super("ContentPlaybackContext", [
														{ no: 4, name: "id4", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
														{ no: 6, name: "id6", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
														{ no: 8, name: "id8", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
														{ no: 9, name: "id9", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ }
													]);
												}
											}
											const ContentPlaybackContext = new ContentPlaybackContext$Type();
											/******************  initialization finish  *******************/
											body = Player.fromBinary(rawBody);
											$.log(`🚧 调试信息`, `data: ${JSON.stringify(body)}`, "");
											// 找功能
											if (body?.playbackContext) { // 有播放设置
												$.log(`⚠ playbackContext`, "");
												if (body?.playbackContext.contentPlaybackContext) { // 有播放设置内容
													//body.playbackContext.contentPlaybackContext.autoCaptionsDefaultOn = true; // 默认开启自动字幕
													body.playbackContext.contentPlaybackContext.id4 = 1; // 
													body.playbackContext.contentPlaybackContext.id6 = 1; // 
													body.playbackContext.contentPlaybackContext.id8 = 1; // 
													body.playbackContext.contentPlaybackContext.id9 = 1; // 
												}											}											$.log(`🚧 调试信息`, `data: ${JSON.stringify(body)}`, "");
											rawBody = Player.toBinary(body);
											break;
										case "/youtubei/v1/browse":
											/******************  initialization start  *******************/
											// proto/browse.request.js
											class Browse$Type extends MessageType {
												constructor() {
													super("Browse", [
														{ no: 1, name: "context", kind: "message", T: () => Context },
														{ no: 2, name: "browseId", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
													]);
												}
											}											const Browse = new Browse$Type();
											/******************  initialization finish  *******************/
											body = Browse.fromBinary(rawBody);
											$.log(`🚧 调试信息`, `data: ${JSON.stringify(body)}`, "");
											if (body?.browseId?.startsWith?.("MPLYt_")) {
												/*
												if (Settings.Types.includes("Translate")) _.set(URL, "query.subtype", "Translate");
												else if (Settings.Types.includes("External")) _.set(URL, "query.subtype", "External");
												*/
												const detectStutus = $.fetch($request);
												//const detectTrack = $.fetch(_request);
												await Promise.allSettled([detectStutus]).then(results => {
													/*
													results.forEach((result, i) => {
														$.log(`🚧 调试信息`, `result[${i}]: ${JSON.stringify(result)}`, "");
													});
													*/
													switch (results[0].status) {
														case "fulfilled":
															let response = results[0].value;
															switch (response?.headers?.["content-encoding"] ?? response?.headers?.["Content-Encoding"]) {
																case "identity":
																	if (parseInt(response?.headers?.["content-length"] ?? response?.headers?.["Content-Length"], 10) > 4000) {
																		if (Settings.Types.includes("Translate")) url.searchParams.set("subtype", "Translate");
																		else if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
																	} else {
																		if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
																	}																	break;
																case "gzip":
																	break;
																case "br":
																	if (parseInt(response?.headers?.["content-length"] ?? response?.headers?.["Content-Length"], 10) > 2000) {
																		if (Settings.Types.includes("Translate")) url.searchParams.set("subtype", "Translate");
																		else if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
																	} else {
																		if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
																	}																	break;
															}															break;
														case "rejected":
															$.log(`🚧 调试信息`, `detectStutus.reason: ${JSON.stringify(results[0].reason)}`, "");
															if (Settings.Types.includes("External")) url.searchParams.set("subtype", "External");
															break;
													}												});
											}											rawBody = Browse.toBinary(body);
											break;
									}									break;
							}							// 写入二进制数据
							$request.body = rawBody;
							break;
					}					//break; // 不中断，继续处理URL
				case "GET":
					// 主机判断
					switch (HOST) {
						case "www.youtube.com":
						case "m.youtube.com":
							// 路径判断
							switch (PATH) {
								case "/api/timedtext":
									const v = url.searchParams.get("v");
									const kind = url.searchParams.get("kind");
									const lang = url.searchParams.get("lang");
									const tlang = url.searchParams.get("tlang");
									$.log(`⚠ v: ${v}, kind: ${kind}, lang: ${lang}, tlang: ${tlang}`, "");
									if (!tlang) {
										$.log(`⚠ 翻译语言：未指定`, "");
										// 保存原文语言
										if (v && lang) {
											Caches.Playlists.Subtitle.set(v, lang);
											Caches.Playlists.Subtitle = setCache(Caches?.Playlists.Subtitle, Settings.CacheSize);
											$Storage.setItem(`@DualSubs.${"Composite"}.Caches.Playlists.Subtitle`, Caches.Playlists.Subtitle);
										}										// 自动翻译字幕
										switch (Settings.AutoCC) {
											case true:
											default:
												$.log(`⚠ 自动翻译字幕：开启`, "");
												if (Caches.tlang) {
													if (Caches.tlang !== lang) url.searchParams.set("tlang", Caches.tlang);
												}
												break;
											case false:
												$.log(`⚠ 自动翻译字幕：关闭`, "");
												break;
										}									}									if (url.searchParams.get("tlang")) {
										$.log(`⚠ 翻译语言：已指定`, "");
										// 保存目标语言
										Caches.tlang = url.searchParams.get("tlang");
										$Storage.setItem(`@DualSubs.${"YouTube"}.Caches.tlang`, Caches.tlang);
										// 字幕类型判断
										switch (Settings.Type) {
											case "Composite":
											case "Official":
											default:
												$.log(`⚠ 官方字幕：合成器`, "");
												if (lang?.split?.(/[-_]/)?.[0] === url.searchParams.get("tlang")?.split?.(/[-_]/)?.[0]) Settings.ShowOnly = true;
												if (!Settings.ShowOnly) url.searchParams.set("subtype", "Official"); // 官方字幕
												break;
											case "Translate":
												$.log(`⚠ 翻译字幕：翻译器`, "");
												url.searchParams.delete("tlang");
												url.searchParams.set("subtype", "Translate"); // 翻译字幕
												/*
												switch (URL.query?.kind) { // 类型判断
													case "asr":
														$.log(`⚠ 自动生成（听译）字幕`, "");
														$.log(`⚠ 仅支持官方字幕`, "");
														if (!Settings.ShowOnly) url.searchParams.set("subtype", "Official"); // 官方字幕
														break;
													case "captions":
													default:
														$.log(`⚠ 普通字幕`, "");
														url.searchParams.delete("tlang");
														url.searchParams.set("subtype", "Translate"); // 翻译字幕
												};
												*/
												break;
											case "External":
												$.log(`⚠ 外部字幕：外部源`, "");
												url.searchParams.delete("tlang");
												url.searchParams.set("subtype", "External"); // 外挂字幕
												break;
										}									}									break;
							}							break;
					}			}			$request.url = url.toString();
			$.log(`🚧 调试信息`, `$request.url: ${$request.url}`, "");
			break;
		case false:
			break;
	}})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		switch ($response) {
			default: // 有构造回复数据，返回构造的回复数据
				if ($.isQuanX()) {
					if (!$response.status) $response.status = "HTTP/1.1 200 OK";
					delete $response.headers?.["Content-Length"];
					delete $response.headers?.["content-length"];
					delete $response.headers?.["Transfer-Encoding"];
					$.done($response);
				} else $.done({ response: $response });
				break;
			case undefined: // 无构造回复数据，发送修改的请求数据
				//$.log(`🚧 finally`, `$request: ${JSON.stringify($request, null, 2)}`, "");
				$.done($request);
				break;
		}	});
