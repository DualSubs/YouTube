### 🆕 New Features
  * 新增本地网页设置入口，由 YouTube 模块独立提供配置，复用 Universal 的设置页面与存储 API。

### 🛠️ Bug Fixes
  * 修复 `$argument` 和 `$persistentStore` 载入顺序颠倒的问题
    * 正确顺序为先读取 `$argument` 再读取 `$persistentStore (BoxJs)`
    * 即，有相同键名时，`$persistentStore (BoxJs)` 的值会覆盖 `$argument` 的值

### 🔣 Dependencies
  * 升级了 `@nsnanocat/util`
    * `util` 由 `submodule` 更改为 `package`
    * `$platform` 改为 `$app`
    * 使用了全新的 `Console` polyfill
