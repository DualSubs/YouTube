export interface Settings {
    /**
     * [字幕] 启用类型
     *
     * 请选择要使用的字幕，双语字幕将使用您选择类型呈现。
     *
     * @remarks
     *
     * Possible values:
     * - `'Official'` - 官方字幕（合成器）
     * - `'Translate'` - 翻译字幕（翻译器）
     *
     * @defaultValue "Official"
     */
    Type?: 'Official' | 'Translate';
    /**
     * [歌词] 启用类型
     *
     * 请选择要添加的歌词选项，如果为多选，则会自动决定提供的歌词类型。
     *
     * @remarks
     *
     * Possible values:
     * - `'Translate'` - 翻译歌词（翻译器）
     *
     * @defaultValue ["Translate"]
     */
    Types?: ('Translate')[];
    /**
     * [字幕] 自动显示
     *
     * 是否总是自动开启字幕显示。
     *
     * @defaultValue true
     */
    AutoCC?: boolean;
    /**
     * [字幕] 主语言（源语言）字幕位置
     *
     * 主语言（源语言）字幕的显示位置。
     *
     * @remarks
     *
     * Possible values:
     * - `'Forward'` - 上面（第一行）
     * - `'Reverse'` - 下面（第二行）
     *
     * @defaultValue "Forward"
     */
    Position?: 'Forward' | 'Reverse';
    /**
     * [翻译器] 服务商API
     *
     * 请选择翻译器所使用的服务商API，更多翻译选项请使用BoxJs。
     *
     * @remarks
     *
     * Possible values:
     * - `'Google'` - Google Translate
     * - `'Microsoft'` - Microsoft Translator（需填写API）
     *
     * @defaultValue "Google"
     */
    Vendor?: 'Google' | 'Microsoft';
    /**
     * [翻译器] 只显示“自动翻译”字幕
     *
     * 是否仅显示“自动翻译”字幕，不显示源语言字幕。
     *
     * @defaultValue false
     */
    ShowOnly?: boolean;
    /**
     * [储存] 配置类型
     *
     * 默认优先使用设置面板或 BoxJS 保存的配置，其次使用插件配置，最后使用脚本默认配置。
     *
     * @remarks
     *
     * Possible values:
     * - `'Argument'` - 插件配置优先
     * - `'PersistentStore'` - 持久化存储优先
     * - `'database'` - 仅使用默认配置
     *
     * @defaultValue "PersistentStore"
     */
    Storage?: 'Argument' | 'PersistentStore' | 'database';
    /**
     * [调试] 日志等级
     *
     * 选择脚本日志的输出等级，低于所选等级的日志将全部输出。
     *
     * @remarks
     *
     * Possible values:
     * - `'OFF'` - 关闭
     * - `'ERROR'` - ❌ 错误
     * - `'WARN'` - ⚠️ 警告
     * - `'INFO'` - ℹ️ 信息
     * - `'DEBUG'` - 🅱️ 调试
     * - `'ALL'` - 全部
     *
     * @defaultValue "WARN"
     */
    LogLevel?: 'OFF' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'ALL';
}
