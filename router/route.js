const route =(app) => {


    var userController=require('./../controllers/usercontroller');
      var  todoController=require('./../controllers/toDoController');
      var CategoryController = require('./../controllers/CategoryController');
      var SubCategoryController = require('./../controllers/SubCategoryController');

    app.get('/task',todoController.getAll);
    app.post('/task',userController.loginRequired,todoController.add);

    app.patch('/task/:id',todoController.upd);
    app.delete('/task/:id',todoController.del);
    app.get('/task/:id',todoController.getOne);

    app.post('/task/register',userController.register);
    //app.post('/task/signIn',userController.sign_in);

    app.post('/task/catinsert',CategoryController.add);
    app.get('/display',CategoryController.getAll);
    app.get('/delete/:id',CategoryController.del);


    app.post('/task/subcatinsert',SubCategoryController.add);
    app.get('/select/:id',SubCategoryController.getAll);

};
 module.exports = route;