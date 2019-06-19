### 业务场景
经常会有一些相互独立的简单页面开发，当量多的时候，我们就需要一套工程化管理模式来解放我们的双手。

因为每一个独立页面的体量都不大，所以不太可能一个项目对应一套工程。所以我们需要的是一套能管理多个类似项目的模式，实现了一个工程管理多个项目。

### Feature
>* 提供统一项目模板
>* 运行相关指令即可轻松创建项目
>* 运行相关指令即可本地预览开发项目，修改代码时支持实时刷新
>* 区分预发及生产环境打包（生产环境使用cdn）
>* 支持sass

### TODO
- [ ] 支持 vue 项目
- [ ] 支持 react 项目
- [ ] 打包优化（代码分割、公共代码提取）

### 使用方法

#### 新建项目
```shell
$ npm run create projectName
```
运行以上命令后会复制模板项目`template`到src文件夹下，并重命名为projectName。

#### 开发环境
```shell
$ npm run dev projectName
```

#### 预发环境打包
```shell
$ npm run build:yufa projectName
```

#### 生产环境打包
```shell
$ npm run build:prod projectName
```