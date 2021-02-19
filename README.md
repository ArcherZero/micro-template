# business-unit-order

订单业务单元

## 需要从父容器获取的数据

```
streamId
permissions
userInfo
storeInfo
storePermissios
```

## 目录结构

.
├── .eslintignore // eslint 忽略规则
├── .eslintrc.js // eslint 配置
├── .gitignore // git 忽略项配置
├── .gitlab-ci.yml // Gitlab CI 自动部署配置
├── babel.config.js // babel 配置
├── public
│   ├── index.html
│   ├── favicon.ico
├── src
│   ├── App.vue
│   ├── api
│   ├── assets // 静态资源
│   ├── components // 共用组件库
│   ├── model
│   │   ├── ApiError.class.js // 接口错误处理
│   │   ├── ApiResponse.class.js // 接口返回结果处理
│   ├── config
│   ├── main.js
│   ├── plugins
│   ├── router
│   ├── store
│   ├── utils
│   └── views // 具体页面
├── .env.dev // 开发环境变量
├── .env.pre // 预发环境变量
├── .env.production // 生产环境变量
├── .env.release // 预发环境变量
├── package.json
├── README.md // 文档
├── vue.config.js
└── yarn.lock