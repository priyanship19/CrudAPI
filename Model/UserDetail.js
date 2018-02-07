var mongoose = require('mongoose');
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://localhost:27017/Detail");
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var Userschema = new Schema({

    fullname:{

        type:String,
        required:true,
        trim:true
    },
    email:{


        type:String,
        unique:true,
        lowercase:true,
        required:true,
        trim:true
    },
    password:{

        type:String,
        required:true

    },
    created:{

        type:Date,
        default:Date.now
    },
token:{

        type:String

}
});


Userschema.methods.comparePassword = function(password){

    return bcrypt.compareSync(password,this.password);
};
var Detail=mongoose.model('Detail',Userschema);
module.exports=Detail;