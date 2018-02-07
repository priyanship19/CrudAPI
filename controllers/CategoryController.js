const mongoose = require('mongoose');
var Category = require('../Model/CategoryModel');


exports.add = (req,res) => {
    var Cat = new  Category({

        categoryname:req.body.categoryname,
        categorydesc:req.body.categorydesc
    });

    Cat.save().then((result) => {

        res.json(result);
    },(error) => {

        res.json(error);
    }).catch((error) =>{

        res.json(error);
    });
}

exports.getAll=(req,res)=>{
    Category.find().then((result)=>{
        console.log(res.json(result));
    },(err)=>{
        res.json(err);
    }).catch((err)=>{
        res.json(err);
    });
}

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};
