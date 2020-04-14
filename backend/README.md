group 7

## 功能

- 返回所有Todo任务
- 创建一个新的Todo任务
- 返回一个指定ID的Todo任务
- 删除一个Todo任务
- 数据存储使用简单的文件存储

## 代码结构
    Web-dzy
       |
       |-- backend  // 使用SpringBoot构建RESTful API
       |
       |-- frontend  // 使用ReactJs构建前端组件
       |
       |-- e2e // 使用Puppeteer进行页面控制，实现端到端测试
       |
       |-- data // 用来存放Task数据
   
## Task文件格式

    {
      "id": 1,
      "content": "Restful API homework",
      "updatedTime": "2019-05-15 00:00:00"
    }

