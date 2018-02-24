const mongoose = require('mongoose');
var SubCategory = require('../Model/SubCategoryModel');
var path = require('path');

exports.add = (req,res) => {

    if (req.files.sample === undefined) {
        return res.status(400).send("No File Found");
    }
    let file = req.files.sample;

    let uploadpath = path.join(__dirname + "./../subupload/" + file.name);
    console.log(uploadpath);
    file.mv(uploadpath).then((result) => {

        var sub = new SubCategory();
        sub.categoryid = req.body.categoryid;
        sub.subcategoryname = req.body.subcategoryname;
        sub.subcategoryimage = file.name;

        sub.save().then((result) => {
            console.log(result);2
            res.json("success");
        }, (err) => {
            res.json("failed");
        }).catch((err) => {

            res.json("Error" + err);
        })
    }, (err) => {

        console.log("Image Uploaded Error" + err);
    });

}
/*exports.getAll = (req,res)=>{

    var que = req.query;
    var catid=que.id
    SubCategory.find({categoryid:catid}).then((result) => {

        var newArr = [];
        result.map((val,key) => {


            var obj =  {

                _id : val.id,
                subcategoryname : val.subcategoryname,
                subcategoryimage :path.join(__dirname,"./../subupload/" ,val.subcategoryimage),
            }

            newArr.push(obj);
        });
        console.log(res.json(newArr));

    },(err) => {

        res.json("failed" + err);
    }).catch((err) => {

        res.json(err);
    });
}*/
exports.getAll = (req,res)=>{

    var que = req.params;
    var catid=que.id
    SubCategory.find({categoryid:catid}).populate('categoryid',['categoryname']).then((result) => {

        var newArr = [];
        result.map((val,key) => {


            var obj =  {

                _id : val.id,
                subcategoryname : val.subcategoryname,
                subcategoryimage :path.join(__dirname,"./../subupload/" ,val.subcategoryimage),
            }

            newArr.push(obj);
        });

        res.send(newArr);

        },(err) => {

        res.json("failed" + err);
    }).catch((err)=>{
        res.send(err);
    })


}



