const mongoose=require('mongoose');
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://localhost:27017/todoList");
var Schema=new mongoose.Schema({
    task:{
        type: String
    },
    completed:{
        type: Boolean
    }
});

var todoList=mongoose.model('todoList',Schema);

module.exports=todoList;