var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var CategorySchema = new Schema({

    categoryname:{

        type:String,
        required:true
    },
    categorydesc:{

        type:String,
        required:true
    }


});

var Category =  mongoose.model('Category',CategorySchema);
module.exports = Category;