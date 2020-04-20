const {
    app
  } = require('../src/app');
  const {
    asyncReadFile,
    asyncWriteFile
  } = require('../src/dao')
  const request = require('supertest');
  
  describe("app", () => {
    describe("get request", () => {
      it("should get all tasks when request url pattern is '/api/getAll'", (done) => {
        app.locals.dataFilePath = "./test/fixture.json"
        request(app).get('/api/getAll').expect(200).expect([
          {"id":0,"task":"睡觉"},
          {"id":1,"task":"睡觉"}
      ]).end((err, res) => {
          if (err) throw err;
          done()
        })
      })
  

    })
  
    describe("post request", () => {
      afterEach(async function () {
        await asyncWriteFile(JSON.stringify([
          {"id":0,"task":"睡觉"},
          {"id":1,"task":"睡觉"}
      ]), "./test/fixture.json")
      })
  
      it("should create a task ", (done) => {
        request(app).post('/api/add').send({
          "id":2,"task":"tdd"
        }).expect(201).expect([
          {"id":0,"task":"睡觉"},
        {"id":1,"task":"睡觉"},
        {"id":2,"task":"sleep"}
        ]).end((err, res) => {
          if (err) throw err;
          done()
        })
      })

    })

    describe("delete request", () => {
      afterEach(async function () {
        await asyncWriteFile(JSON.stringify([
          {"id":0,"task":"睡觉"},
          {"id":1,"task":"睡觉"}
      ]), "./test/fixture.json")
    
    
      })
      it("should delete task and return 204", (done) => {
        request(app).delete('/api/delete/0').expect(204).end((err, res) => {
          if (err) throw err;
          done()
        })
      })


      
  })
}) 