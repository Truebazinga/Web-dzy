Group 7

## 功能

- 返回所有Todo任务
- 创建一个新的Todo任务
- 删除一个Todo任务
- 数据存储使用简单的文件存储

## 代码结构
    Web-dzy
       |
       |-- backend  // 使用express构建RESTful API和使用supertest的TDD测试
       |
       |-- frontend  // 使用ReactJs构建前端组件
       |
       |-- e2e // 使用Puppeteer进行页面控制，实现端到端测试
       |
       |-- data // 用来存放Task数据
   
## Task文件格式

[{"task":"吃饭","id":0},{"id":1,"task":"dsada"},{"id":2,"task":"打豆豆"}]

## e2e 运行自动化测试

`npm install`
`npm run test`

## 后端TDD测试
`npm install`
`npm test`

## 后端启动
`npm install`
`npm start`

## 前端启动
`启动后端后点击 main.html`
