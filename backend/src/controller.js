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
  const task = parseInt(req.body.task)
  const file = await asyncReadFile(req.app.locals.dataFilePath)
  const todo_list = JSON.parse(file)
  const newTodo = todo_list.filter(v => v.task !== task)
  if (newTodo.length === todo_list.length) {
    res.status(404).send()
  } else {
    await asyncWriteFile(JSON.stringify(newTodo), req.app.locals.dataFilePath)
    res.send(204).send()
  }
}
