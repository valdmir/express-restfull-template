var express= require('express'),
path=require('path');
utils = require(path.join(__dirname, "../utils.js"));
var routes = function(User,jwt,app){
  var UserRouter = express.Router();
  var UserController=require('../Controllers/UserController')(User,jwt,app);
  // for api routes
  UserRouter.route('/auth').post(UserController.auth);
  // route middleware to verify a token
  UserRouter.use(utils.middleware());
  UserRouter.route('/').get(UserController.get);
  UserRouter.route('/setup').get(UserController.setup);

  return UserRouter;
};
module.exports= routes;
