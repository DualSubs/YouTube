/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("🍿 DualSubs for ▶ YouTube v0.7.1(4) player.request.beta");
const URL = new URLs();
const DataBase = {
	"Verify": {
		"Settings":{"GoogleCloud":{"Method":"Part","Mode":"Key","Auth":null},"Azure":{"Method":"Part","Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Method":"Part","Version":"Free","Auth":null}}
	},
	"Advanced": {
		"Settings":{"Translator":{"Times":3,"Interval":100,"Exponential":true}}
	},
	"Default": {
		"Settings":{"Switch":true,"Types":["Official","Google","GoogleCloud","Azure","DeepL"],"Type":"Google","Languages":["ZH","EN"],"Language":"ZH","External":{"URL":null,"Offset":0,"ShowOnly":false},"Position":"Forward","CacheSize":6,"Tolerance":1000},
		"Configs": {
			"Languages":{"AUTO":"","AR":["ar","ar-001"],"BG":["bg","bg-BG","bul"],"CS":["cs","cs-CZ","ces"],"DA":["da","da-DK","dan"],"DE":["de","de-DE","deu"],"EL":["el","el-GR","ell"],"EN":["en","en-US","eng","en-GB","en-UK","en-CA","en-US SDH"],"EN-CA":["en-CA","en","eng"],"EN-GB":["en-UK","en","eng"],"EN-US":["en-US","en","eng"],"EN-US SDH":["en-US SDH","en-US","en","eng"],"ES":["es","es-419","es-ES","spa","es-419 SDH"],"ES-419":["es-419","es","spa"],"ES-419 SDH":["es-419 SDH","es-419","es","spa"],"ES-ES":["es-ES","es","spa"],"ET":["et","et-EE","est"],"FI":["fi","fi-FI","fin"],"FR":["fr","fr-CA","fr-FR","fra"],"FR-CA":["fr-CA","fr","fra"],"FR-DR":["fr-FR","fr","fra"],"HU":["hu","hu-HU","hun"],"ID":["id","id-id"],"IT":["it","it-IT","ita"],"JA":["ja","ja-JP","jpn"],"KO":["ko","ko-KR","kor"],"LT":["lt","lt-LT","lit"],"LV":["lv","lv-LV","lav"],"NL":["nl","nl-NL","nld"],"NO":["no","nb-NO","nor"],"PL":["pl","pl-PL"],"PT":["pt","pt-PT","pt-BR","por"],"PT-PT":["pt-PT","pt","por"],"PT-BR":["pt-BR","pt","por"],"RO":["ro","ro-RO","ron"],"RU":["ru","ru-RU","rus"],"SK":["sk","sk-SK","slk"],"SL":["sl","sl-SI","slv"],"SV":["sv","sv-SE","swe"],"IS":["is","is-IS","isl"],"ZH":["zh","cmn","zho","zh-CN","zh-Hans","cmn-Hans","zh-TW","zh-Hant","cmn-Hant","zh-HK","yue-Hant","yue"],"ZH-CN":["zh-CN","zh-Hans","cmn-Hans","zho"],"ZH-HANS":["zh-Hans","cmn-Hans","zh-CN","zho"],"ZH-HK":["zh-HK","yue-Hant","yue","zho"],"ZH-TW":["zh-TW","zh-Hant","cmn-Hant","zho"],"ZH-HANT":["zh-Hant","cmn-Hant","zh-TW","zho"],"YUE":["yue","yue-Hant","zh-HK","zho"],"YUE-HK":["yue-Hant","yue","zh-HK","zho"]}
		}
	},
	"YouTube": {
		"Configs": {
			"Languages":{"BG":"bg-BG","CS":"cs","DA":"da-DK","DE":"de","EL":"el","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","ET":"et-EE","FI":"fi","FR":"fr","HU":"hu-HU","ID":"id","IT":"it","JA":"ja","KO":"ko","LT":"lt-LT","LV":"lv-LV","NL":"nl-NL","NO":"nb-NO","PL":"pl-PL","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro-RO","RU":"ru-RU","SK":"sk-SK","SL":"sl-SI","SV":"sv-SE","IS":"is-IS","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-Hant-HK","ZH-HANT":"zh-Hant","ZH-TW":"zh-TW","YUE":"yue","YUE-HK":"yue-HK"},
			"translationLanguages":{
				"DESKTOP":[{"languageCode":"sq","languageName":{"simpleText":"阿尔巴尼亚语"}},{"languageCode":"ak","languageName":{"simpleText":"阿肯语"}},{"languageCode":"ar","languageName":{"simpleText":"阿拉伯语"}},{"languageCode":"am","languageName":{"simpleText":"阿姆哈拉语"}},{"languageCode":"as","languageName":{"simpleText":"阿萨姆语"}},{"languageCode":"az","languageName":{"simpleText":"阿塞拜疆语"}},{"languageCode":"ee","languageName":{"simpleText":"埃维语"}},{"languageCode":"ay","languageName":{"simpleText":"艾马拉语"}},{"languageCode":"ga","languageName":{"simpleText":"爱尔兰语"}},{"languageCode":"et","languageName":{"simpleText":"爱沙尼亚语"}},{"languageCode":"or","languageName":{"simpleText":"奥里亚语"}},{"languageCode":"om","languageName":{"simpleText":"奥罗莫语"}},{"languageCode":"eu","languageName":{"simpleText":"巴斯克语"}},{"languageCode":"be","languageName":{"simpleText":"白俄罗斯语"}},{"languageCode":"bg","languageName":{"simpleText":"保加利亚语"}},{"languageCode":"nso","languageName":{"simpleText":"北索托语"}},{"languageCode":"is","languageName":{"simpleText":"冰岛语"}},{"languageCode":"pl","languageName":{"simpleText":"波兰语"}},{"languageCode":"bs","languageName":{"simpleText":"波斯尼亚语"}},{"languageCode":"fa","languageName":{"simpleText":"波斯语"}},{"languageCode":"bho","languageName":{"simpleText":"博杰普尔语"}},{"languageCode":"ts","languageName":{"simpleText":"聪加语"}},{"languageCode":"tt","languageName":{"simpleText":"鞑靼语"}},{"languageCode":"da","languageName":{"simpleText":"丹麦语"}},{"languageCode":"de","languageName":{"simpleText":"德语"}},{"languageCode":"dv","languageName":{"simpleText":"迪维希语"}},{"languageCode":"ru","languageName":{"simpleText":"俄语"}},{"languageCode":"fr","languageName":{"simpleText":"法语"}},{"languageCode":"sa","languageName":{"simpleText":"梵语"}},{"languageCode":"fil","languageName":{"simpleText":"菲律宾语"}},{"languageCode":"fi","languageName":{"simpleText":"芬兰语"}},{"languageCode":"km","languageName":{"simpleText":"高棉语"}},{"languageCode":"ka","languageName":{"simpleText":"格鲁吉亚语"}},{"languageCode":"gu","languageName":{"simpleText":"古吉拉特语"}},{"languageCode":"gn","languageName":{"simpleText":"瓜拉尼语"}},{"languageCode":"kk","languageName":{"simpleText":"哈萨克语"}},{"languageCode":"ht","languageName":{"simpleText":"海地克里奥尔语"}},{"languageCode":"ko","languageName":{"simpleText":"韩语"}},{"languageCode":"ha","languageName":{"simpleText":"豪萨语"}},{"languageCode":"nl","languageName":{"simpleText":"荷兰语"}},{"languageCode":"gl","languageName":{"simpleText":"加利西亚语"}},{"languageCode":"ca","languageName":{"simpleText":"加泰罗尼亚语"}},{"languageCode":"cs","languageName":{"simpleText":"捷克语"}},{"languageCode":"kn","languageName":{"simpleText":"卡纳达语"}},{"languageCode":"ky","languageName":{"simpleText":"柯尔克孜语"}},{"languageCode":"xh","languageName":{"simpleText":"科萨语"}},{"languageCode":"co","languageName":{"simpleText":"科西嘉语"}},{"languageCode":"hr","languageName":{"simpleText":"克罗地亚语"}},{"languageCode":"qu","languageName":{"simpleText":"克丘亚语"}},{"languageCode":"ku","languageName":{"simpleText":"库尔德语"}},{"languageCode":"la","languageName":{"simpleText":"拉丁语"}},{"languageCode":"lv","languageName":{"simpleText":"拉脱维亚语"}},{"languageCode":"lo","languageName":{"simpleText":"老挝语"}},{"languageCode":"lt","languageName":{"simpleText":"立陶宛语"}},{"languageCode":"ln","languageName":{"simpleText":"林加拉语"}},{"languageCode":"lg","languageName":{"simpleText":"卢干达语"}},{"languageCode":"lb","languageName":{"simpleText":"卢森堡语"}},{"languageCode":"rw","languageName":{"simpleText":"卢旺达语"}},{"languageCode":"ro","languageName":{"simpleText":"罗马尼亚语"}},{"languageCode":"mt","languageName":{"simpleText":"马耳他语"}},{"languageCode":"mr","languageName":{"simpleText":"马拉地语"}},{"languageCode":"mg","languageName":{"simpleText":"马拉加斯语"}},{"languageCode":"ml","languageName":{"simpleText":"马拉雅拉姆语"}},{"languageCode":"ms","languageName":{"simpleText":"马来语"}},{"languageCode":"mk","languageName":{"simpleText":"马其顿语"}},{"languageCode":"mi","languageName":{"simpleText":"毛利语"}},{"languageCode":"mn","languageName":{"simpleText":"蒙古语"}},{"languageCode":"bn","languageName":{"simpleText":"孟加拉语"}},{"languageCode":"my","languageName":{"simpleText":"缅甸语"}},{"languageCode":"hmn","languageName":{"simpleText":"苗语"}},{"languageCode":"af","languageName":{"simpleText":"南非荷兰语"}},{"languageCode":"st","languageName":{"simpleText":"南索托语"}},{"languageCode":"ne","languageName":{"simpleText":"尼泊尔语"}},{"languageCode":"no","languageName":{"simpleText":"挪威语"}},{"languageCode":"pa","languageName":{"simpleText":"旁遮普语"}},{"languageCode":"pt","languageName":{"simpleText":"葡萄牙语"}},{"languageCode":"ps","languageName":{"simpleText":"普什图语"}},{"languageCode":"ny","languageName":{"simpleText":"齐切瓦语"}},{"languageCode":"ja","languageName":{"simpleText":"日语"}},{"languageCode":"sv","languageName":{"simpleText":"瑞典语"}},{"languageCode":"sm","languageName":{"simpleText":"萨摩亚语"}},{"languageCode":"sr","languageName":{"simpleText":"塞尔维亚语"}},{"languageCode":"si","languageName":{"simpleText":"僧伽罗语"}},{"languageCode":"sn","languageName":{"simpleText":"绍纳语"}},{"languageCode":"eo","languageName":{"simpleText":"世界语"}},{"languageCode":"sk","languageName":{"simpleText":"斯洛伐克语"}},{"languageCode":"sl","languageName":{"simpleText":"斯洛文尼亚语"}},{"languageCode":"sw","languageName":{"simpleText":"斯瓦希里语"}},{"languageCode":"gd","languageName":{"simpleText":"苏格兰盖尔语"}},{"languageCode":"ceb","languageName":{"simpleText":"宿务语"}},{"languageCode":"so","languageName":{"simpleText":"索马里语"}},{"languageCode":"tg","languageName":{"simpleText":"塔吉克语"}},{"languageCode":"te","languageName":{"simpleText":"泰卢固语"}},{"languageCode":"ta","languageName":{"simpleText":"泰米尔语"}},{"languageCode":"th","languageName":{"simpleText":"泰语"}},{"languageCode":"ti","languageName":{"simpleText":"提格利尼亚语"}},{"languageCode":"tr","languageName":{"simpleText":"土耳其语"}},{"languageCode":"tk","languageName":{"simpleText":"土库曼语"}},{"languageCode":"cy","languageName":{"simpleText":"威尔士语"}},{"languageCode":"ug","languageName":{"simpleText":"维吾尔语"}},{"languageCode":"und","languageName":{"simpleText":"未知语言"}},{"languageCode":"ur","languageName":{"simpleText":"乌尔都语"}},{"languageCode":"uk","languageName":{"simpleText":"乌克兰语"}},{"languageCode":"uz","languageName":{"simpleText":"乌兹别克语"}},{"languageCode":"es","languageName":{"simpleText":"西班牙语"}},{"languageCode":"fy","languageName":{"simpleText":"西弗里西亚语"}},{"languageCode":"iw","languageName":{"simpleText":"希伯来语"}},{"languageCode":"el","languageName":{"simpleText":"希腊语"}},{"languageCode":"haw","languageName":{"simpleText":"夏威夷语"}},{"languageCode":"sd","languageName":{"simpleText":"信德语"}},{"languageCode":"hu","languageName":{"simpleText":"匈牙利语"}},{"languageCode":"su","languageName":{"simpleText":"巽他语"}},{"languageCode":"hy","languageName":{"simpleText":"亚美尼亚语"}},{"languageCode":"ig","languageName":{"simpleText":"伊博语"}},{"languageCode":"it","languageName":{"simpleText":"意大利语"}},{"languageCode":"yi","languageName":{"simpleText":"意第绪语"}},{"languageCode":"hi","languageName":{"simpleText":"印地语"}},{"languageCode":"id","languageName":{"simpleText":"印度尼西亚语"}},{"languageCode":"en","languageName":{"simpleText":"英语"}},{"languageCode":"yo","languageName":{"simpleText":"约鲁巴语"}},{"languageCode":"vi","languageName":{"simpleText":"越南语"}},{"languageCode":"jv","languageName":{"simpleText":"爪哇语"}},{"languageCode":"zh-Hant","languageName":{"simpleText":"中文（繁体）"}},{"languageCode":"zh-Hans","languageName":{"simpleText":"中文（简体）"}},{"languageCode":"zu","languageName":{"simpleText":"祖鲁语"}},{"languageCode":"kri","languageName":{"simpleText":"Kri"}}],
				"MOBILE":[{"languageCode":"sq","languageName":{"runs":[{"text":"阿尔巴尼亚语"}]}},{"languageCode":"ak","languageName":{"runs":[{"text":"阿肯语"}]}},{"languageCode":"ar","languageName":{"runs":[{"text":"阿拉伯语"}]}},{"languageCode":"am","languageName":{"runs":[{"text":"阿姆哈拉语"}]}},{"languageCode":"as","languageName":{"runs":[{"text":"阿萨姆语"}]}},{"languageCode":"az","languageName":{"runs":[{"text":"阿塞拜疆语"}]}},{"languageCode":"ee","languageName":{"runs":[{"text":"埃维语"}]}},{"languageCode":"ay","languageName":{"runs":[{"text":"艾马拉语"}]}},{"languageCode":"ga","languageName":{"runs":[{"text":"爱尔兰语"}]}},{"languageCode":"et","languageName":{"runs":[{"text":"爱沙尼亚语"}]}},{"languageCode":"or","languageName":{"runs":[{"text":"奥里亚语"}]}},{"languageCode":"om","languageName":{"runs":[{"text":"奥罗莫语"}]}},{"languageCode":"eu","languageName":{"runs":[{"text":"巴斯克语"}]}},{"languageCode":"be","languageName":{"runs":[{"text":"白俄罗斯语"}]}},{"languageCode":"bg","languageName":{"runs":[{"text":"保加利亚语"}]}},{"languageCode":"nso","languageName":{"runs":[{"text":"北索托语"}]}},{"languageCode":"is","languageName":{"runs":[{"text":"冰岛语"}]}},{"languageCode":"pl","languageName":{"runs":[{"text":"波兰语"}]}},{"languageCode":"bs","languageName":{"runs":[{"text":"波斯尼亚语"}]}},{"languageCode":"fa","languageName":{"runs":[{"text":"波斯语"}]}},{"languageCode":"bho","languageName":{"runs":[{"text":"博杰普尔语"}]}},{"languageCode":"ts","languageName":{"runs":[{"text":"聪加语"}]}},{"languageCode":"tt","languageName":{"runs":[{"text":"鞑靼语"}]}},{"languageCode":"da","languageName":{"runs":[{"text":"丹麦语"}]}},{"languageCode":"de","languageName":{"runs":[{"text":"德语"}]}},{"languageCode":"dv","languageName":{"runs":[{"text":"迪维希语"}]}},{"languageCode":"ru","languageName":{"runs":[{"text":"俄语"}]}},{"languageCode":"fr","languageName":{"runs":[{"text":"法语"}]}},{"languageCode":"sa","languageName":{"runs":[{"text":"梵语"}]}},{"languageCode":"fil","languageName":{"runs":[{"text":"菲律宾语"}]}},{"languageCode":"fi","languageName":{"runs":[{"text":"芬兰语"}]}},{"languageCode":"km","languageName":{"runs":[{"text":"高棉语"}]}},{"languageCode":"ka","languageName":{"runs":[{"text":"格鲁吉亚语"}]}},{"languageCode":"gu","languageName":{"runs":[{"text":"古吉拉特语"}]}},{"languageCode":"gn","languageName":{"runs":[{"text":"瓜拉尼语"}]}},{"languageCode":"kk","languageName":{"runs":[{"text":"哈萨克语"}]}},{"languageCode":"ht","languageName":{"runs":[{"text":"海地克里奥尔语"}]}},{"languageCode":"ko","languageName":{"runs":[{"text":"韩语"}]}},{"languageCode":"ha","languageName":{"runs":[{"text":"豪萨语"}]}},{"languageCode":"nl","languageName":{"runs":[{"text":"荷兰语"}]}},{"languageCode":"gl","languageName":{"runs":[{"text":"加利西亚语"}]}},{"languageCode":"ca","languageName":{"runs":[{"text":"加泰罗尼亚语"}]}},{"languageCode":"cs","languageName":{"runs":[{"text":"捷克语"}]}},{"languageCode":"kn","languageName":{"runs":[{"text":"卡纳达语"}]}},{"languageCode":"ky","languageName":{"runs":[{"text":"柯尔克孜语"}]}},{"languageCode":"xh","languageName":{"runs":[{"text":"科萨语"}]}},{"languageCode":"co","languageName":{"runs":[{"text":"科西嘉语"}]}},{"languageCode":"hr","languageName":{"runs":[{"text":"克罗地亚语"}]}},{"languageCode":"qu","languageName":{"runs":[{"text":"克丘亚语"}]}},{"languageCode":"ku","languageName":{"runs":[{"text":"库尔德语"}]}},{"languageCode":"la","languageName":{"runs":[{"text":"拉丁语"}]}},{"languageCode":"lv","languageName":{"runs":[{"text":"拉脱维亚语"}]}},{"languageCode":"lo","languageName":{"runs":[{"text":"老挝语"}]}},{"languageCode":"lt","languageName":{"runs":[{"text":"立陶宛语"}]}},{"languageCode":"ln","languageName":{"runs":[{"text":"林加拉语"}]}},{"languageCode":"lg","languageName":{"runs":[{"text":"卢干达语"}]}},{"languageCode":"lb","languageName":{"runs":[{"text":"卢森堡语"}]}},{"languageCode":"rw","languageName":{"runs":[{"text":"卢旺达语"}]}},{"languageCode":"ro","languageName":{"runs":[{"text":"罗马尼亚语"}]}},{"languageCode":"mt","languageName":{"runs":[{"text":"马耳他语"}]}},{"languageCode":"mr","languageName":{"runs":[{"text":"马拉地语"}]}},{"languageCode":"mg","languageName":{"runs":[{"text":"马拉加斯语"}]}},{"languageCode":"ml","languageName":{"runs":[{"text":"马拉雅拉姆语"}]}},{"languageCode":"ms","languageName":{"runs":[{"text":"马来语"}]}},{"languageCode":"mk","languageName":{"runs":[{"text":"马其顿语"}]}},{"languageCode":"mi","languageName":{"runs":[{"text":"毛利语"}]}},{"languageCode":"mn","languageName":{"runs":[{"text":"蒙古语"}]}},{"languageCode":"bn","languageName":{"runs":[{"text":"孟加拉语"}]}},{"languageCode":"my","languageName":{"runs":[{"text":"缅甸语"}]}},{"languageCode":"hmn","languageName":{"runs":[{"text":"苗语"}]}},{"languageCode":"af","languageName":{"runs":[{"text":"南非荷兰语"}]}},{"languageCode":"st","languageName":{"runs":[{"text":"南索托语"}]}},{"languageCode":"ne","languageName":{"runs":[{"text":"尼泊尔语"}]}},{"languageCode":"no","languageName":{"runs":[{"text":"挪威语"}]}},{"languageCode":"pa","languageName":{"runs":[{"text":"旁遮普语"}]}},{"languageCode":"pt","languageName":{"runs":[{"text":"葡萄牙语"}]}},{"languageCode":"ps","languageName":{"runs":[{"text":"普什图语"}]}},{"languageCode":"ny","languageName":{"runs":[{"text":"齐切瓦语"}]}},{"languageCode":"ja","languageName":{"runs":[{"text":"日语"}]}},{"languageCode":"sv","languageName":{"runs":[{"text":"瑞典语"}]}},{"languageCode":"sm","languageName":{"runs":[{"text":"萨摩亚语"}]}},{"languageCode":"sr","languageName":{"runs":[{"text":"塞尔维亚语"}]}},{"languageCode":"si","languageName":{"runs":[{"text":"僧伽罗语"}]}},{"languageCode":"sn","languageName":{"runs":[{"text":"绍纳语"}]}},{"languageCode":"eo","languageName":{"runs":[{"text":"世界语"}]}},{"languageCode":"sk","languageName":{"runs":[{"text":"斯洛伐克语"}]}},{"languageCode":"sl","languageName":{"runs":[{"text":"斯洛文尼亚语"}]}},{"languageCode":"sw","languageName":{"runs":[{"text":"斯瓦希里语"}]}},{"languageCode":"gd","languageName":{"runs":[{"text":"苏格兰盖尔语"}]}},{"languageCode":"ceb","languageName":{"runs":[{"text":"宿务语"}]}},{"languageCode":"so","languageName":{"runs":[{"text":"索马里语"}]}},{"languageCode":"tg","languageName":{"runs":[{"text":"塔吉克语"}]}},{"languageCode":"te","languageName":{"runs":[{"text":"泰卢固语"}]}},{"languageCode":"ta","languageName":{"runs":[{"text":"泰米尔语"}]}},{"languageCode":"th","languageName":{"runs":[{"text":"泰语"}]}},{"languageCode":"ti","languageName":{"runs":[{"text":"提格利尼亚语"}]}},{"languageCode":"tr","languageName":{"runs":[{"text":"土耳其语"}]}},{"languageCode":"tk","languageName":{"runs":[{"text":"土库曼语"}]}},{"languageCode":"cy","languageName":{"runs":[{"text":"威尔士语"}]}},{"languageCode":"ug","languageName":{"runs":[{"text":"维吾尔语"}]}},{"languageCode":"und","languageName":{"runs":[{"text":"未知语言"}]}},{"languageCode":"ur","languageName":{"runs":[{"text":"乌尔都语"}]}},{"languageCode":"uk","languageName":{"runs":[{"text":"乌克兰语"}]}},{"languageCode":"uz","languageName":{"runs":[{"text":"乌兹别克语"}]}},{"languageCode":"es","languageName":{"runs":[{"text":"西班牙语"}]}},{"languageCode":"fy","languageName":{"runs":[{"text":"西弗里西亚语"}]}},{"languageCode":"iw","languageName":{"runs":[{"text":"希伯来语"}]}},{"languageCode":"el","languageName":{"runs":[{"text":"希腊语"}]}},{"languageCode":"haw","languageName":{"runs":[{"text":"夏威夷语"}]}},{"languageCode":"sd","languageName":{"runs":[{"text":"信德语"}]}},{"languageCode":"hu","languageName":{"runs":[{"text":"匈牙利语"}]}},{"languageCode":"su","languageName":{"runs":[{"text":"巽他语"}]}},{"languageCode":"hy","languageName":{"runs":[{"text":"亚美尼亚语"}]}},{"languageCode":"ig","languageName":{"runs":[{"text":"伊博语"}]}},{"languageCode":"it","languageName":{"runs":[{"text":"意大利语"}]}},{"languageCode":"yi","languageName":{"runs":[{"text":"意第绪语"}]}},{"languageCode":"hi","languageName":{"runs":[{"text":"印地语"}]}},{"languageCode":"id","languageName":{"runs":[{"text":"印度尼西亚语"}]}},{"languageCode":"en","languageName":{"runs":[{"text":"英语"}]}},{"languageCode":"yo","languageName":{"runs":[{"text":"约鲁巴语"}]}},{"languageCode":"vi","languageName":{"runs":[{"text":"越南语"}]}},{"languageCode":"jv","languageName":{"runs":[{"text":"爪哇语"}]}},{"languageCode":"zh-Hant","languageName":{"runs":[{"text":"中文（繁体）"}]}},{"languageCode":"zh-Hans","languageName":{"runs":[{"text":"中文（简体）"}]}},{"languageCode":"zu","languageName":{"runs":[{"text":"祖鲁语"}]}},{"languageCode":"kri","languageName":{"runs":[{"text":"Kri"}]}}]
			}
		}
	},
	"Netflix": {
		"Configs": {
			"Languages":{"AR":"ar","CS":"cs","DA":"da","DE":"de","EN":"en","EN-GB":"en-GB","EN-US":"en-US","EN-US SDH":"en-US SDH","ES":"es","ES-419":"es-419","ES-ES":"es-ES","FI":"fi","FR":"fr","HE":"he","HR":"hr","HU":"hu","ID":"id","IT":"it","JA":"ja","KO":"ko","MS":"ms","NB":"nb","NL":"nl","PL":"pl","PT":"pt","PT-PT":"pt-PT","PT-BR":"pt-BR","RO":"ro","RU":"ru","SV":"sv","TH":"th","TR":"tr","UK":"uk","VI":"vi","IS":"is","ZH":"zh","ZH-HANS":"zh-Hans","ZH-HK":"zh-HK","ZH-HANT":"zh-Hant"}
		}
	},
	"Google": {
		"Configs": {
			"Languages":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh","ZH-HANS":"zh-CN","ZH-HK":"zh-TW","ZH-HANT":"zh-TW"}
		}
	},
	"Microsoft": {
		"Configs": {
			"Languages":{"AUTO":"","AR":"ar","BG":"bg","CS":"cs","DA":"da","DE":"de","EL":"el","EN":"en","EN-GB":"en","EN-US":"en","EN-US SDH":"en","ES":"es","ES-419":"es","ES-ES":"es","ET":"et","FI":"fi","FR":"fr","HU":"hu","IT":"it","JA":"ja","KO":"ko","LT":"lt","LV":"lv","NL":"nl","NO":"no","PL":"pl","PT":"pt","PT-PT":"pt","PT-BR":"pt","RO":"ro","RU":"ru","SK":"sk","SL":"sl","SV":"sv","IS":"is","ZH":"zh-Hans","ZH-HANS":"zh-Hans","ZH-HK":"yue","ZH-HANT":"zh-Hant"}
		}
	},
	"DeepL": {
		"Configs": {
			"Languages":{"AUTO":"","BG":"BG","CS":"CS","DA":"DA","DE":"de","EL":"el","EN":"EN-US","EN-GB":"EN-GB","EN-US":"EN-US","EN-US SDH":"EN-US","ES":"ES","ES-419":"ES","ES-ES":"ES","ET":"ET","FI":"FI","FR":"FR","HU":"HU","IT":"IT","JA":"JA","KO":"ko","LT":"LT","LV":"LV","NL":"NL","PL":"PL","PT":"PT-PT","PT-PT":"PT-PT","PT-BR":"PT-BR","RO":"RO","RU":"RU","SK":"SK","SL":"SL","SV":"SV","ZH":"ZH","ZH-HANS":"ZH","ZH-HK":"ZH","ZH-HANT":"ZH"}
		}
	}
};

