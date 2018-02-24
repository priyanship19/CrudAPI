const mongoose = require('mongoose');
var Category = require('../Model/CategoryModel');
var path = require('path');



exports.add = (req,res) => {

        if (req.files.sample === undefined)
    {
        return res.status(400).send('no file found');
    }


    let file = req.files.sample;


    let uploadpath = path.join(__dirname + "./../upload/" + file.name);
    //console.log(uploadpath);
    file.mv(uploadpath).then((docs) => {
        var c=new Category();
        c.categoryname=req.body.categoryname;
        c.categorydesc = req.body.categorydesc;
        c.categoryimage=file.name;

        c.save().then((docs)=>{
            //console.log(docs);
            res.json("success");
        },(err)=>{
            res.json("0" + err);
        }).catch((err)=>{
            res.json("0" + err);
        });
    },(err)=>{
        console.log("Image upload error" + err);
    });
}


exports.getAll=(req,res)=>{
    Category.find().then((result)=>{

        var newArr = [];
        result.map((val,key) =>{

            var obj = {
                _id:val.id,
                categoryname : val.categoryname,
                categorydesc :val.categorydesc,
                categoryimage:path.join(__dirname,"./../upload/",val.categoryimage)
            }
            newArr.push(obj);
        });

        res.json(newArr);
    },(err)=>{
        res.json(err);
    }).catch((err)=>{
        res.json(err);
    });
}

exports.del=(req,res)=>{
    Category.findByIdAndRemove({_id: req.params.id}).then((result)=>{
        res.json(err);
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
}
