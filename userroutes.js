const route= function(app){

    var userHandlers = require('./controllers/usercontroller.js');


    app.route('/auth/register')
        .post(userHandlers.register);

    app.route('/auth/signin')
        .post(userHandlers.sign_in);
    app.route('/auth/loginRequired')
        .post(userHandlers.loginRequired);
}

module.exports={route};