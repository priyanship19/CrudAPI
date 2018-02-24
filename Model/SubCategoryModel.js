var mongoose = require('../Db/Db');
var Schema = mongoose.Schema;

var SubCaategorySchema = new Schema({

    categoryid:{
        type:mongoose.Schema.Types.ObjectId,
         ref:['Category']
    },
    subcategoryname:{

        type:String,
        required:true
    },
    subcategoryimage:{
        type:String,
        required:true

    }



});
var SubCategory = mongoose.model('SubCategory',SubCaategorySchema);
module.exports = SubCategory;