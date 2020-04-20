const fs = require("fs")

const {
  asyncReadFile,
  asyncWriteFile
} = require('./dao')

//返回所有todo任务
exports.getAllTodo = (req, res) => fs.readFile(req.app.locals.dataFilePath, "utf-8", (err, data) => {
  if (err) {
    return res.status(500).send()
  }
  res.send(JSON.parse(data))
})

//添加todo任务
exports.addTodo = async (req, res) => {
  const newTodo = req.body
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const todo_list = JSON.parse(file)
  newTodo.id = todo_list.length;
  if (todo_list.filter(v => v.task === newTodo.task).length != 0) {
    res.status(400).send()
  } else {
    todo_list.push(newTodo)
    await asyncWriteFile(JSON.stringify(todo_list), req.app.locals.dataFilePath)
    res.status(201).send(todo_list)
  }
}

//删除
exports.deleteTodo = async (req, res) => {
  const index = req.body.index  //index接收前端传输的数据
  const id = req.params.id  ////id用于测试
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const todo_list = JSON.parse(file)
  const newTodo = []
  var count = 0
  if(id<todo_list.length){
    for(var i=0; i<todo_list.length; i++){
      if(todo_list[i].id != id && id){
        newTodo.push({"id":count,"task":todo_list[i].task})
        count++
      }
    }
  }else if(id){
    console.log('输入索引超出todoList长度')
  }
  count = 0
  for(var i=0; i<todo_list.length; i++){
    if(todo_list[i].id != index && index){
      newTodo.push({"id":count,"task":todo_list[i].task})
      count++
    }
  }
  if (newTodo.length === todo_list.length) {
    res.status(404).send()
  } else {
    await asyncWriteFile(JSON.stringify(newTodo), req.app.locals.dataFilePath)
    res.send(204).send()
  }
}

//修改
exports.updateTodo = async (req, res) => {
  const index = req.body.index //index接收前端传输的数据
  const id = req.params.id  //id用于测试
  const task = req.body.task
  console.log(req.body)
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const todo_list = JSON.parse(file)
  const change = JSON.parse(await asyncReadFile("./change.json"))
  if(index){
    todo_list[index].task = task
  }else if(id){
    if(id < todo_list.length){
      todo_list[id].task = task
    }else{
      console.log("输入索引超出todoList长度")
    }
  }
  if (index && todo_list[index].task != task) {
    res.status(404).send()
  } else if(id && todo_list[id].task != task){
    res.status(404).send()
  }else {
    await asyncWriteFile(JSON.stringify(todo_list), req.app.locals.dataFilePath)
    res.send(204).send()
  }
}