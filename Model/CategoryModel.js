var mongoose = require('./../Db/Db');
var Schema = mongoose.Schema;
var CategorySchema = new Schema({

    categoryname:{

        type:String,
        //required:true
    },
    categorydesc:{

        type:String,
        //required:true
    },

    categoryimage:{

        type:String,
        //required:true
    }
});
CategorySchema.pre('save', function(next) {

        console.log('calling next!');

    console.log('pooiuouiuoiouoiuiouoiuoiuiouuuuuuuuuuuuppppppjkbhjklxdhkfjxhdfkljdhgkjhfjklghdjklfghdkljghdkljgkdjgdkjgfkdjgfkdjfhgkdjfhgkjdgfkdjgfkdjfhgjkdhafter next');

    next();
});

var Category =  mongoose.model('Category',CategorySchema);
module.exports = Category;