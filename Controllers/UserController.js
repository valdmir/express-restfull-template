// Name Controller
jwt= require('jsonwebtoken');
requestAuthenticate=require('../Requests/AuthenticateRequest');
requestStore=require('../Requests/StoreUserRequest');
var UserController = function(User,jwt,app){
  // type post
  var post= function(req,res){
    req.checkBody(requestStore);
    var errors=req.validationErrors();
    if(errors){
      res.json(errors);
    }
    else{
      var user = new User(req.body);
      console.log(user);
      user.save();
      res.status(201).json(user);
    }

  };
  var setup= function(req,res){
    // var user = new User(req.body);
    var user = new User({
      email:'testing@testing.com',
      name: 'Nick Cerminara',
      password: 'testing123',
      is_admin: true
    });

    console.log(user);
    user.save(function(err){
      if(err) throw err;
      res.status(201).json(user);
    });
  };
  var get= function(req,res){
    var query={};
    // if(req.query.title){
    //   query.title= req.query.title;
    // }
    User.find(query,function(err,users){
      if(err){
        console.log(err);
        res.status(500).json(err);

      }
      else{
        console.log(users);
        var returnUsers=[];
        // create custom data
        users.forEach(function(element,index,array){
          var newUser=element.toJSON();
          return returnUsers.push(newUser);
        });
        res.json(returnUsers);
        // res.status(200).json(books);
      }
    });
  };
  var auth= function(req,res){
    var query={};
    req.checkBody(requestAuthenticate);
    var errors=req.validationErrors();
    if(errors){
      res.json(errors);

    }
    else{
      if(req.body.email){
        query.email=req.body.email;
      }
      if(req.body.password){
        query.password=req.body.password;
      }
      User.findOne(query,function(err,user){
        if(err) throw err;
        if(user){
          console.log(user);
          //   // if user is found and password is right
          //   // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresIn : 60*60*24
          });
          //   // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        }
        else{
          res.json({ success: false, message: 'Authentication failed.' });
        }
      });
    }
  }
  // for showing
  return {
    setup :setup,
    get:get,
    post:post,
    auth:auth,
  };

}
module.exports= UserController;
