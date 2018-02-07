var mongoose = require('mongoose');
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://localhost:27017/Users");
let employee = mongoose.model('Employees',{
    Name:{
        type:String,
        required:true
    },
    Number:{
        type:String,
        required:true
    },
    Email:{
      type:String,
      required:true
    },
    Designation:{
        type:String,
        required:true
    }
});
module.exports={
    employee
};
