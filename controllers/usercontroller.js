var mongoose = require('./../Db/Db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
//var Detail = mongoose.model('Detail');
var Detail= require('./../Model/UserDetail');



exports.register = function(req, res) {
    var newUser = new Detail(req.body);
    console.log(req.body.password);
    newUser.password = bcrypt.hashSync(req.body.password, 10);

    newUser.save(function(err, user) {
        if (err) {

                return res.status(404).json("Failed" + err);

        } else {
            //user.password = undefined;
            return res.status(200).json("success");
        }
    });
};


exports.sign_in = function(req, res) {
    Detail.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
            }
        }
    });
};

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};
