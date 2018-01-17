# 微信小程序

微信小程序采用 `WePY` 框架,该框架类似 `VUE`,

## 开发环境

- [node(npm)](https://nodejs.org/en/)
- [wepy](https://wepyjs.github.io/wepy/)

## 开发工具

- [webstorm](https://www.jetbrains.com/webstorm/)
- [wept](https://chemzqm.github.io/wept/#/)
- [微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html)

## 运行调试

- 安装 `node`, 可自行到官网下载,或者采用 `nvm` 来安装
- 运行 `./bootstrap.sh` 对工程进行初始化，自动检测安装wepy
- 运行 `npm run dev` 进行编译
- 运行 `cd dist && wept -o` 启动chrome预览工具
- 打开 webstorm 导入工程
- 将 `dist`文件夹中编译生成的代码,配置导入到官方微信开发者工具即可真机部署调试

## 目录结构

```
.
├── README.md
├── app.wpy 启动配置
├── components 公共组件
├── img 图片库
├── index.template.html
├── lib 公用js库
├── mixins 混合
└── pages 页面

```

## WebStorm下代码高亮

```
打开Preferences，搜索Plugins，搜索Vue.js插件并安装。
打开Preferences，搜索File Types，找到Vue.js Template，在Registered Patterns添加*.wpy，即可高亮。
```
