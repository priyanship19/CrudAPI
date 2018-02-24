var express = require('express');
var mongoose = require('./../Db/Db')
var bodyparser = require('body-parser') ;
/*var {user} = require('../Model/UserModel');*/
var FileUpload = require('express-fileupload');
//var {employee} = require('../Model/EmployeeModel');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var Detail= require('../Model/UserDetail');

//var Detail=mongoose.model('Detail');
var todo =  require('../Model/toDoList');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var route = require('../router/route');
//var port = process.env.PORT || 3000;


global.Token = "1"
var app=express();
app.use(FileUpload());
app.use(passport.initialize());
app.use(bodyparser.json());
//Passport Authentication
passport.serializeUser((user, done) => {
    done(null, user);
});

// deserialize user object
passport.deserializeUser((user, done) => {
    done(null, user);
});



app.get("/",(req,res)=>{
    res.status(404).json({result: 'failed'});
    //console.log("failed");
});


app.get("/success",(req,res)=>{
    res.status(200).json(Token);
    //console.log('success');
});

app.post("/users",(req,res)=>{

    var user1 = new user({
        email:req.body.email,
        password:req.body.password
    });
    user1.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.send(err);
    })

});

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
    },
    function (username,password,done) {

        console.log(username);
        console.log(password);

        Detail.findOne({email:username}).then((user1)=>{
            console.log(user1);
            if(!user1){
                return done(null,false);
            }
            else{
                console.log("In If: " + password + " " + user1.password);
                 if (!bcrypt.compareSync(password,user1.password)) {
                //res.status(401).json({ message: 'Authentication failed. Wrong password.' });
                return(done(null,false));
            } else {
                //return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
                     var token=jwt.sign({ email: Detail.email, fullName: Detail.fullName, _id: Detail._id}, 'RESTFULAPIs');
                     Detail.findOneAndUpdate({email:username,password:user1.password},{
                         $set:{
                             token: token
                         }
                     }).then((usr)=>{
                         Token  = token;
                         console.log(token);
                         return(done(null,true));
                     });
            }
            }

        }).catch((err)=>{
            console.log(err);
        })
    }
));

//Google Strategy

passport.use(new GoogleStrategy({
        clientID: '876136464474-ll2tskvqvt40g8l0s925fqiao0ghmkku.apps.googleusercontent.com',
        clientSecret: 'JmmhJMXHrCRWfhAZK1IkqEhG',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {

        var newUser = user({email:profile.id,password:profile.displayName});
        newUser.save().then((user)=>{
            console.log(user);
            if(!user){
                return done(null,false);
            }
            return done(null,user);
        })
    }
));
app.get('/auth/google',
    passport.authenticate('google',{ scope: ['profile']}));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/',successRedirect:'/success' }),
    function(req, res) {
        res.redirect('/');
    });

//Facebook Strategy
passport.use(new FacebookStrategy({
        clientID: ' 1795193140501575',
        clientSecret:'2a166aca5988c12970f4070e65a54386',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {

    var newUser = user({email:profile.email[0].value,password:profile.displayName})
        newUser.save().then((err,user) => {

            if(!user)
            {

                return done(null,false);
            }
            return done(null,user);

        });
    }
));


app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/',successRedirect:'/success'}),
    function(req, res) {
        res.redirect('/');
    });

//local
app.post('/signin',passport.authenticate('local',{

    successRedirect:'/success',
    failureRedirect:'/'


}))



//Employee Table
app.post("/employee",(req,res)=>{

    var employee = new employee



})
/*app.use(function(req,res,next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.authorizaton.split(' ')[1], 'RESTFULAPIs', function (err, decode) {

            if (err) req.user = undefined;
            req.user = decode;
            next();

        });
    }
    else {

        req.user = undefined;
        next();

    }
});*/
route(app);
app.listen(3000,()=>{
console.log("Port started");
});
