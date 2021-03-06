// import { updateTodo } from "../../backend/src/controller";
(function() {
    // var i; /*index*/

    /*为每个li后面加上关闭按钮*/
    function closeBtn(element) {
      // var myNodelist = document.getElementsByTagName("li");
      // for (i = 0; i < myNodelist.length; i++) {
      var span = document.createElement("span");
      var txt = document.createTextNode("\u00D7"); /*unicode代码*/
      span.className = "close";
      span.appendChild(txt);
      span.onclick = function(){
        var div = this.parentElement;
        // console.log(div.getAttribute("index"));
        deleteElement(div.getAttribute("index"));
        
        div.style.display = "none";
      }
      element.appendChild(span);
      // element.index = i;
        // myNodelist[i].onclick = function() {
        //   deleteElement(this.index);
        // }
      // }
    }


    //删除元素
    function deleteElement(index) {
      $.ajax({
        type: "DELETE",
        url: "http://localhost:3001/api/delete",
        async: false,  //同步传输
        data: {index: index}, //返回删除task的序号
        dataType: "json",
        success: function(res){
        },
        error: function (res) {
          
        }
      });
    }

    function updateElement(index, new_name){
      // console.log(index);
      $.ajax({
        type:"POST",
        url:"http://localhost:3001/api/update",
        async:false,
        data:{id:index, task:new_name},
        dataType:"json",
        success:function(res){

        },
        error:function(res){
          alert('已存在相同任务名');
        }
      });
    }
    /*点击li的时候，加上.checked，再点击则取消*/
    function ifModify() {
      var list = document.querySelector('ul');
      list.onclick = function(ev) {
        if (ev.target.tagName === 'LI') {
          var txt = prompt("请输入修改内容");
          while (txt===""){
            txt = prompt("请重新输入");
          }
          ev.target.innerHTML = txt;
          updateElement(ev.target.getAttribute("index"), txt);
          closeBtn(ev.target);
          // closeBtn(ev.target);

          // ev.target.classList.toggle('checked');
        }
      }
    }

    /*点击添加时，创建一个新的ul*/
    function newElement() {
      var inputValue = document.getElementById("myInput").value;
      if (inputValue == '') {
        alert("请先输入一个具体任务。");
      }
      else {
        var flag;
        var li = document.createElement("li");
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        $.ajax({
            type: "POST",
            url: "http://localhost:3001/api/add",
            async: false,  //同步传输
            data: {task: inputValue}, /*传给后端的数据*/
            dataType: "json",	/*后端返回的数据格式json*/
            success: function(res){
              flag = true;
              document.getElementById("myInput").value = "";
            },
            error: function (res) {
              alert("请输入不同的任务名");
              flag = false;
            }
        });
        if (flag ===true){
          $.ajax({
            type: "GET",
            url: "http://localhost:3001/api/getAll",
            async: false,  //同步传输
            dataType: "json",	/*后端返回的数据格式json*/
            success: function(res){
              todoList = res;
            },
            error: function (res) {
            }
          });
          for (var i=0;i<todoList.length;++i){
            if (todoList[i].task === inputValue){
              new_id = todoList[i].id;
            }
          }
          li.setAttribute("index", new_id);
          closeBtn(li);
          document.getElementById("myUL").appendChild(li);
        }
      }
      // document.getElementById("myInput").value = ""; /*清空输入*/
    }

    //返回所有Todo任务
    function getAllTask() {
      var todoList = [];
      $.ajax({
        type: "GET",
        url: "http://localhost:3001/api/getAll",
        async: false,  //同步传输
        dataType: "json",	/*后端返回的数据格式json*/
        success: function(res){
          todoList = res;
        },
        error: function (res) {
        }
      });
      for(var i=0; i<todoList.length; i++){
        var li = document.createElement("li");
        var t = document.createTextNode(todoList[i].task);
        li.appendChild(t);
        li.setAttribute('index',todoList[i].id);
        // li.index = todoList[i].id;
        closeBtn(li);
        document.getElementById("myUL").appendChild(li);
      }
      document.getElementById("myInput").value = ""; /*清空输入*/
    }


    function init() {
      var inp = document.getElementsByTagName("input")[0];
      
      inp.onfocus = function(){
        // this.style.border = "1px solid red";
        this.placeholder = "";
        this.style.backgroundColor = "#ccc";

      }
      inp.onblur = function(){
        this.placeholder = "input here";
        this.style.backgroundColor = "";
      }
      var addButton = document.getElementById("addButton");
      getAllTask();
      // var myNodelist = document.getElementsByTagName("li");
      // for (var i=0;i<myNodelist.length;++i){
      //   closeBtn(myNodelist[i]);
      // }
      // closeElement();
      ifModify();

      /*添加按钮点击时执行*/
      addButton.onclick = function() {
        newElement();
        // initList();
      }

      /*按回车时亦执行*/
      document.onkeydown = function(event) {
        if(event.keyCode == 13) {
          newElement();
          // initList();
        }
      }
    }

    init();

  })();