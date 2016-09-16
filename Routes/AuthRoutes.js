var express= require('express'),
path=require('path');
utils = require(path.join(__dirname, "../utils.js"));
var routes = function(User,jwt,app){
  var AuthRoutes = express.Router();
  var UserController=require('../Controllers/UserController')(User,jwt,app);
  // for api routes
  AuthRouter.route('/').post(UserController.auth);
  AuthRouter.route('/generate').get(UserController.setup);

  return AuthRoutes;
};
module.exports= routes;