if ($request.method !== "POST") $.done();

// headers转小写
for (const [key, value] of Object.entries($request.headers)) {
	delete $request.headers[key]
	$request.headers[key.toLowerCase()] = value
};

// 构造回复数据
let $response = undefined;

/***************** Processing *****************/
(async () => {
	const { Platform, Settings, Caches, Configs } = setENV("DualSubs", $request.url, DataBase);
	switch (Settings.Switch) {
		case "true":
		default:
			$.log(`⚠ ${$.name}, 功能开启`, "");
			let url = URL.parse($request.url);
			$.log(`⚠ ${$.name}, url.path=${url.path}`);
			// 设置格式
			const Format = $request?.headers?.["content-type"]?.split(";")?.[0]
			$.log(`🚧 ${$.name}`, `Format: ${Format}`, "");
			// 创建空数据
			let data = { "captions": { "playerCaptionsTracklistRenderer": { "captionTracks": [], "audioTracks": [], "translationLanguages": [] } } };
			// 解析格式
			switch (Format) {
				case "application/json":
					data = JSON.parse($request.body);
					// 找功能
					if (data?.playbackContext) { // 有播放设置
						$.log(`⚠ ${$.name}, playbackContext`, "");
						if (data?.playbackContext.contentPlaybackContext) { // 有播放设置内容
							data.playbackContext.contentPlaybackContext.autoCaptionsDefaultOn = true; // 默认开启自动字幕
                        };
					};
					$request.body = JSON.stringify(data);
					break;
				case "text/xml":
					break;
                case "application/x-protobuf":
					/******************  initialization start  *******************/
					!function(i){"use strict";function _(n,e,i){return e<=n&&n<=i}"undefined"!=typeof module&&module.exports&&!i["encoding-indexes"]&&(i["encoding-indexes"]=require("./encoding-indexes.js")["encoding-indexes"]);var l=Math.floor;function s(n){if(void 0===n)return{};if(n===Object(n))return n;throw TypeError("Could not convert argument to dictionary")}function u(n){return 0<=n&&n<=127}var a=u,b=-1;function c(n){this.tokens=[].slice.call(n),this.tokens.reverse()}c.prototype={endOfStream:function(){return!this.tokens.length},read:function(){return this.tokens.length?this.tokens.pop():b},prepend:function(n){if(Array.isArray(n))for(var e=n;e.length;)this.tokens.push(e.pop());else this.tokens.push(n)},push:function(n){if(Array.isArray(n))for(var e=n;e.length;)this.tokens.unshift(e.shift());else this.tokens.unshift(n)}};var w=-1;function m(n,e){if(n)throw TypeError("Decoder error");return e||65533}function f(n){throw TypeError("The code point "+n+" could not be encoded.")}function r(n){return n=String(n).trim().toLowerCase(),Object.prototype.hasOwnProperty.call(d,n)?d[n]:null}var t,o,n=[{encodings:[{labels:["unicode-1-1-utf-8","utf-8","utf8"],name:"UTF-8"}],heading:"The Encoding"},{encodings:[{labels:["866","cp866","csibm866","ibm866"],name:"IBM866"},{labels:["csisolatin2","iso-8859-2","iso-ir-101","iso8859-2","iso88592","iso_8859-2","iso_8859-2:1987","l2","latin2"],name:"ISO-8859-2"},{labels:["csisolatin3","iso-8859-3","iso-ir-109","iso8859-3","iso88593","iso_8859-3","iso_8859-3:1988","l3","latin3"],name:"ISO-8859-3"},{labels:["csisolatin4","iso-8859-4","iso-ir-110","iso8859-4","iso88594","iso_8859-4","iso_8859-4:1988","l4","latin4"],name:"ISO-8859-4"},{labels:["csisolatincyrillic","cyrillic","iso-8859-5","iso-ir-144","iso8859-5","iso88595","iso_8859-5","iso_8859-5:1988"],name:"ISO-8859-5"},{labels:["arabic","asmo-708","csiso88596e","csiso88596i","csisolatinarabic","ecma-114","iso-8859-6","iso-8859-6-e","iso-8859-6-i","iso-ir-127","iso8859-6","iso88596","iso_8859-6","iso_8859-6:1987"],name:"ISO-8859-6"},{labels:["csisolatingreek","ecma-118","elot_928","greek","greek8","iso-8859-7","iso-ir-126","iso8859-7","iso88597","iso_8859-7","iso_8859-7:1987","sun_eu_greek"],name:"ISO-8859-7"},{labels:["csiso88598e","csisolatinhebrew","hebrew","iso-8859-8","iso-8859-8-e","iso-ir-138","iso8859-8","iso88598","iso_8859-8","iso_8859-8:1988","visual"],name:"ISO-8859-8"},{labels:["csiso88598i","iso-8859-8-i","logical"],name:"ISO-8859-8-I"},{labels:["csisolatin6","iso-8859-10","iso-ir-157","iso8859-10","iso885910","l6","latin6"],name:"ISO-8859-10"},{labels:["iso-8859-13","iso8859-13","iso885913"],name:"ISO-8859-13"},{labels:["iso-8859-14","iso8859-14","iso885914"],name:"ISO-8859-14"},{labels:["csisolatin9","iso-8859-15","iso8859-15","iso885915","iso_8859-15","l9"],name:"ISO-8859-15"},{labels:["iso-8859-16"],name:"ISO-8859-16"},{labels:["cskoi8r","koi","koi8","koi8-r","koi8_r"],name:"KOI8-R"},{labels:["koi8-ru","koi8-u"],name:"KOI8-U"},{labels:["csmacintosh","mac","macintosh","x-mac-roman"],name:"macintosh"},{labels:["dos-874","iso-8859-11","iso8859-11","iso885911","tis-620","windows-874"],name:"windows-874"},{labels:["cp1250","windows-1250","x-cp1250"],name:"windows-1250"},{labels:["cp1251","windows-1251","x-cp1251"],name:"windows-1251"},{labels:["ansi_x3.4-1968","ascii","cp1252","cp819","csisolatin1","ibm819","iso-8859-1","iso-ir-100","iso8859-1","iso88591","iso_8859-1","iso_8859-1:1987","l1","latin1","us-ascii","windows-1252","x-cp1252"],name:"windows-1252"},{labels:["cp1253","windows-1253","x-cp1253"],name:"windows-1253"},{labels:["cp1254","csisolatin5","iso-8859-9","iso-ir-148","iso8859-9","iso88599","iso_8859-9","iso_8859-9:1989","l5","latin5","windows-1254","x-cp1254"],name:"windows-1254"},{labels:["cp1255","windows-1255","x-cp1255"],name:"windows-1255"},{labels:["cp1256","windows-1256","x-cp1256"],name:"windows-1256"},{labels:["cp1257","windows-1257","x-cp1257"],name:"windows-1257"},{labels:["cp1258","windows-1258","x-cp1258"],name:"windows-1258"},{labels:["x-mac-cyrillic","x-mac-ukrainian"],name:"x-mac-cyrillic"}],heading:"Legacy single-byte encodings"},{encodings:[{labels:["chinese","csgb2312","csiso58gb231280","gb2312","gb_2312","gb_2312-80","gbk","iso-ir-58","x-gbk"],name:"GBK"},{labels:["gb18030"],name:"gb18030"}],heading:"Legacy multi-byte Chinese (simplified) encodings"},{encodings:[{labels:["big5","big5-hkscs","cn-big5","csbig5","x-x-big5"],name:"Big5"}],heading:"Legacy multi-byte Chinese (traditional) encodings"},{encodings:[{labels:["cseucpkdfmtjapanese","euc-jp","x-euc-jp"],name:"EUC-JP"},{labels:["csiso2022jp","iso-2022-jp"],name:"ISO-2022-JP"},{labels:["csshiftjis","ms932","ms_kanji","shift-jis","shift_jis","sjis","windows-31j","x-sjis"],name:"Shift_JIS"}],heading:"Legacy multi-byte Japanese encodings"},{encodings:[{labels:["cseuckr","csksc56011987","euc-kr","iso-ir-149","korean","ks_c_5601-1987","ks_c_5601-1989","ksc5601","ksc_5601","windows-949"],name:"EUC-KR"}],heading:"Legacy multi-byte Korean encodings"},{encodings:[{labels:["csiso2022kr","hz-gb-2312","iso-2022-cn","iso-2022-cn-ext","iso-2022-kr"],name:"replacement"},{labels:["utf-16be"],name:"UTF-16BE"},{labels:["utf-16","utf-16le"],name:"UTF-16LE"},{labels:["x-user-defined"],name:"x-user-defined"}],heading:"Legacy miscellaneous encodings"}],d={},h=(n.forEach(function(n){n.encodings.forEach(function(e){e.labels.forEach(function(n){d[n]=e})})}),{}),g={};function y(n,e){return e&&e[n]||null}function p(n,e){e=e.indexOf(n);return-1===e?null:e}function v(n){if("encoding-indexes"in i)return i["encoding-indexes"][n];throw Error("Indexes missing. Did you forget to include encoding-indexes.js first?")}var x="utf-8";function O(n,e){if(!(this instanceof O))throw TypeError("Called as a function. Did you forget 'new'?");n=void 0!==n?String(n):x,e=s(e),this._encoding=null,this._decoder=null,this._ignoreBOM=!1,this._BOMseen=!1,this._error_mode="replacement",this._do_not_flush=!1;var i=r(n);if(null===i||"replacement"===i.name)throw RangeError("Unknown encoding: "+n);if(g[i.name])return(n=this)._encoding=i,Boolean(e.fatal)&&(n._error_mode="fatal"),Boolean(e.ignoreBOM)&&(n._ignoreBOM=!0),Object.defineProperty||(this.encoding=n._encoding.name.toLowerCase(),this.fatal="fatal"===n._error_mode,this.ignoreBOM=n._ignoreBOM),n;throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?")}function k(n,e){if(!(this instanceof k))throw TypeError("Called as a function. Did you forget 'new'?");e=s(e),this._encoding=null,this._encoder=null,this._do_not_flush=!1,this._fatal=Boolean(e.fatal)?"fatal":"replacement";if(Boolean(e.NONSTANDARD_allowLegacyEncoding)){e=r(n=void 0!==n?String(n):x);if(null===e||"replacement"===e.name)throw RangeError("Unknown encoding: "+n);if(!h[e.name])throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");this._encoding=e}else this._encoding=r("utf-8"),void 0!==n&&"console"in i&&console.warn("TextEncoder constructor called with encoding label, which is ignored.");return Object.defineProperty||(this.encoding=this._encoding.name.toLowerCase()),this}function e(n){var r=n.fatal,t=0,o=0,s=0,l=128,a=191;this.handler=function(n,e){if(e===b&&0!==s)return s=0,m(r);if(e===b)return w;if(0===s){if(_(e,0,127))return e;if(_(e,194,223))s=1,t=31&e;else if(_(e,224,239))224===e&&(l=160),237===e&&(a=159),s=2,t=15&e;else{if(!_(e,240,244))return m(r);240===e&&(l=144),244===e&&(a=143),s=3,t=7&e}return null}var i;return _(e,l,a)?(l=128,a=191,t=t<<6|63&e,(o+=1)!==s?null:(i=t,t=s=o=0,i)):(t=s=o=0,l=128,a=191,n.prepend(e),m(r))}}function E(n){n.fatal;this.handler=function(n,e){if(e===b)return w;if(a(e))return e;_(e,128,2047)?(i=1,r=192):_(e,2048,65535)?(i=2,r=224):_(e,65536,1114111)&&(i=3,r=240);for(var i,r,t=[(e>>6*i)+r];0<i;)t.push(128|63&e>>6*(i-1)),--i;return t}}function j(i,n){var r=n.fatal;this.handler=function(n,e){return e===b?w:u(e)?e:null===(e=i[e-128])?m(r):e}}function B(r,n){n.fatal;this.handler=function(n,e){var i;return e===b?w:a(e)?e:(null===(i=p(e,r))&&f(e),i+128)}}function S(n){var o=n.fatal,s=0,l=0,a=0;this.handler=function(n,e){var i,r,t;return e===b&&0===s&&0===l&&0===a?w:(e!==b||0===s&&0===l&&0===a||(a=l=s=0,m(o)),0!==a?(i=null,_(e,48,57)&&(i=function(n){if(39419<n&&n<189e3||1237575<n)return null;if(7457===n)return 59335;for(var e=0,i=0,r=v("gb18030-ranges"),t=0;t<r.length;++t){var o=r[t];if(!(o[0]<=n))break;e=o[0],i=o[1]}return i+n-e}(10*(126*(10*(s-129)+l-48)+a-129)+e-48)),r=[l,a,e],a=l=s=0,null===i?(n.prepend(r),m(o)):i):0!==l?_(e,129,254)?(a=e,null):(n.prepend([l,e]),l=s=0,m(o)):0!==s?_(e,48,57)?(l=e,null):(r=s,s=0,(t=null)===(i=null===(t=_(e,64,126)||_(e,128,254)?190*(r-129)+(e-(e<127?64:65)):t)?null:y(t,v("gb18030")))&&u(e)&&n.prepend(e),null===i?m(o):i):u(e)?e:128===e?8364:_(e,129,254)?(s=e,null):m(o))}}function T(n,t){n.fatal;this.handler=function(n,e){var i,r;return e===b?w:a(e)?e:58853===e?f(e):t&&8364===e?128:null!==(i=p(e,v("gb18030")))?(r=i%190,[l(i/190)+129,r+(r<63?64:65)]):t?f(e):(i=function(n){if(59335===n)return 7457;for(var e=0,i=0,r=v("gb18030-ranges"),t=0;t<r.length;++t){var o=r[t];if(!(o[1]<=n))break;e=o[1],i=o[0]}return i+n-e}(e),[(r=l(i/10/126/10))+129,(e=l((i-=10*r*126*10)/10/126))+48,(r=l((i-=10*e*126)/10))+129,48+(i-10*r)])}}function I(n){var t=n.fatal,o=0;this.handler=function(n,e){if(e===b&&0!==o)return o=0,m(t);if(e===b&&0===o)return w;if(0===o)return u(e)?e:_(e,129,254)?(o=e,null):m(t);var i=o,r=null;switch(o=0,r=_(e,64,126)||_(e,161,254)?157*(i-129)+(e-(e<127?64:98)):r){case 1133:return[202,772];case 1135:return[202,780];case 1164:return[234,772];case 1166:return[234,780]}i=null===r?null:y(r,v("big5"));return null===i&&u(e)&&n.prepend(e),null===i?m(t):i}}function U(n){n.fatal;this.handler=function(n,e){var i,r;return e===b?w:a(e)?e:(i=e,r=o=o||v("big5").map(function(n,e){return e<5024?null:n}),null===(i=9552===i||9566===i||9569===i||9578===i||21313===i||21317===i?r.lastIndexOf(i):p(i,r))||(r=l(i/157)+129)<161?f(e):[r,(e=i%157)+(e<63?64:98)])}}function C(n){var t=n.fatal,o=!1,s=0;this.handler=function(n,e){var i,r;return e===b&&0!==s?(s=0,m(t)):e===b&&0===s?w:142===s&&_(e,161,223)?(s=0,65216+e):143===s&&_(e,161,254)?(o=!0,s=e,null):0!==s?(i=s,s=0,r=null,_(i,161,254)&&_(e,161,254)&&(r=y(94*(i-161)+(e-161),v(o?"jis0212":"jis0208"))),o=!1,_(e,161,254)||n.prepend(e),null===r?m(t):r):u(e)?e:142===e||143===e||_(e,161,254)?(s=e,null):m(t)}}function P(n){n.fatal;this.handler=function(n,e){var i;return e===b?w:a(e)?e:165===e?92:8254===e?126:_(e,65377,65439)?[142,e-65377+161]:null===(i=p(e=8722===e?65293:e,v("jis0208")))?f(e):[l(i/94)+161,i%94+161]}}function D(n){var t=n.fatal,o=0,s=1,l=2,a=3,u=4,c=5,f=6,d=o,h=o,g=0,p=!1;this.handler=function(n,e){switch(d){default:case o:return 27===e?(d=c,null):_(e,0,127)&&14!==e&&15!==e&&27!==e?(p=!1,e):e===b?w:(p=!1,m(t));case s:return 27===e?(d=c,null):92===e?(p=!1,165):126===e?(p=!1,8254):_(e,0,127)&&14!==e&&15!==e&&27!==e&&92!==e&&126!==e?(p=!1,e):e===b?w:(p=!1,m(t));case l:return 27===e?(d=c,null):_(e,33,95)?(p=!1,65344+e):e===b?w:(p=!1,m(t));case a:return 27===e?(d=c,null):_(e,33,126)?(p=!1,g=e,d=u,null):e===b?w:(p=!1,m(t));case u:if(27===e)d=c;else{if(_(e,33,126))return d=a,null===(i=y(94*(g-33)+e-33,v("jis0208")))?m(t):i;e===b?(d=a,n.prepend(e)):d=a}return m(t);case c:return 36===e||40===e?(g=e,d=f,null):(n.prepend(e),p=!1,d=h,m(t));case f:var i=g,r=(g=0,null);return(40===i&&66===e&&(r=o),40===i&&74===e&&(r=s),40===i&&73===e&&(r=l),null!==(r=36!==i||64!==e&&66!==e?r:a))?(d=r,r=p,p=!0,r?m(t):null):(n.prepend([i,e]),p=!1,d=h,m(t))}}}function F(n){n.fatal;var r=0,t=1,o=2,s=r;this.handler=function(n,e){if(e===b&&s!==r)return n.prepend(e),s=r,[27,40,66];if(e===b&&s===r)return w;if(!(s!==r&&s!==t||14!==e&&15!==e&&27!==e))return f(65533);if(s===r&&a(e))return e;if(s===t&&(a(e)&&92!==e&&126!==e||165==e||8254==e)){if(a(e))return e;if(165===e)return 92;if(8254===e)return 126}var i;return a(e)&&s!==r?(n.prepend(e),s=r,[27,40,66]):165!==e&&8254!==e||s===t?null===(i=p(e=8722===e?65293:e,v("jis0208")))?f(e):s!==o?(n.prepend(e),s=o,[27,36,66]):[l(i/94)+33,i%94+33]:(n.prepend(e),s=t,[27,40,74])}}function J(n){var t=n.fatal,o=0;this.handler=function(n,e){var i,r;return e===b&&0!==o?(o=0,m(t)):e===b&&0===o?w:0!==o?(r=o,i=null,o=0,(_(e,64,126)||_(e,128,252))&&(i=188*(r-(r<160?129:193))+e-(e<127?64:65)),_(i,8836,10715)?48508+i:(null===(r=null===i?null:y(i,v("jis0208")))&&u(e)&&n.prepend(e),null===r?m(t):r)):u(e)||128===e?e:_(e,161,223)?65216+e:_(e,129,159)||_(e,224,252)?(o=e,null):m(t)}}function K(n){n.fatal;this.handler=function(n,e){var i;return e===b?w:a(e)||128===e?e:165===e?92:8254===e?126:_(e,65377,65439)?e-65377+161:(i=e=8722===e?65293:e,null===(i=(t=t||v("jis0208").map(function(n,e){return _(e,8272,8835)?null:n})).indexOf(i))?f(e):[(e=l(i/188))+(e<31?129:193),(e=i%188)+(e<63?64:65)])}}function R(n){var t=n.fatal,o=0;this.handler=function(n,e){var i,r;return e===b&&0!==o?(o=0,m(t)):e===b&&0===o?w:0!==o?(r=o,o=0,r=(i=null)===(i=_(e,65,254)?190*(r-129)+(e-65):i)?null:y(i,v("euc-kr")),null===i&&u(e)&&n.prepend(e),null===r?m(t):r):u(e)?e:_(e,129,254)?(o=e,null):m(t)}}function G(n){n.fatal;this.handler=function(n,e){var i;return e===b?w:a(e)?e:null===(i=p(e,v("euc-kr")))?f(e):[l(i/190)+129,i%190+65]}}function A(n,e){var i=n>>8,n=255&n;return e?[i,n]:[n,i]}function L(r,n){var t=n.fatal,o=null,s=null;this.handler=function(n,e){var i;return e!==b||null===o&&null===s?e===b&&null===o&&null===s?w:null===o?(o=e,null):(e=r?(o<<8)+e:(e<<8)+o,(o=null)!==s?(i=s,s=null,_(e,56320,57343)?65536+1024*(i-55296)+(e-56320):(n.prepend(A(e,r)),m(t))):_(e,55296,56319)?(s=e,null):_(e,56320,57343)?m(t):e):m(t)}}function M(r,n){n.fatal;this.handler=function(n,e){var i;return e===b?w:_(e,0,65535)?A(e,r):(i=A(55296+(e-65536>>10),r),e=A(56320+(e-65536&1023),r),i.concat(e))}}function N(n){n.fatal;this.handler=function(n,e){return e===b?w:u(e)?e:63360+e-128}}function q(n){n.fatal;this.handler=function(n,e){return e===b?w:a(e)?e:_(e,63360,63487)?e-63360+128:f(e)}}Object.defineProperty&&(Object.defineProperty(O.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}}),Object.defineProperty(O.prototype,"fatal",{get:function(){return"fatal"===this._error_mode}}),Object.defineProperty(O.prototype,"ignoreBOM",{get:function(){return this._ignoreBOM}})),O.prototype.decode=function(n,e){n="object"==typeof n&&n instanceof ArrayBuffer?new Uint8Array(n):"object"==typeof n&&"buffer"in n&&n.buffer instanceof ArrayBuffer?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(0);e=s(e),this._do_not_flush||(this._decoder=g[this._encoding.name]({fatal:"fatal"===this._error_mode}),this._BOMseen=!1),this._do_not_flush=Boolean(e.stream);for(var i,r=new c(n),t=[];;){var o=r.read();if(o===b)break;if((i=this._decoder.handler(r,o))===w)break;null!==i&&(Array.isArray(i)?t.push.apply(t,i):t.push(i))}if(!this._do_not_flush){for(;(i=this._decoder.handler(r,r.read()))!==w&&(null!==i&&(Array.isArray(i)?t.push.apply(t,i):t.push(i)),!r.endOfStream()););this._decoder=null}return function(n){e=["UTF-8","UTF-16LE","UTF-16BE"],i=this._encoding.name,-1===e.indexOf(i)||this._ignoreBOM||this._BOMseen||(0<n.length&&65279===n[0]?(this._BOMseen=!0,n.shift()):0<n.length&&(this._BOMseen=!0));for(var e,i,r=n,t="",o=0;o<r.length;++o){var s=r[o];s<=65535?t+=String.fromCharCode(s):(s-=65536,t+=String.fromCharCode(55296+(s>>10),56320+(1023&s)))}return t}.call(this,t)},Object.defineProperty&&Object.defineProperty(k.prototype,"encoding",{get:function(){return this._encoding.name.toLowerCase()}}),k.prototype.encode=function(n,e){n=void 0===n?"":String(n),e=s(e),this._do_not_flush||(this._encoder=h[this._encoding.name]({fatal:"fatal"===this._fatal})),this._do_not_flush=Boolean(e.stream);for(var i,r=new c(function(n){for(var e=String(n),i=e.length,r=0,t=[];r<i;){var o,s=e.charCodeAt(r);s<55296||57343<s?t.push(s):56320<=s&&s<=57343?t.push(65533):55296<=s&&s<=56319&&(r!==i-1&&56320<=(o=e.charCodeAt(r+1))&&o<=57343?(t.push(65536+((1023&s)<<10)+(1023&o)),r+=1):t.push(65533)),r+=1}return t}(n)),t=[];;){var o=r.read();if(o===b)break;if((i=this._encoder.handler(r,o))===w)break;Array.isArray(i)?t.push.apply(t,i):t.push(i)}if(!this._do_not_flush){for(;;){if((i=this._encoder.handler(r,r.read()))===w)break;Array.isArray(i)?t.push.apply(t,i):t.push(i)}this._encoder=null}return new Uint8Array(t)},h["UTF-8"]=function(n){return new E(n)},g["UTF-8"]=function(n){return new e(n)},"encoding-indexes"in i&&n.forEach(function(n){"Legacy single-byte encodings"===n.heading&&n.encodings.forEach(function(n){var n=n.name,e=v(n.toLowerCase());g[n]=function(n){return new j(e,n)},h[n]=function(n){return new B(e,n)}})}),g.GBK=function(n){return new S(n)},h.GBK=function(n){return new T(n,!0)},h.gb18030=function(n){return new T(n)},g.gb18030=function(n){return new S(n)},h.Big5=function(n){return new U(n)},g.Big5=function(n){return new I(n)},h["EUC-JP"]=function(n){return new P(n)},g["EUC-JP"]=function(n){return new C(n)},h["ISO-2022-JP"]=function(n){return new F(n)},g["ISO-2022-JP"]=function(n){return new D(n)},h.Shift_JIS=function(n){return new K(n)},g.Shift_JIS=function(n){return new J(n)},h["EUC-KR"]=function(n){return new G(n)},g["EUC-KR"]=function(n){return new R(n)},h["UTF-16BE"]=function(n){return new M(!0,n)},g["UTF-16BE"]=function(n){return new L(!0,n)},h["UTF-16LE"]=function(n){return new M(!1,n)},g["UTF-16LE"]=function(n){return new L(!1,n)},h["x-user-defined"]=function(n){return new q(n)},g["x-user-defined"]=function(n){return new N(n)},i.TextEncoder||(i.TextEncoder=k),i.TextDecoder||(i.TextDecoder=O),"undefined"!=typeof module&&module.exports&&(module.exports={TextEncoder:i.TextEncoder,TextDecoder:i.TextDecoder,EncodingIndexes:i["encoding-indexes"]})}(this||{});
					var UnknownFieldHandler,WireType,ScalarType,LongType,RepeatType,__defProp=Object.defineProperty,__defProps=Object.defineProperties,__getOwnPropDescs=Object.getOwnPropertyDescriptors,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,r,t)=>r in e?__defProp(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,__spreadValues=(e,r)=>{for(var t in r=r||{})__hasOwnProp.call(r,t)&&__defNormalProp(e,t,r[t]);if(__getOwnPropSymbols)for(var t of __getOwnPropSymbols(r))__propIsEnum.call(r,t)&&__defNormalProp(e,t,r[t]);return e},__spreadProps=(e,r)=>__defProps(e,__getOwnPropDescs(r));function varint64read(){let r=0,t=0;for(let e=0;e<28;e+=7){var a=this.buf[this.pos++];if(r|=(127&a)<<e,0==(128&a))return this.assertBounds(),[r,t]}var e=this.buf[this.pos++];if(r|=(15&e)<<28,t=(112&e)>>4,0==(128&e))return this.assertBounds(),[r,t];for(let e=3;e<=31;e+=7){var n=this.buf[this.pos++];if(t|=(127&n)<<e,0==(128&n))return this.assertBounds(),[r,t]}throw new Error("invalid varint")}function varint64write(r,t,a){for(let e=0;e<28;e+=7){var n=r>>>e,s=!(n>>>7==0&&0==t);if(a.push(255&(s?128|n:n)),!s)return}var e=r>>>28&15|(7&t)<<4,i=!(t>>3==0);if(a.push(255&(i?128|e:e)),i){for(let e=3;e<31;e+=7){var o=t>>>e,l=!(o>>>7==0);if(a.push(255&(l?128|o:o)),!l)return}a.push(t>>>31&1)}}const TWO_PWR_32_DBL$1=4294967296;function int64fromString(t){var e="-"==t[0];e&&(t=t.slice(1));let a=0,n=0;function r(e,r){e=Number(t.slice(e,r));n*=1e6,(a=1e6*a+e)>=TWO_PWR_32_DBL$1&&(n+=a/TWO_PWR_32_DBL$1|0,a%=TWO_PWR_32_DBL$1)}return r(-24,-18),r(-18,-12),r(-12,-6),r(-6),[e,a,n]}function int64toString(e,r){if(r<=2097151)return""+(TWO_PWR_32_DBL$1*r+e);var t=(e>>>24|r<<8)>>>0&16777215,r=r>>16&65535;let a=(16777215&e)+6777216*t+6710656*r,n=t+8147497*r,s=2*r;e=1e7;function i(e,r){e=e?String(e):"";return r?"0000000".slice(e.length)+e:e}return a>=e&&(n+=Math.floor(a/e),a%=e),n>=e&&(s+=Math.floor(n/e),n%=e),i(s,0)+i(n,s)+i(a,1)}function varint32write(r,t){if(0<=r){for(;127<r;)t.push(127&r|128),r>>>=7;t.push(r)}else{for(let e=0;e<9;e++)t.push(127&r|128),r>>=7;t.push(1)}}function varint32read(){let r=this.buf[this.pos++];var e=127&r;if(0==(128&r))return this.assertBounds(),e;if(e|=(127&(r=this.buf[this.pos++]))<<7,0==(128&r))return this.assertBounds(),e;if(e|=(127&(r=this.buf[this.pos++]))<<14,0==(128&r))return this.assertBounds(),e;if(e|=(127&(r=this.buf[this.pos++]))<<21,0==(128&r))return this.assertBounds(),e;e|=(15&(r=this.buf[this.pos++]))<<28;for(let e=5;0!=(128&r)&&e<10;e++)r=this.buf[this.pos++];if(0!=(128&r))throw new Error("invalid varint");return this.assertBounds(),e>>>0}function detectBi(){var e=new DataView(new ArrayBuffer(8));return void 0!==globalThis.BigInt&&"function"==typeof e.getBigInt64&&"function"==typeof e.getBigUint64&&"function"==typeof e.setBigInt64&&"function"==typeof e.setBigUint64?{MIN:BigInt("-9223372036854775808"),MAX:BigInt("9223372036854775807"),UMIN:BigInt("0"),UMAX:BigInt("18446744073709551615"),C:BigInt,V:e}:void 0}const BI=detectBi();function assertBi(e){if(!e)throw new Error("BigInt unavailable, see https://github.com/timostamm/protobuf-ts/blob/v1.0.8/MANUAL.md#bigint-support")}const RE_DECIMAL_STR=/^-?[0-9]+$/,TWO_PWR_32_DBL=4294967296;class SharedPbLong{constructor(e,r){this.lo=0|e,this.hi=0|r}isZero(){return 0==this.lo&&0==this.hi}toNumber(){var e=this.hi*TWO_PWR_32_DBL+(this.lo>>>0);if(Number.isSafeInteger(e))return e;throw new Error("cannot convert to safe number")}}const _PbULong=class extends SharedPbLong{static from(e){if(BI)switch(typeof e){case"string":if("0"==e)return this.ZERO;if(""==e)throw new Error("string is no integer");e=BI.C(e);case"number":if(0===e)return this.ZERO;e=BI.C(e);case"bigint":if(!e)return this.ZERO;if(e<BI.UMIN)throw new Error("signed value for ulong");if(e>BI.UMAX)throw new Error("ulong too large");return BI.V.setBigUint64(0,e,!0),new _PbULong(BI.V.getInt32(0,!0),BI.V.getInt32(4,!0))}else switch(typeof e){case"string":if("0"==e)return this.ZERO;if(e=e.trim(),!RE_DECIMAL_STR.test(e))throw new Error("string is no integer");var[r,t,a]=int64fromString(e);if(r)throw new Error("signed value");return new _PbULong(t,a);case"number":if(0==e)return this.ZERO;if(!Number.isSafeInteger(e))throw new Error("number is no integer");if(e<0)throw new Error("signed value for ulong");return new _PbULong(e,e/TWO_PWR_32_DBL)}throw new Error("unknown value "+typeof e)}toString(){return BI?this.toBigInt().toString():int64toString(this.lo,this.hi)}toBigInt(){return assertBi(BI),BI.V.setInt32(0,this.lo,!0),BI.V.setInt32(4,this.hi,!0),BI.V.getBigUint64(0,!0)}};let PbULong=_PbULong;PbULong.ZERO=new _PbULong(0,0);const _PbLong=class extends SharedPbLong{static from(e){if(BI)switch(typeof e){case"string":if("0"==e)return this.ZERO;if(""==e)throw new Error("string is no integer");e=BI.C(e);case"number":if(0===e)return this.ZERO;e=BI.C(e);case"bigint":if(!e)return this.ZERO;if(e<BI.MIN)throw new Error("ulong too small");if(e>BI.MAX)throw new Error("ulong too large");return BI.V.setBigInt64(0,e,!0),new _PbLong(BI.V.getInt32(0,!0),BI.V.getInt32(4,!0))}else switch(typeof e){case"string":if("0"==e)return this.ZERO;var r,t,a;if(e=e.trim(),RE_DECIMAL_STR.test(e))return[r,a,t]=int64fromString(e),a=new _PbLong(a,t),r?a.negate():a;throw new Error("string is no integer");case"number":if(0==e)return this.ZERO;if(Number.isSafeInteger(e))return 0<e?new _PbLong(e,e/TWO_PWR_32_DBL):new _PbLong(-e,-e/TWO_PWR_32_DBL).negate();throw new Error("number is no integer")}throw new Error("unknown value "+typeof e)}isNegative(){return 0!=(2147483648&this.hi)}negate(){let e=~this.hi,r=this.lo;return r?r=1+~r:e+=1,new _PbLong(r,e)}toString(){var e;return BI?this.toBigInt().toString():this.isNegative()?"-"+int64toString((e=this.negate()).lo,e.hi):int64toString(this.lo,this.hi)}toBigInt(){return assertBi(BI),BI.V.setInt32(0,this.lo,!0),BI.V.setInt32(4,this.hi,!0),BI.V.getBigInt64(0,!0)}};let PbLong=_PbLong;PbLong.ZERO=new _PbLong(0,0);class BinaryReader{constructor(e,r){this.varint64=varint64read,this.uint32=varint32read,this.buf=e,this.len=e.length,this.pos=0,this.view=new DataView(e.buffer,e.byteOffset,e.byteLength),this.textDecoder=null!=r?r:new TextDecoder("utf-8",{fatal:!0})}tag(){var e=this.uint32(),r=e>>>3,e=7&e;if(r<=0||e<0||5<e)throw new Error("illegal tag: field no "+r+" wire type "+e);return[r,e]}skip(e){var r,t=this.pos;switch(e){case WireType.Varint:for(;128&this.buf[this.pos++];);break;case WireType.Bit64:this.pos+=4;case WireType.Bit32:this.pos+=4;break;case WireType.LengthDelimited:var a=this.uint32();this.pos+=a;break;case WireType.StartGroup:for(;(r=this.tag()[1])!==WireType.EndGroup;)this.skip(r);break;default:throw new Error("cant skip wire type "+e)}return this.assertBounds(),this.buf.subarray(t,this.pos)}assertBounds(){if(this.pos>this.len)throw new RangeError("premature EOF")}int32(){return 0|this.uint32()}sint32(){var e=this.uint32();return e>>>1^-(1&e)}int64(){return new PbLong(...this.varint64())}uint64(){return new PbULong(...this.varint64())}sint64(){var[e,r]=this.varint64(),t=-(1&e),e=(e>>>1|(1&r)<<31)^t,r=r>>>1^t;return new PbLong(e,r)}bool(){var[e,r]=this.varint64();return 0!==e||0!==r}fixed32(){return this.view.getUint32((this.pos+=4)-4,!0)}sfixed32(){return this.view.getInt32((this.pos+=4)-4,!0)}fixed64(){return new PbULong(this.sfixed32(),this.sfixed32())}sfixed64(){return new PbLong(this.sfixed32(),this.sfixed32())}float(){return this.view.getFloat32((this.pos+=4)-4,!0)}double(){return this.view.getFloat64((this.pos+=8)-8,!0)}bytes(){var e=this.uint32(),r=this.pos;return this.pos+=e,this.assertBounds(),this.buf.subarray(r,r+e)}string(){return this.textDecoder.decode(this.bytes())}}function assert(e,r){if(!e)throw new Error(r)}const FLOAT32_MAX=34028234663852886e22,FLOAT32_MIN=-34028234663852886e22,UINT32_MAX=4294967295,INT32_MAX=2147483647,INT32_MIN=-2147483648;function assertInt32(e){if("number"!=typeof e)throw new Error("invalid int 32: "+typeof e);if(!Number.isInteger(e)||e>INT32_MAX||e<INT32_MIN)throw new Error("invalid int 32: "+e)}function assertUInt32(e){if("number"!=typeof e)throw new Error("invalid uint 32: "+typeof e);if(!Number.isInteger(e)||e>UINT32_MAX||e<0)throw new Error("invalid uint 32: "+e)}function assertFloat32(e){if("number"!=typeof e)throw new Error("invalid float 32: "+typeof e);if(Number.isFinite(e)&&(e>FLOAT32_MAX||e<FLOAT32_MIN))throw new Error("invalid float 32: "+e)}class BinaryWriter{constructor(e){this.stack=[],this.textEncoder=null!=e?e:new TextEncoder,this.chunks=[],this.buf=[]}finish(){this.chunks.push(new Uint8Array(this.buf));let r=0;for(let e=0;e<this.chunks.length;e++)r+=this.chunks[e].length;var t=new Uint8Array(r);let a=0;for(let e=0;e<this.chunks.length;e++)t.set(this.chunks[e],a),a+=this.chunks[e].length;return this.chunks=[],t}fork(){return this.stack.push({chunks:this.chunks,buf:this.buf}),this.chunks=[],this.buf=[],this}join(){var e=this.finish(),r=this.stack.pop();if(r)return this.chunks=r.chunks,this.buf=r.buf,this.uint32(e.byteLength),this.raw(e);throw new Error("invalid state, fork stack empty")}tag(e,r){return this.uint32((e<<3|r)>>>0)}raw(e){return this.buf.length&&(this.chunks.push(new Uint8Array(this.buf)),this.buf=[]),this.chunks.push(e),this}uint32(e){for(assertUInt32(e);127<e;)this.buf.push(127&e|128),e>>>=7;return this.buf.push(e),this}int32(e){return assertInt32(e),varint32write(e,this.buf),this}bool(e){return this.buf.push(e?1:0),this}bytes(e){return this.uint32(e.byteLength),this.raw(e)}string(e){e=this.textEncoder.encode(e);return this.uint32(e.byteLength),this.raw(e)}float(e){assertFloat32(e);var r=new Uint8Array(4);return new DataView(r.buffer).setFloat32(0,e,!0),this.raw(r)}double(e){var r=new Uint8Array(8);return new DataView(r.buffer).setFloat64(0,e,!0),this.raw(r)}fixed32(e){assertUInt32(e);var r=new Uint8Array(4);return new DataView(r.buffer).setUint32(0,e,!0),this.raw(r)}sfixed32(e){assertInt32(e);var r=new Uint8Array(4);return new DataView(r.buffer).setInt32(0,e,!0),this.raw(r)}sint32(e){return assertInt32(e),varint32write(e=(e<<1^e>>31)>>>0,this.buf),this}sfixed64(e){var r=new Uint8Array(8),t=new DataView(r.buffer),e=PbLong.from(e);return t.setInt32(0,e.lo,!0),t.setInt32(4,e.hi,!0),this.raw(r)}fixed64(e){var r=new Uint8Array(8),t=new DataView(r.buffer),e=PbULong.from(e);return t.setInt32(0,e.lo,!0),t.setInt32(4,e.hi,!0),this.raw(r)}int64(e){e=PbLong.from(e);return varint64write(e.lo,e.hi,this.buf),this}sint64(e){var e=PbLong.from(e),r=e.hi>>31;return varint64write(e.lo<<1^r,(e.hi<<1|e.lo>>>31)^r,this.buf),this}uint64(e){e=PbULong.from(e);return varint64write(e.lo,e.hi,this.buf),this}}function binaryWriteOptions(e){return e?__spreadValues(__spreadValues({},defaultsWrite$1),e):defaultsWrite$1}function binaryReadOptions(e){return e?__spreadValues(__spreadValues({},defaultsRead$1),e):defaultsRead$1}!function(i){i.symbol=Symbol.for("protobuf-ts/unknown"),i.onRead=(e,r,t,a,n)=>{(s(r)?r[i.symbol]:r[i.symbol]=[]).push({no:t,wireType:a,data:n})},i.onWrite=(e,r,t)=>{for(var{no:a,wireType:n,data:s}of i.list(r))t.tag(a,n).raw(s)},i.list=(e,r)=>{return s(e)?(e=e[i.symbol],r?e.filter(e=>e.no==r):e):[]},i.last=(e,r)=>i.list(e,r).slice(-1)[0];const s=e=>e&&Array.isArray(e[i.symbol])}(UnknownFieldHandler=UnknownFieldHandler||{});const defaultsRead$1={readUnknownField:!0,readerFactory:e=>new BinaryReader(e)},defaultsWrite$1={writeUnknownFields:!0,writerFactory:()=>new BinaryWriter},MESSAGE_TYPE=(!function(e){e[e.Varint=0]="Varint",e[e.Bit64=1]="Bit64",e[e.LengthDelimited=2]="LengthDelimited",e[e.StartGroup=3]="StartGroup",e[e.EndGroup=4]="EndGroup",e[e.Bit32=5]="Bit32"}(WireType=WireType||{}),Symbol.for("protobuf-ts/message-type"));function lowerCamelCase(r){let t=!1;var a=[];for(let e=0;e<r.length;e++){var n=r.charAt(e);"_"==n?t=!0:/\d/.test(n)?(a.push(n),t=!0):t?(a.push(n.toUpperCase()),t=!1):0==e?a.push(n.toLowerCase()):a.push(n)}return a.join("")}function normalizeFieldInfo(e){var r;return e.localName=null!=(r=e.localName)?r:lowerCamelCase(e.name),e.jsonName=null!=(r=e.jsonName)?r:lowerCamelCase(e.name),e.repeat=null!=(r=e.repeat)?r:0,e.opt=null!=(r=e.opt)?r:!e.repeat&&(!e.oneof&&"message"==e.kind),e}function isOneofGroup(e){if("object"!=typeof e||null===e||!e.hasOwnProperty("oneofKind"))return!1;switch(typeof e.oneofKind){case"string":return void 0===e[e.oneofKind]?!1:2==Object.keys(e).length;case"undefined":return 1==Object.keys(e).length;default:return!1}}!function(e){e[e.DOUBLE=1]="DOUBLE",e[e.FLOAT=2]="FLOAT",e[e.INT64=3]="INT64",e[e.UINT64=4]="UINT64",e[e.INT32=5]="INT32",e[e.FIXED64=6]="FIXED64",e[e.FIXED32=7]="FIXED32",e[e.BOOL=8]="BOOL",e[e.STRING=9]="STRING",e[e.BYTES=12]="BYTES",e[e.UINT32=13]="UINT32",e[e.SFIXED32=15]="SFIXED32",e[e.SFIXED64=16]="SFIXED64",e[e.SINT32=17]="SINT32",e[e.SINT64=18]="SINT64"}(ScalarType=ScalarType||{}),function(e){e[e.BIGINT=0]="BIGINT",e[e.STRING=1]="STRING",e[e.NUMBER=2]="NUMBER"}(LongType=LongType||{}),function(e){e[e.NO=0]="NO",e[e.PACKED=1]="PACKED",e[e.UNPACKED=2]="UNPACKED"}(RepeatType=RepeatType||{});class ReflectionTypeCheck{constructor(e){this.fields=null!=(e=e.fields)?e:[]}prepare(){if(!this.data){var e,r=[],t=[],a=[];for(e of this.fields)if(e.oneof)a.includes(e.oneof)||(a.push(e.oneof),r.push(e.oneof),t.push(e.oneof));else switch(t.push(e.localName),e.kind){case"scalar":case"enum":e.opt&&!e.repeat||r.push(e.localName);break;case"message":e.repeat&&r.push(e.localName);break;case"map":r.push(e.localName)}this.data={req:r,known:t,oneofs:Object.values(a)}}}is(e,a,n=!1){if(!(a<0)){if(null==e||"object"!=typeof e)return!1;this.prepare();let r=Object.keys(e),t=this.data;if(r.length<t.req.length||t.req.some(e=>!r.includes(e)))return!1;if(!n&&r.some(e=>!t.known.includes(e)))return!1;if(!(a<1)){for(const i of t.oneofs){const o=e[i];if(!isOneofGroup(o))return!1;if(void 0!==o.oneofKind){var s=this.fields.find(e=>e.localName===o.oneofKind);if(!s)return!1;if(!this.field(o[o.oneofKind],s,n,a))return!1}}for(const l of this.fields)if(void 0===l.oneof&&!this.field(e[l.localName],l,n,a))return!1}}return!0}field(e,r,t,a){var n=r.repeat;switch(r.kind){case"scalar":return void 0===e?r.opt:n?this.scalars(e,r.T,a,r.L):this.scalar(e,r.T,r.L);case"enum":return void 0===e?r.opt:n?this.scalars(e,ScalarType.INT32,a):this.scalar(e,ScalarType.INT32);case"message":return void 0===e?!0:n?this.messages(e,r.T(),t,a):this.message(e,r.T(),t,a);case"map":if("object"!=typeof e||null===e)return!1;if(a<2)return!0;if(!this.mapKeys(e,r.K,a))return!1;switch(r.V.kind){case"scalar":return this.scalars(Object.values(e),r.V.T,a,r.V.L);case"enum":return this.scalars(Object.values(e),ScalarType.INT32,a);case"message":return this.messages(Object.values(e),r.V.T(),t,a)}}return!0}message(e,r,t,a){return t?r.isAssignable(e,a):r.is(e,a)}messages(r,t,e,a){if(!Array.isArray(r))return!1;if(!(a<2))if(e){for(let e=0;e<r.length&&e<a;e++)if(!t.isAssignable(r[e],a-1))return!1}else for(let e=0;e<r.length&&e<a;e++)if(!t.is(r[e],a-1))return!1;return!0}scalar(e,r,t){var a=typeof e;switch(r){case ScalarType.UINT64:case ScalarType.FIXED64:case ScalarType.INT64:case ScalarType.SFIXED64:case ScalarType.SINT64:switch(t){case LongType.BIGINT:return"bigint"==a;case LongType.NUMBER:return"number"==a&&!isNaN(e);default:return"string"==a}case ScalarType.BOOL:return"boolean"==a;case ScalarType.STRING:return"string"==a;case ScalarType.BYTES:return e instanceof Uint8Array;case ScalarType.DOUBLE:case ScalarType.FLOAT:return"number"==a&&!isNaN(e);default:return"number"==a&&Number.isInteger(e)}}scalars(r,t,a,n){if(!Array.isArray(r))return!1;if(!(a<2)&&Array.isArray(r))for(let e=0;e<r.length&&e<a;e++)if(!this.scalar(r[e],t,n))return!1;return!0}mapKeys(e,r,t){var a=Object.keys(e);switch(r){case ScalarType.INT32:case ScalarType.FIXED32:case ScalarType.SFIXED32:case ScalarType.SINT32:case ScalarType.UINT32:return this.scalars(a.slice(0,t).map(e=>parseInt(e)),r,t);case ScalarType.BOOL:return this.scalars(a.slice(0,t).map(e=>"true"==e||"false"!=e&&e),r,t);default:return this.scalars(a,r,t,LongType.STRING)}}}function typeofJsonValue(e){var r=typeof e;if("object"==r){if(Array.isArray(e))return"array";if(null===e)return"null"}return r}function isJsonObject(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}let encTable="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),decTable=[];for(let e=0;e<encTable.length;e++)decTable[encTable[e].charCodeAt(0)]=e;function base64decode(r){let e=3*r.length/4,t=("="==r[r.length-2]?e-=2:"="==r[r.length-1]&&--e,new Uint8Array(e)),a=0,n=0,s,i=0;for(let e=0;e<r.length;e++){if(void 0===(s=decTable[r.charCodeAt(e)]))switch(r[e]){case"=":n=0;case"\n":case"\r":case"\t":case" ":continue;default:throw Error("invalid base64 string.")}switch(n){case 0:i=s,n=1;break;case 1:t[a++]=i<<2|(48&s)>>4,i=s,n=2;break;case 2:t[a++]=(15&i)<<4|(60&s)>>2,i=s,n=3;break;case 3:t[a++]=(3&i)<<6|s,n=0}}if(1==n)throw Error("invalid base64 string.");return t.subarray(0,a)}function base64encode(r){let t="",a=0,n,s=0;for(let e=0;e<r.length;e++)switch(n=r[e],a){case 0:t+=encTable[n>>2],s=(3&n)<<4,a=1;break;case 1:t+=encTable[s|n>>4],s=(15&n)<<2,a=2;break;case 2:t=(t+=encTable[s|n>>6])+encTable[63&n],a=0}return a&&(t=t+encTable[s]+"=",1==a&&(t+="=")),t}function reflectionLongConvert(e,r){switch(r){case LongType.BIGINT:return e.toBigInt();case LongType.NUMBER:return e.toNumber();default:return e.toString()}}decTable["-".charCodeAt(0)]=encTable.indexOf("+"),decTable["_".charCodeAt(0)]=encTable.indexOf("/");class ReflectionJsonReader{constructor(e){this.info=e}prepare(){var e;if(void 0===this.fMap){this.fMap={};for(const r of null!=(e=this.info.fields)?e:[])this.fMap[r.name]=r,this.fMap[r.jsonName]=r,this.fMap[r.localName]=r}}assert(e,r,t){if(!e){let e=typeofJsonValue(t);throw"number"!=e&&"boolean"!=e||(e=t.toString()),new Error(`Cannot parse JSON ${e} for ${this.info.typeName}#`+r)}}read(e,r,t){this.prepare();var a,n,s=[];for([a,n]of Object.entries(e)){var i=this.fMap[a];if(!i){if(t.ignoreUnknownFields)continue;throw new Error(`Found unknown field while reading ${this.info.typeName} from JSON format. JSON key: `+a)}var o=i.localName;let e;if(i.oneof){if(s.includes(i.oneof))throw new Error(`Multiple members of the oneof group "${i.oneof}" of ${this.info.typeName} are present in JSON.`);s.push(i.oneof),e=r[i.oneof]={oneofKind:o}}else e=r;if("map"==i.kind){if(null!==n){this.assert(isJsonObject(n),i.name,n);var l,c,u=e[o];for([l,c]of Object.entries(n)){this.assert(null!==c,i.name+" map value",null);let e;switch(i.V.kind){case"message":e=i.V.T().internalJsonRead(c,t);break;case"enum":if(!1===(e=this.enum(i.V.T(),c,i.name,t.ignoreUnknownFields)))continue;break;case"scalar":e=this.scalar(c,i.V.T,i.V.L,i.name)}this.assert(void 0!==e,i.name+" map value",c);let r=l;i.K==ScalarType.BOOL&&(r="true"==r||"false"!=r&&r),u[r=this.scalar(r,i.K,LongType.STRING,i.name).toString()]=e}}}else if(i.repeat){if(null!==n){this.assert(Array.isArray(n),i.name,n);var f=e[o];for(const p of n){this.assert(null!==p,i.name,null);let e;switch(i.kind){case"message":e=i.T().internalJsonRead(p,t);break;case"enum":if(!1===(e=this.enum(i.T(),p,i.name,t.ignoreUnknownFields)))continue;break;case"scalar":e=this.scalar(p,i.T,i.L,i.name)}this.assert(void 0!==e,i.name,n),f.push(e)}}}else switch(i.kind){case"message":null===n&&"google.protobuf.Value"!=i.T().typeName?this.assert(void 0===i.oneof,i.name+" (oneof member)",null):e[o]=i.T().internalJsonRead(n,t,e[o]);break;case"enum":var h=this.enum(i.T(),n,i.name,t.ignoreUnknownFields);!1!==h&&(e[o]=h);break;case"scalar":e[o]=this.scalar(n,i.T,i.L,i.name)}}}enum(r,t,a,n){if("google.protobuf.NullValue"==r[0]&&assert(null===t,`Unable to parse field ${this.info.typeName}#${a}, enum ${r[0]} only accepts null.`),null===t)return 0;switch(typeof t){case"number":return assert(Number.isInteger(t),`Unable to parse field ${this.info.typeName}#${a}, enum can only be integral number, got ${t}.`),t;case"string":let e=t;r[2]&&t.substring(0,r[2].length)===r[2]&&(e=t.substring(r[2].length));var s=r[1][e];return void 0===s&&n?!1:(assert("number"==typeof s,`Unable to parse field ${this.info.typeName}#${a}, enum ${r[0]} has no value for "${t}".`),s)}assert(!1,`Unable to parse field ${this.info.typeName}#${a}, cannot parse enum value from ${typeof t}".`)}scalar(r,t,a,e){let n;try{switch(t){case ScalarType.DOUBLE:case ScalarType.FLOAT:if(null===r)return 0;if("NaN"===r)return Number.NaN;if("Infinity"===r)return Number.POSITIVE_INFINITY;if("-Infinity"===r)return Number.NEGATIVE_INFINITY;if(""===r)n="empty string";else if("string"==typeof r&&r.trim().length!==r.length)n="extra whitespace";else if("string"==typeof r||"number"==typeof r){var s=Number(r);if(Number.isNaN(s))n="not a number";else{if(Number.isFinite(s))return t==ScalarType.FLOAT&&assertFloat32(s),s;n="too large or small"}}break;case ScalarType.INT32:case ScalarType.FIXED32:case ScalarType.SFIXED32:case ScalarType.SINT32:case ScalarType.UINT32:if(null===r)return 0;let e;if("number"==typeof r?e=r:""===r?n="empty string":"string"==typeof r&&(r.trim().length!==r.length?n="extra whitespace":e=Number(r)),void 0===e)break;return(t==ScalarType.UINT32?assertUInt32:assertInt32)(e),e;case ScalarType.INT64:case ScalarType.SFIXED64:case ScalarType.SINT64:if(null===r)return reflectionLongConvert(PbLong.ZERO,a);if("number"!=typeof r&&"string"!=typeof r)break;return reflectionLongConvert(PbLong.from(r),a);case ScalarType.FIXED64:case ScalarType.UINT64:if(null===r)return reflectionLongConvert(PbULong.ZERO,a);if("number"!=typeof r&&"string"!=typeof r)break;return reflectionLongConvert(PbULong.from(r),a);case ScalarType.BOOL:if(null===r)return!1;if("boolean"!=typeof r)break;return r;case ScalarType.STRING:if(null===r)return"";if("string"!=typeof r){n="extra whitespace";break}try{encodeURIComponent(r)}catch(e){0;break}return r;case ScalarType.BYTES:if(null===r||""===r)return new Uint8Array(0);if("string"!=typeof r)break;return base64decode(r)}}catch(e){n=e.message}this.assert(!1,e+(n?" - "+n:""),r)}}class ReflectionJsonWriter{constructor(e){this.fields=null!=(e=e.fields)?e:[]}write(e,r){var t,a,n={},s=e;for(const i of this.fields)i.oneof?(t=s[i.oneof]).oneofKind===i.localName&&(a="scalar"==i.kind||"enum"==i.kind?__spreadProps(__spreadValues({},r),{emitDefaultValues:!0}):r,assert(void 0!==(t=this.field(i,t[i.localName],a))),n[r.useProtoFieldName?i.name:i.jsonName]=t):void 0!==(a=this.field(i,s[i.localName],r))&&(n[r.useProtoFieldName?i.name:i.jsonName]=a);return n}field(r,t,a){let e=void 0;if("map"==r.kind){assert("object"==typeof t&&null!==t);var n={};switch(r.V.kind){case"scalar":for(var[s,i]of Object.entries(t)){i=this.scalar(r.V.T,i,r.name,!1,!0);assert(void 0!==i),n[s.toString()]=i}break;case"message":var o,l,c=r.V.T();for([o,l]of Object.entries(t)){var u=this.message(c,l,r.name,a);assert(void 0!==u),n[o.toString()]=u}break;case"enum":var f,h,p=r.V.T();for([f,h]of Object.entries(t)){assert(void 0===h||"number"==typeof h);var d=this.enum(p,h,r.name,!1,!0,a.enumAsInteger);assert(void 0!==d),n[f.toString()]=d}}(a.emitDefaultValues||0<Object.keys(n).length)&&(e=n)}else if(r.repeat){assert(Array.isArray(t));var y=[];switch(r.kind){case"scalar":for(let e=0;e<t.length;e++){var T=this.scalar(r.T,t[e],r.name,r.opt,!0);assert(void 0!==T),y.push(T)}break;case"enum":var g=r.T();for(let e=0;e<t.length;e++){assert(void 0===t[e]||"number"==typeof t[e]);var b=this.enum(g,t[e],r.name,r.opt,!0,a.enumAsInteger);assert(void 0!==b),y.push(b)}break;case"message":var m=r.T();for(let e=0;e<t.length;e++){var w=this.message(m,t[e],r.name,a);assert(void 0!==w),y.push(w)}}(a.emitDefaultValues||0<y.length||a.emitDefaultValues)&&(e=y)}else switch(r.kind){case"scalar":e=this.scalar(r.T,t,r.name,r.opt,a.emitDefaultValues);break;case"enum":e=this.enum(r.T(),t,r.name,r.opt,a.emitDefaultValues,a.enumAsInteger);break;case"message":e=this.message(r.T(),t,r.name,a)}return e}enum(e,r,t,a,n,s){if("google.protobuf.NullValue"==e[0])return null;if(void 0===r)assert(a);else if(0!==r||n||a)return assert("number"==typeof r),assert(Number.isInteger(r)),s||!e[1].hasOwnProperty(r)?r:e[2]?e[2]+e[1][r]:e[1][r]}message(e,r,t,a){return void 0===r?a.emitDefaultValues?null:void 0:e.internalJsonWrite(r,a)}scalar(e,r,t,a,n){if(void 0===r)assert(a);else{var s=n||a;switch(e){case ScalarType.INT32:case ScalarType.SFIXED32:case ScalarType.SINT32:return 0===r?s?0:void 0:(assertInt32(r),r);case ScalarType.FIXED32:case ScalarType.UINT32:return 0===r?s?0:void 0:(assertUInt32(r),r);case ScalarType.FLOAT:assertFloat32(r);case ScalarType.DOUBLE:return 0===r?s?0:void 0:(assert("number"==typeof r),Number.isNaN(r)?"NaN":r===Number.POSITIVE_INFINITY?"Infinity":r===Number.NEGATIVE_INFINITY?"-Infinity":r);case ScalarType.STRING:return""===r?s?"":void 0:(assert("string"==typeof r),r);case ScalarType.BOOL:return!1===r?!s&&void 0:(assert("boolean"==typeof r),r);case ScalarType.UINT64:case ScalarType.FIXED64:assert("number"==typeof r||"string"==typeof r||"bigint"==typeof r);var i=PbULong.from(r);return i.isZero()&&!s?void 0:i.toString();case ScalarType.INT64:case ScalarType.SFIXED64:case ScalarType.SINT64:assert("number"==typeof r||"string"==typeof r||"bigint"==typeof r);i=PbLong.from(r);return i.isZero()&&!s?void 0:i.toString();case ScalarType.BYTES:return(assert(r instanceof Uint8Array),r.byteLength)?base64encode(r):s?"":void 0}}}}function reflectionScalarDefault(e,r=LongType.STRING){switch(e){case ScalarType.BOOL:return!1;case ScalarType.UINT64:case ScalarType.FIXED64:return reflectionLongConvert(PbULong.ZERO,r);case ScalarType.INT64:case ScalarType.SFIXED64:case ScalarType.SINT64:return reflectionLongConvert(PbLong.ZERO,r);case ScalarType.DOUBLE:case ScalarType.FLOAT:return 0;case ScalarType.BYTES:return new Uint8Array(0);case ScalarType.STRING:return"";default:return 0}}class ReflectionBinaryReader{constructor(e){this.info=e}prepare(){var e;this.fieldNoToField||(e=null!=(e=this.info.fields)?e:[],this.fieldNoToField=new Map(e.map(e=>[e.no,e])))}read(a,n,s,e){this.prepare();for(var r=void 0===e?a.len:a.pos+e;a.pos<r;){var[t,i]=a.tag(),o=this.fieldNoToField.get(t);if(o){let e=n,r=o.repeat,t=o.localName;switch(o.oneof&&(e=e[o.oneof]).oneofKind!==t&&(e=n[o.oneof]={oneofKind:t}),o.kind){case"scalar":case"enum":var l="enum"==o.kind?ScalarType.INT32:o.T,c="scalar"==o.kind?o.L:void 0;if(r){var u=e[t];if(i==WireType.LengthDelimited&&l!=ScalarType.STRING&&l!=ScalarType.BYTES)for(var f=a.uint32()+a.pos;a.pos<f;)u.push(this.scalar(a,l,c));else u.push(this.scalar(a,l,c))}else e[t]=this.scalar(a,l,c);break;case"message":r?(h=e[t],p=o.T().internalBinaryRead(a,a.uint32(),s),h.push(p)):e[t]=o.T().internalBinaryRead(a,a.uint32(),s,e[t]);break;case"map":var[h,p]=this.mapEntry(o,a,s);e[t][h]=p}}else{var d=s.readUnknownField;if("throw"==d)throw new Error(`Unknown field ${t} (wire type ${i}) for `+this.info.typeName);var y=a.skip(i);!1!==d&&(!0===d?UnknownFieldHandler.onRead:d)(this.info.typeName,n,t,i,y)}}}mapEntry(e,r,t){var a=r.uint32(),n=r.pos+a;let s=void 0,i=void 0;for(;r.pos<n;){var[o,l]=r.tag();switch(o){case 1:s=e.K==ScalarType.BOOL?r.bool().toString():this.scalar(r,e.K,LongType.STRING);break;case 2:switch(e.V.kind){case"scalar":i=this.scalar(r,e.V.T,e.V.L);break;case"enum":i=r.int32();break;case"message":i=e.V.T().internalBinaryRead(r,r.uint32(),t)}break;default:throw new Error(`Unknown field ${o} (wire type ${l}) in map entry for ${this.info.typeName}#`+e.name)}}if(void 0===s&&(a=reflectionScalarDefault(e.K),s=e.K==ScalarType.BOOL?a.toString():a),void 0===i)switch(e.V.kind){case"scalar":i=reflectionScalarDefault(e.V.T,e.V.L);break;case"enum":i=0;break;case"message":i=e.V.T().create()}return[s,i]}scalar(e,r,t){switch(r){case ScalarType.INT32:return e.int32();case ScalarType.STRING:return e.string();case ScalarType.BOOL:return e.bool();case ScalarType.DOUBLE:return e.double();case ScalarType.FLOAT:return e.float();case ScalarType.INT64:return reflectionLongConvert(e.int64(),t);case ScalarType.UINT64:return reflectionLongConvert(e.uint64(),t);case ScalarType.FIXED64:return reflectionLongConvert(e.fixed64(),t);case ScalarType.FIXED32:return e.fixed32();case ScalarType.BYTES:return e.bytes();case ScalarType.UINT32:return e.uint32();case ScalarType.SFIXED32:return e.sfixed32();case ScalarType.SFIXED64:return reflectionLongConvert(e.sfixed64(),t);case ScalarType.SINT32:return e.sint32();case ScalarType.SINT64:return reflectionLongConvert(e.sint64(),t)}}}class ReflectionBinaryWriter{constructor(e){this.info=e}prepare(){var e;this.fields||(e=this.info.fields?this.info.fields.concat():[],this.fields=e.sort((e,r)=>e.no-r.no))}write(n,s,i){this.prepare();for(const f of this.fields){let e,r,t=f.repeat,a=f.localName;if(f.oneof){var o=n[f.oneof];if(o.oneofKind!==a)continue;e=o[a],r=!0}else e=n[a],r=!1;switch(f.kind){case"scalar":case"enum":var l="enum"==f.kind?ScalarType.INT32:f.T;if(t)if(assert(Array.isArray(e)),t==RepeatType.PACKED)this.packed(s,l,f.no,e);else for(const h of e)this.scalar(s,l,f.no,h,!0);else void 0===e?assert(f.opt):this.scalar(s,l,f.no,e,r||f.opt);break;case"message":if(t){assert(Array.isArray(e));for(const p of e)this.message(s,i,f.T(),f.no,p)}else this.message(s,i,f.T(),f.no,e);break;case"map":assert("object"==typeof e&&null!==e);for(var[c,u]of Object.entries(e))this.mapEntry(s,i,f,c,u)}}var e=i.writeUnknownFields;!1!==e&&(!0===e?UnknownFieldHandler.onWrite:e)(this.info.typeName,n,s)}mapEntry(e,r,t,a,n){e.tag(t.no,WireType.LengthDelimited),e.fork();let s=a;switch(t.K){case ScalarType.INT32:case ScalarType.FIXED32:case ScalarType.UINT32:case ScalarType.SFIXED32:case ScalarType.SINT32:s=Number.parseInt(a);break;case ScalarType.BOOL:assert("true"==a||"false"==a),s="true"==a}switch(this.scalar(e,t.K,1,s,!0),t.V.kind){case"scalar":this.scalar(e,t.V.T,2,n,!0);break;case"enum":this.scalar(e,ScalarType.INT32,2,n,!0);break;case"message":this.message(e,r,t.V.T(),2,n)}e.join()}message(e,r,t,a,n){void 0!==n&&(t.internalBinaryWrite(n,e.tag(a,WireType.LengthDelimited).fork(),r),e.join())}scalar(e,r,t,a,n){var[r,s,i]=this.scalarInfo(r,a);i&&!n||(e.tag(t,r),e[s](a))}packed(r,e,t,a){if(a.length){assert(e!==ScalarType.BYTES&&e!==ScalarType.STRING),r.tag(t,WireType.LengthDelimited),r.fork();var[,n]=this.scalarInfo(e);for(let e=0;e<a.length;e++)r[n](a[e]);r.join()}}scalarInfo(e,r){let t=WireType.Varint,a;var n=void 0===r;let s=0===r;switch(e){case ScalarType.INT32:a="int32";break;case ScalarType.STRING:s=n||!r.length,t=WireType.LengthDelimited,a="string";break;case ScalarType.BOOL:s=!1===r,a="bool";break;case ScalarType.UINT32:a="uint32";break;case ScalarType.DOUBLE:t=WireType.Bit64,a="double";break;case ScalarType.FLOAT:t=WireType.Bit32,a="float";break;case ScalarType.INT64:s=n||PbLong.from(r).isZero(),a="int64";break;case ScalarType.UINT64:s=n||PbULong.from(r).isZero(),a="uint64";break;case ScalarType.FIXED64:s=n||PbULong.from(r).isZero(),t=WireType.Bit64,a="fixed64";break;case ScalarType.BYTES:s=n||!r.byteLength,t=WireType.LengthDelimited,a="bytes";break;case ScalarType.FIXED32:t=WireType.Bit32,a="fixed32";break;case ScalarType.SFIXED32:t=WireType.Bit32,a="sfixed32";break;case ScalarType.SFIXED64:s=n||PbLong.from(r).isZero(),t=WireType.Bit64,a="sfixed64";break;case ScalarType.SINT32:a="sint32";break;case ScalarType.SINT64:s=n||PbLong.from(r).isZero(),a="sint64"}return[t,a,n||s]}}function reflectionCreate(e){var r,t={};Object.defineProperty(t,MESSAGE_TYPE,{enumerable:!1,value:e});for(r of e.fields){var a=r.localName;if(!r.opt)if(r.oneof)t[r.oneof]={oneofKind:void 0};else if(r.repeat)t[a]=[];else switch(r.kind){case"scalar":t[a]=reflectionScalarDefault(r.T,r.L);break;case"enum":t[a]=0;break;case"map":t[a]={}}}return t}function reflectionMergePartial(e,r,t){let a,n=t,s;for(var i of e.fields){var o=i.localName;if(i.oneof){var l=n[i.oneof];if(void 0===l)continue;if(a=l[o],(s=r[i.oneof]).oneofKind=l.oneofKind,void 0===a){delete s[o];continue}}else if(a=n[o],s=r,void 0===a)continue;switch(i.kind){case"scalar":case"enum":i.repeat?s[o]=a.concat():s[o]=a;break;case"message":var c=i.T();if(i.repeat)for(let e=0;e<a.length;e++)s[o][e]=c.create(a[e]);else void 0===s[o]?s[o]=c.create(a):c.mergePartial(s[o],a);break;case"map":switch(i.V.kind){case"scalar":case"enum":Object.assign(s[o],a);break;case"message":var u,f=i.V.T();for(u of Object.keys(a))s[o][u]=f.create(a[u])}}}}const defaultsWrite={emitDefaultValues:!1,enumAsInteger:!1,useProtoFieldName:!1,prettySpaces:0},defaultsRead={ignoreUnknownFields:!1};function jsonReadOptions(e){return e?__spreadValues(__spreadValues({},defaultsRead),e):defaultsRead}function jsonWriteOptions(e){return e?__spreadValues(__spreadValues({},defaultsWrite),e):defaultsWrite}function reflectionEquals(e,r,t){if(r!==t){if(!r||!t)return!1;for(var a of e.fields){var n=a.localName,s=(a.oneof?r[a.oneof]:r)[n],i=(a.oneof?t[a.oneof]:t)[n];switch(a.kind){case"enum":case"scalar":var o="enum"==a.kind?ScalarType.INT32:a.T;if((a.repeat?repeatedPrimitiveEq:primitiveEq)(o,s,i))break;return!1;case"map":if("message"==a.V.kind?repeatedMsgEq(a.V.T(),objectValues(s),objectValues(i)):repeatedPrimitiveEq("enum"==a.V.kind?ScalarType.INT32:a.V.T,objectValues(s),objectValues(i)))break;return!1;case"message":o=a.T();if(a.repeat?repeatedMsgEq(o,s,i):o.equals(s,i))break;return!1}}}return!0}const objectValues=Object.values;function primitiveEq(e,r,t){if(r!==t){if(e!==ScalarType.BYTES)return!1;var a=r,n=t;if(a.length!==n.length)return!1;for(let e=0;e<a.length;e++)if(a[e]!=n[e])return!1}return!0}function repeatedPrimitiveEq(r,t,a){if(t.length!==a.length)return!1;for(let e=0;e<t.length;e++)if(!primitiveEq(r,t[e],a[e]))return!1;return!0}function repeatedMsgEq(r,t,a){if(t.length!==a.length)return!1;for(let e=0;e<t.length;e++)if(!r.equals(t[e],a[e]))return!1;return!0}class MessageType{constructor(e,r,t){this.defaultCheckDepth=16,this.typeName=e,this.fields=r.map(normalizeFieldInfo),this.options=null!=t?t:{},this.refTypeCheck=new ReflectionTypeCheck(this),this.refJsonReader=new ReflectionJsonReader(this),this.refJsonWriter=new ReflectionJsonWriter(this),this.refBinReader=new ReflectionBinaryReader(this),this.refBinWriter=new ReflectionBinaryWriter(this)}create(e){var r=reflectionCreate(this);return void 0!==e&&reflectionMergePartial(this,r,e),r}clone(e){var r=this.create();return reflectionMergePartial(this,r,e),r}equals(e,r){return reflectionEquals(this,e,r)}is(e,r=this.defaultCheckDepth){return this.refTypeCheck.is(e,r,!1)}isAssignable(e,r=this.defaultCheckDepth){return this.refTypeCheck.is(e,r,!0)}mergePartial(e,r){reflectionMergePartial(this,e,r)}fromBinary(e,r){r=binaryReadOptions(r);return this.internalBinaryRead(r.readerFactory(e),e.byteLength,r)}fromJson(e,r){return this.internalJsonRead(e,jsonReadOptions(r))}fromJsonString(e,r){e=JSON.parse(e);return this.fromJson(e,r)}toJson(e,r){return this.internalJsonWrite(e,jsonWriteOptions(r))}toJsonString(e,r){var e=this.toJson(e,r);return JSON.stringify(e,null,null!=(e=null==r?void 0:r.prettySpaces)?e:0)}toBinary(e,r){r=binaryWriteOptions(r);return this.internalBinaryWrite(e,r.writerFactory(),r).finish()}internalJsonRead(e,r,t){if(null===e||"object"!=typeof e||Array.isArray(e))throw new Error(`Unable to parse message ${this.typeName} from JSON ${typeofJsonValue(e)}.`);return t=null!=t?t:this.create(),this.refJsonReader.read(e,t,r),t}internalJsonWrite(e,r){return this.refJsonWriter.write(e,r)}internalBinaryWrite(e,r,t){return this.refBinWriter.write(e,r,t),r}internalBinaryRead(e,r,t,a){a=null!=a?a:this.create();return this.refBinReader.read(e,a,t,r),a}}
					// proto/generated/youtube.request.js
					class Player$Type extends MessageType {
						constructor() {
							super("Player", [
								{ no: 1, name: "context", kind: "message", T: () => Player_Context },
								{ no: 2, name: "videoId", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
								{ no: 4, name: "playbackContext", kind: "message", T: () => Player_PlaybackContext }
							]);
						}
						create(value) {
							const message = { videoId: "" };
							globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
							if (value !== undefined)
								reflectionMergePartial(this, message, value);
							return message;
						}
						internalBinaryRead(reader, length, options, target) {
							let message = target ?? this.create(), end = reader.pos + length;
							while (reader.pos < end) {
								let [fieldNo, wireType] = reader.tag();
								switch (fieldNo) {
									case /* Player.Context context */ 1:
										message.context = Player_Context.internalBinaryRead(reader, reader.uint32(), options, message.context);
										break;
									case /* string videoId */ 2:
										message.videoId = reader.string();
										break;
									case /* Player.PlaybackContext playbackContext */ 4:
										message.playbackContext = Player_PlaybackContext.internalBinaryRead(reader, reader.uint32(), options, message.playbackContext);
										break;
									default:
										let u = options.readUnknownField;
										if (u === "throw")
											throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
										let d = reader.skip(wireType);
										if (u !== false)
											(u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
								}
							}
							return message;
						}
						internalBinaryWrite(message, writer, options) {
							/* Player.Context context = 1; */
							if (message.context)
								Player_Context.internalBinaryWrite(message.context, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
							/* string videoId = 2; */
							if (message.videoId !== "")
								writer.tag(2, WireType.LengthDelimited).string(message.videoId);
							/* Player.PlaybackContext playbackContext = 4; */
							if (message.playbackContext)
								Player_PlaybackContext.internalBinaryWrite(message.playbackContext, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
							let u = options.writeUnknownFields;
							if (u !== false)
								(u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
							return writer;
						}
					}
					class Player_Context$Type extends MessageType {
						constructor() {
							super("Player.Context", [
								{ no: 1, name: "client", kind: "message", T: () => Player_Context_Client }
							]);
						}
						create(value) {
							const message = {};
							globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
							if (value !== undefined)
								reflectionMergePartial(this, message, value);
							return message;
						}
						internalBinaryRead(reader, length, options, target) {
							let message = target ?? this.create(), end = reader.pos + length;
							while (reader.pos < end) {
								let [fieldNo, wireType] = reader.tag();
								switch (fieldNo) {
									case /* Player.Context.Client client */ 1:
										message.client = Player_Context_Client.internalBinaryRead(reader, reader.uint32(), options, message.client);
										break;
									default:
										let u = options.readUnknownField;
										if (u === "throw")
											throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
										let d = reader.skip(wireType);
										if (u !== false)
											(u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
								}
							}
							return message;
						}
						internalBinaryWrite(message, writer, options) {
							/* Player.Context.Client client = 1; */
							if (message.client)
								Player_Context_Client.internalBinaryWrite(message.client, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
							let u = options.writeUnknownFields;
							if (u !== false)
								(u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
							return writer;
						}
					}
					class Player_Context_Client$Type extends MessageType {
						constructor() {
							super("Player.Context.Client", [
								{ no: 1, name: "hl", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
								{ no: 2, name: "gl", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
								{ no: 12, name: "deviceMake", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
								{ no: 13, name: "deviceModel", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
								{ no: 17, name: "clientVersion", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
								{ no: 18, name: "osName", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
								{ no: 19, name: "osVersion", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
								{ no: 80, name: "timeZone", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
							]);
						}
						create(value) {
							const message = { hl: "", gl: "", deviceMake: "", deviceModel: "", clientVersion: "", osName: "", osVersion: "", timeZone: "" };
							globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
							if (value !== undefined)
								reflectionMergePartial(this, message, value);
							return message;
						}
						internalBinaryRead(reader, length, options, target) {
							let message = target ?? this.create(), end = reader.pos + length;
							while (reader.pos < end) {
								let [fieldNo, wireType] = reader.tag();
								switch (fieldNo) {
									case /* string hl */ 1:
										message.hl = reader.string();
										break;
									case /* string gl */ 2:
										message.gl = reader.string();
										break;
									case /* string deviceMake */ 12:
										message.deviceMake = reader.string();
										break;
									case /* string deviceModel */ 13:
										message.deviceModel = reader.string();
										break;
									case /* string clientVersion */ 17:
										message.clientVersion = reader.string();
										break;
									case /* string osName */ 18:
										message.osName = reader.string();
										break;
									case /* string osVersion */ 19:
										message.osVersion = reader.string();
										break;
									case /* string timeZone */ 80:
										message.timeZone = reader.string();
										break;
									default:
										let u = options.readUnknownField;
										if (u === "throw")
											throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
										let d = reader.skip(wireType);
										if (u !== false)
											(u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
								}
							}
							return message;
						}
						internalBinaryWrite(message, writer, options) {
							/* string hl = 1; */
							if (message.hl !== "")
								writer.tag(1, WireType.LengthDelimited).string(message.hl);
							/* string gl = 2; */
							if (message.gl !== "")
								writer.tag(2, WireType.LengthDelimited).string(message.gl);
							/* string deviceMake = 12; */
							if (message.deviceMake !== "")
								writer.tag(12, WireType.LengthDelimited).string(message.deviceMake);
							/* string deviceModel = 13; */
							if (message.deviceModel !== "")
								writer.tag(13, WireType.LengthDelimited).string(message.deviceModel);
							/* string clientVersion = 17; */
							if (message.clientVersion !== "")
								writer.tag(17, WireType.LengthDelimited).string(message.clientVersion);
							/* string osName = 18; */
							if (message.osName !== "")
								writer.tag(18, WireType.LengthDelimited).string(message.osName);
							/* string osVersion = 19; */
							if (message.osVersion !== "")
								writer.tag(19, WireType.LengthDelimited).string(message.osVersion);
							/* string timeZone = 80; */
							if (message.timeZone !== "")
								writer.tag(80, WireType.LengthDelimited).string(message.timeZone);
							let u = options.writeUnknownFields;
							if (u !== false)
								(u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
							return writer;
						}
					}
					class Player_PlaybackContext$Type extends MessageType {
						constructor() {
							super("Player.PlaybackContext", [
								{ no: 1, name: "contentPlaybackContext", kind: "message", T: () => Player_PlaybackContext_ContentPlaybackContext }
							]);
						}
						create(value) {
							const message = {};
							globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
							if (value !== undefined)
								reflectionMergePartial(this, message, value);
							return message;
						}
						internalBinaryRead(reader, length, options, target) {
							let message = target ?? this.create(), end = reader.pos + length;
							while (reader.pos < end) {
								let [fieldNo, wireType] = reader.tag();
								switch (fieldNo) {
									case /* Player.PlaybackContext.ContentPlaybackContext contentPlaybackContext */ 1:
										message.contentPlaybackContext = Player_PlaybackContext_ContentPlaybackContext.internalBinaryRead(reader, reader.uint32(), options, message.contentPlaybackContext);
										break;
									default:
										let u = options.readUnknownField;
										if (u === "throw")
											throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
										let d = reader.skip(wireType);
										if (u !== false)
											(u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
								}
							}
							return message;
						}
						internalBinaryWrite(message, writer, options) {
							/* Player.PlaybackContext.ContentPlaybackContext contentPlaybackContext = 1; */
							if (message.contentPlaybackContext)
								Player_PlaybackContext_ContentPlaybackContext.internalBinaryWrite(message.contentPlaybackContext, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
							let u = options.writeUnknownFields;
							if (u !== false)
								(u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
							return writer;
						}
					}
					class Player_PlaybackContext_ContentPlaybackContext$Type extends MessageType {
						constructor() {
							super("Player.PlaybackContext.ContentPlaybackContext", [
								{ no: 4, name: "id4", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
								{ no: 6, name: "id6", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
								{ no: 8, name: "id8", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ },
								{ no: 9, name: "id9", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ }
							]);
						}
						create(value) {
							const message = {};
							globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
							if (value !== undefined)
								reflectionMergePartial(this, message, value);
							return message;
						}
						internalBinaryRead(reader, length, options, target) {
							let message = target ?? this.create(), end = reader.pos + length;
							while (reader.pos < end) {
								let [fieldNo, wireType] = reader.tag();
								switch (fieldNo) {
									case /* optional int32 id4 */ 4:
										message.id4 = reader.int32();
										break;
									case /* optional int32 id6 */ 6:
										message.id6 = reader.int32();
										break;
									case /* optional int32 id8 */ 8:
										message.id8 = reader.int32();
										break;
									case /* optional int32 id9 */ 9:
										message.id9 = reader.int32();
										break;
									default:
										let u = options.readUnknownField;
										if (u === "throw")
											throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
										let d = reader.skip(wireType);
										if (u !== false)
											(u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
								}
							}
							return message;
						}
						internalBinaryWrite(message, writer, options) {
							/* optional int32 id4 = 4; */
							if (message.id4 !== undefined)
								writer.tag(4, WireType.Varint).int32(message.id4);
							/* optional int32 id6 = 6; */
							if (message.id6 !== undefined)
								writer.tag(6, WireType.Varint).int32(message.id6);
							/* optional int32 id8 = 8; */
							if (message.id8 !== undefined)
								writer.tag(8, WireType.Varint).int32(message.id8);
							/* optional int32 id9 = 9; */
							if (message.id9 !== undefined)
								writer.tag(9, WireType.Varint).int32(message.id9);
							let u = options.writeUnknownFields;
							if (u !== false)
								(u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
							return writer;
						}
					}
					/**
					 * @generated MessageType for protobuf message Player
					 */
					const Player = new Player$Type();
					/**
					 * @generated MessageType for protobuf message Player.Context
					 */
					const Player_Context = new Player_Context$Type();
					/**
					 * @generated MessageType for protobuf message Player.Context.Client
					 */
					const Player_Context_Client = new Player_Context_Client$Type();
					/**
					 * @generated MessageType for protobuf message Player.PlaybackContext
					 */
					const Player_PlaybackContext = new Player_PlaybackContext$Type();
					/**
					 * @generated MessageType for protobuf message Player.PlaybackContext.ContentPlaybackContext
					 */
					const Player_PlaybackContext_ContentPlaybackContext = new Player_PlaybackContext_ContentPlaybackContext$Type();
					/******************  initialization finish  *******************/
                    const binaryBody = $.isQuanX() ? new Uint8Array($request.bodyBytes) : $request.body;
					data = Player.fromBinary(binaryBody);
					$.log(`🚧 ${$.name}`, `data: ${JSON.stringify(data)}`, "");
					// 找功能
					if (data?.playbackContext) { // 有播放设置
						$.log(`⚠ ${$.name}, playbackContext`, "");
						if (data?.playbackContext.contentPlaybackContext) { // 有播放设置内容
							//data.playbackContext.contentPlaybackContext.autoCaptionsDefaultOn = true; // 默认开启自动字幕
							data.playbackContext.contentPlaybackContext.id4 = 1; // 
							data.playbackContext.contentPlaybackContext.id6 = 1; // 
							data.playbackContext.contentPlaybackContext.id8 = 1; // 
							data.playbackContext.contentPlaybackContext.id9 = 1; // 
                        };
					};
					// 找功能
					if ($.isQuanX()) $request.bodyBytes = Player.toBinary(data);
					else $request.body = Player.toBinary(data);
					break;
				default:
					break;
			};
			break;
		case "false":
			$.log(`⚠ ${$.name}, 功能关闭`, "");
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		switch ($response) {
			default: // 有构造回复数据，返回构造的回复数据
				//$.log(`🚧 ${$.name}, finally`, `echo $response:${JSON.stringify($response)}`, "");
				$.log(`🎉 ${$.name}, finally`, `echo $response`, "");
				// headers转小写
				for (const [key, value] of Object.entries($response.headers)) {
					delete $response.headers[key]
					$response.headers[key.toLowerCase()] = value
				};
				$response.headers["content-encoding"] = "identity";
				if ($.isQuanX()) $.done($response)
				else $.done({ response: $response });
				break;
			case undefined: // 无构造回复数据，发送修改的请求数据
				//$.log(`🚧 ${$.name}, finally`, `$request:${JSON.stringify($request)}`, "");
				$.log(`🎉 ${$.name}, finally`, `$request`, "");
				switch ($request?.headers?.["content-type"]?.split(";")?.[0]) {
					case "application/json":
					case "text/xml":
					default:
						// 返回普通数据
						if ($.isQuanX()) $.done({ headers: $request.headers, body: $request.body, opts: $request.opts })
						else $.done($request)
						break;
					case "application/x-protobuf":
					case "application/grpc":
						// 返回二进制数据
						if ($.isQuanX()) {
							$.log(`${$request.bodyBytes.byteLength}---${$request.bodyBytes.buffer.byteLength}`);
							$.log(`bodyBytes.byteOffset: ${$request.bodyBytes.byteOffset}}`);
							$.done({ headers: $request.headers, bodyBytes: $request.bodyBytes.buffer.slice($request.bodyBytes.byteOffset, $request.bodyBytes.byteLength + $request.bodyBytes.byteOffset), opts: $request.opts });
						} else {
							$.log(`${$request.body.byteLength}---${$request.body.buffer.byteLength}`);
							$.done($request)
						};
						break;
					case undefined: // 视为无body
						// 返回普通数据
						if ($.isQuanX()) $.done({ headers: $request.headers, opts: $request.opts })
						else $.done($request)
						break;

				};
				break;
		};
	})

/***************** Async Function *****************/
/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/VirgilClyne/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default Database
 * @return {Promise<*>}
 */
async function getENV(t,e,n){let i=$.getjson(t,n),s={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((t=>t.split("="))));for(let e in t)f(s,e,t[e])}let g={...n?.Default?.Settings,...n?.[e]?.Settings,...i?.[e]?.Settings,...s},o={...n?.Default?.Configs,...n?.[e]?.Configs,...i?.[e]?.Configs},a=i?.[e]?.Caches||void 0;return"string"==typeof a&&(a=JSON.parse(a)),{Settings:g,Caches:a,Configs:o};function f(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}

/**
 * Set Environment Variables
 * @author VirgilClyne
 * @param {String} name - Persistent Store Key
 * @param {String} url - Request URL
 * @param {Object} database - Default DataBase
 * @return {Promise<*>}
 */
function setENV(name, url, database) {
	$.log(`⚠ ${$.name}, Set Environment Variables`, "");
	/***************** Verify *****************/
	const { Settings: Verify } = getENV(name, "Verify", database);
	/***************** Advanced *****************/
	let { Settings: Advanced } = getENV(name, "Advanced", database);
	Advanced.Translator.Times = parseInt(Advanced.Translator?.Times, 10) // BoxJs字符串转数字
	Advanced.Translator.Interval = parseInt(Advanced.Translator?.Interval, 10) // BoxJs字符串转数字
	Advanced.Translator.Exponential = JSON.parse(Advanced.Translator?.Exponential) //  BoxJs字符串转Boolean
	/***************** Platform *****************/
	const Platform = /\.apple\.com/i.test(url) ? "Apple"
		: /\.(dssott|starott)\.com/i.test(url) ? "Disney_Plus"
			: /\.(hls\.row\.aiv-cdn|akamaihd|cloudfront)\.net/i.test(url) ? "Prime_Video"
				: /\.(api\.hbo|hbomaxcdn)\.com/i.test(url) ? "HBO_Max"
					: /\.(hulustream|huluim)\.com/i.test(url) ? "Hulu"
						: /\.(cbsaavideo|cbsivideo|cbs)\.com/i.test(url) ? "Paramount_Plus"
							: /dplus-ph-/i.test(url) ? "Discovery_Plus_Ph"
								: /\.peacocktv\.com/i.test(url) ? "Peacock_TV"
									: /\.uplynk\.com/i.test(url) ? "Discovery_Plus"
										: /\.fubo\.tv/i.test(url) ? "Fubo_TV"
											: /(\.youtube|youtubei\.googleapis)\.com/i.test(url) ? "YouTube"
												: /\.(netflix\.com|nflxvideo\.net)/i.test(url) ? "Netflix"
													: "Universal"
	$.log(`🚧 ${$.name}, Set Environment Variables`, `Platform: ${Platform}`, "");
	/***************** Settings *****************/
	let { Settings, Caches = [], Configs } = getENV(name, Platform, database);
	if (Platform == "Apple") {
		let platform = /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/subscription\//i.test(url) ? "Apple_TV_Plus"
			: /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\/workout\//i.test(url) ? "Apple_Fitness"
				: /\.itunes\.apple\.com\/WebObjects\/(MZPlay|MZPlayLocal)\.woa\/hls\//i.test(url) ? "Apple_TV"
					: /vod-.*-aoc\.tv\.apple\.com/i.test(url) ? "Apple_TV_Plus"
						: /vod-.*-amt\.tv\.apple\.com/i.test(url) ? "Apple_TV"
							: /(hls|hls-svod)\.itunes\.apple\.com/i.test(url) ? "Apple_Fitness"
								: "Apple"
		$.log(`🚧 ${$.name}, Set Environment Variables`, `platform: ${platform}`, "");
		Settings = getENV(name, platform, database).then(v=> v.Settings);
	};
	//Settings.Switch = JSON.parse(Settings.Switch) //  BoxJs字符串转Boolean
	if (typeof Settings.Types === "string") Settings.Types = Settings.Types.split(",") // BoxJs字符串转数组
	if (Array.isArray(Settings.Types)) {
		if (!Verify.GoogleCloud.Auth) Settings.Types = Settings.Types.filter(e => e !== "GoogleCloud"); // 移除不可用类型
		if (!Verify.Azure.Auth) Settings.Types = Settings.Types.filter(e => e !== "Azure");
		if (!Verify.DeepL.Auth) Settings.Types = Settings.Types.filter(e => e !== "DeepL");
	}
	Settings.External.Offset = parseInt(Settings.External?.Offset, 10) // BoxJs字符串转数字
	Settings.External.ShowOnly = JSON.parse(Settings.External?.ShowOnly) //  BoxJs字符串转Boolean
	Settings.CacheSize = parseInt(Settings.CacheSize, 10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance, 10) // BoxJs字符串转数字
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	return { Platform, Verify, Advanced, Settings, Caches, Configs };
};

/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,o)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}getEnv(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.getEnv()}isQuanX(){return"Quantumult X"===this.getEnv()}isSurge(){return"Surge"===this.getEnv()}isLoon(){return"Loon"===this.getEnv()}isShadowrocket(){return"Shadowrocket"===this.getEnv()}isStash(){return"Stash"===this.getEnv()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=e&&e.timeout?e.timeout:o;const[r,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),o=JSON.stringify(this.data);s?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(e,o):this.fs.writeFileSync(t,o)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return s;return o}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),o=s?this.getval(s):"";if(o)try{const t=JSON.parse(o);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(e),r=this.getval(i),h=i?"null"===r?null:r||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,o,t),s=this.setval(JSON.stringify(e),i)}catch(e){const r={};this.lodash_set(r,o,t),s=this.setval(JSON.stringify(r),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"],delete t.headers["content-type"],delete t.headers["content-length"]),this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:o,headers:r,rawBody:h}=t,n=s.decode(h,this.encoding);e(null,{status:i,statusCode:o,headers:r,rawBody:h,body:n},n)},t=>{const{message:i,response:o}=t;e(i,o,o&&s.decode(o.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),t.headers&&(delete t.headers["Content-Length"],delete t.headers["content-length"]),this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:o,body:r}=t;e(null,{status:s,statusCode:i,headers:o,body:r},r)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:o,...r}=t;this.got[s](o,r).then(t=>{const{statusCode:s,statusCode:o,headers:r,rawBody:h}=t,n=i.decode(h,this.encoding);e(null,{status:s,statusCode:o,headers:r,rawBody:h,body:n},n)},t=>{const{message:s,response:o}=t;e(s,o,o&&i.decode(o.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",o){const r=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()||this.isShadowrocket()?t:this.isQuanX()?{"open-url":t}:this.isSurge()||this.isStash()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()||this.isShadowrocket()||this.isStash()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isShadowrocket()||this.isLoon()||this.isStash()?$notification.post(e,s,i,r(o)):this.isQuanX()&&$notify(e,s,i,r(o))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!(this.isSurge()||this.isShadowrocket()||this.isQuanX()||this.isLoon()||this.isStash());s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),this.isSurge()||this.isShadowrocket()||this.isQuanX()||this.isLoon()||this.isStash()?$done(t):this.isNode()&&process.exit(1)}}(t,e)}

// https://github.com/DualSubs/URL/blob/main/URLs.embedded.min.js
function URLs(s){return new class{constructor(s=[]){this.name="URL v1.0.2",this.opts=s,this.json={scheme:"",host:"",path:"",params:{}}}parse(s){let t=s.match(/(?<scheme>.+):\/\/(?<host>[^/]+)\/?(?<path>[^?]+)?\??(?<params>.*)?/)?.groups??null;return t?.path||(t.path=""),t?.params&&(t.params=Object.fromEntries(t.params.split("&").map((s=>s.split("="))))),t}stringify(s=this.json){return s?.params?s.scheme+"://"+s.host+"/"+s.path+"?"+Object.entries(s.params).map((s=>s.join("="))).join("&"):s.scheme+"://"+s.host+"/"+s.path}}(s)}

/**
 * Get Environment Variables
 * @link https://github.com/VirgilClyne/VirgilClyne/blob/main/function/getENV/getENV.min.js
 * @author VirgilClyne
 * @param {String} t - Persistent Store Key
 * @param {String} e - Platform Name
 * @param {Object} n - Default Database
 * @return {Object} { Settings, Caches, Configs }
 */
function getENV(t,e,n){let i=$.getjson(t,n),s={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((t=>t.split("="))));for(let e in t)l(s,e,t[e])}let g={...n?.Default?.Settings,...n?.[e]?.Settings,...i?.[e]?.Settings,...s},f={...n?.Default?.Configs,...n?.[e]?.Configs,...i?.[e]?.Configs},o=i?.[e]?.Caches||{};return"string"==typeof o&&(o=JSON.parse(o)),{Settings:g,Caches:o,Configs:f};function l(t,e,n){e.split(".").reduce(((t,i,s)=>t[i]=e.split(".").length===++s?n:t[i]||{}),t)}}
