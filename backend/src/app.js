const express = require('express')
const bodyParser = require('body-parser')  //解析前端传输的数据
const {
  getAllTodo,
  deleteTodo,
  addTodo
} = require('./controller')

const app = express()
app.locals.dataFilePath = "./data.json"
const port = 3002

app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({ extended: false})) 
app.use(express.json())

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,PATCH,OPTIONS");
  next();
});

app.post("/api/add", addTodo)

app.get("/api/getAll", getAllTodo)

app.delete("/api/deleteTodo", deleteTodo) 

app.listen(port, () => console.log(`App listening on port ${port}!`))

exports.app = app
