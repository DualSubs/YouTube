# 🍿️ DualSubs: ▶ YouTube


## 本地设置

安装 Universal 提供的共用存储 API 后，通过 `https://dualsubs.github.io/settings/` 进入首页，再选择 YouTube 面板。此仓库独立维护正式／开发配置 JSON、各平台的 `/api/YouTube` Mock 和开发 Gist 产物；Universal 不再提供本模块配置。前端、首页内容与图标由 DualSubs.github.io 在线提供，插件模板不 Mock 前端资源。

## 构建

`arguments-builder.full.config.ts` 是字段定义来源；`release`、`dev` 和 `PreferencePanes` 配置分别选择模块参数和网页字段，保留原有渠道差异。`npm run check:args` 检查参数类型，`npm run dts` 调用公共库的业务类型生成器。

使用 Node 24，安装依赖后运行 `node node_modules/puppeteer/install.mjs` 安装转换 Egern 所需的 Chrome。`npm run build` 和 `npm run dev` 均先清空 `dist`，生成模块及当前渠道的设置，再用 Rollup 生成独立脚本。开发脚本使用 `.dev.bundle.js`；转换失败或缺少 Egern 文件时构建停止。正式构建后运行 `npm test`，开发构建后运行 `SETTINGS_CHANNEL=dev npm test`，测试不会生成另一渠道产物。

CI 的 build／dev 共用 `.github/actions/node-build/action.yml`。开发部署通过一次 Gist PATCH 更新全部脚本、配置及订阅；正式发布由版本 tag 触发，发布说明读取 `CHANGELOG.md`。
