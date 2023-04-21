/*
README:https://github.com/DualSubs/DualSubs/
*/

const $ = new Env("🍿 DualSubs for ▶ YouTube v0.7.3(12) timedtext.request.beta");
const URL = new URLs();
const DataBase = {
	"Verify": {
		"Settings":{"GoogleCloud":{"Method":"Part","Mode":"Key","Auth":null},"Azure":{"Method":"Part","Version":"Azure","Region":null,"Mode":"Key","Auth":null},"DeepL":{"Method":"Part","Version":"Free","Auth":null}}
	},
	"Advanced": {
		"Settings":{"Translator":{"Times":3,"Interval":100,"Exponential":true}}
	},
	"Default": {
		"Settings":{"Switch":true,"Types":["Official","Google","GoogleCloud","Azure","DeepL"],"Type":"Google","Languages":["ZH","EN"],"Language":"ZH","Translate":{"ShowOnly":false},"External":{"URL":null,"Offset":0,"ShowOnly":false},"Position":"Forward","CacheSize":20,"Tolerance":1000},
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

if ($request.method == "OPTIONS") $.done();
/*
// headers转小写
for (const [key, value] of Object.entries($request.headers)) {
	delete $request.headers[key]
	$request.headers[key.toLowerCase()] = value
};
*/
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
			$.log(`⚠ ${$.name}, url.path=${url.path}`, "");
			setCache(Settings, Caches, url?.params?.v, url?.params?.lang, url?.params?.tlang)
			switch (url.params.cplatform) {
				case "DESKTOP":
					$.log(`⚠ ${$.name}, 桌面端`, "");
					break;
				case "MOBILE":
				default:
					$.log(`⚠ ${$.name}, 移动端`, "");
					switch (url.params?.kind) {
						case "asr":
							$.log(`⚠ ${$.name}, 自动生成字幕`, "");
							switch (Settings.Language) {
								case "OFF":
									$.log(`⚠ ${$.name}, 兼容字幕：关闭`, "");
									break;
								default:
									$.log(`⚠ ${$.name}, 兼容字幕：${Settings.Language}`, "");
									//url.params.tlang = Configs.Languages[Settings.Language]; // 翻译字幕
									break;
							};
							break;
						case "captions":
						default:
							$.log(`⚠ ${$.name}, 普通字幕`, "");
							break;
					};
					break;
			};
			$request.url = URL.stringify(url);
			break;
		case "false":
			$.log(`⚠ ${$.name}, 功能关闭`, "");
			break;
	};
})()
	.catch((e) => $.logErr(e))
	.finally(() => {
		const Format = ($request?.headers?.["Content-Type"] ?? $request?.headers?.["content-type"])?.split(";")?.[0];
		$.log(`🎉 ${$.name}, finally`, `Format:${Format}`, "");
		switch ($response) {
			default: // 有构造回复数据，返回构造的回复数据
				//$.log(`🚧 ${$.name}, finally`, `echo $response:${JSON.stringify($response)}`, "");
				$.log(`🎉 ${$.name}, finally`, `echo $response`, "");
				/*
				// headers转小写
				for (const [key, value] of Object.entries($response.headers)) {
					delete $response.headers[key]
					$response.headers[key.toLowerCase()] = value
				};
				*/
				if ($response.headers["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
				if ($response.headers["content-encoding"]) $response.headers["content-encoding"] = "identity";
				if ($.isQuanX()) {
					switch (Format) {
						case "application/json":
						case "text/xml":
						default:
							$.done({ headers: $response.headers, body: $response.body });
							break;
						case "application/x-protobuf":
						case "application/grpc":
							$.done({ headers: $response.headers, bodyBytes: $response.bodyBytes });
							break;
						case undefined: // 视为无body
							$.done({ headers: $response.headers });
							break;

					};
				} else $.done({ response: $response });
				break;
			case undefined: // 无构造回复数据，发送修改的请求数据
				//$.log(`🚧 ${$.name}, finally`, `$request:${JSON.stringify($request)}`, "");
				$.log(`🎉 ${$.name}, finally`, `$request`, "");
				switch (Format) {
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
							$.done($request);
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

/***************** Function *****************/
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
	let { Settings, Caches, Configs } = getENV(name, Platform, database);
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
	Settings.Translate.ShowOnly = JSON.parse(Settings.Translate?.ShowOnly) //  BoxJs字符串转Boolean
	Settings.External.Offset = parseInt(Settings.External?.Offset, 10) // BoxJs字符串转数字
	Settings.External.ShowOnly = JSON.parse(Settings.External?.ShowOnly) //  BoxJs字符串转Boolean
	Settings.CacheSize = parseInt(Settings.CacheSize, 10) // BoxJs字符串转数字
	Settings.Tolerance = parseInt(Settings.Tolerance, 10) // BoxJs字符串转数字
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Settings: ${typeof Settings}`, `Settings内容: ${JSON.stringify(Settings)}`, "");
	/***************** Caches *****************/
	Caches.map = new Map(Caches?.map ?? []); // Array转Map
	$.log(`🎉 ${$.name}, Set Environment Variables`, `Caches: ${typeof Caches}`, `Caches内容: ${JSON.stringify(Caches)}`, "");
	return { Platform, Verify, Advanced, Settings, Caches, Configs };
};

/**
 * Set Cache
 * @author VirgilClyne
 * @param {Object} settings - Settings
 * @param {Object} cache - Cache
 * @param {String} v - video id
 * @param {String} lang - original lang
 * @param {String} tlang - translate lang
 * @return {Array<Boolean>} is setJSON success?
 */
function setCache(settings, cache, v, lang, tlang) {
	$.log(`⚠ ${$.name}, Set Cache`, `v: ${v}, lang: ${lang}, tlang: ${tlang}`, "");
	let isSaved = false;
	cache.tlang = tlang; // 保存目标语言
	if (v && lang && !tlang) cache.map.set(v, lang); // 保存原文语言
	cache.map = Array.from(cache.map); // Map转Array
	cache.map = cache.map.slice(-settings.CacheSize); // 限制缓存大小
	console.log(cache);
	isSaved = $.setjson(cache, "@DualSubs.YouTube.Caches");
	//$.log(`🚧 ${$.name}, Set Cache`, `cache: ${JSON.stringify(cache)}`, "");
	$.log(`🎉 ${$.name}, Set Cache`, `$.setjson ? ${isSaved}`, "");
	return isSaved;
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
