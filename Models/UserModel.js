var mongoose = require('mongoose');
Schema = mongoose.Schema;

// Data
// 1. User Email
// 2. User Name
// 3. User Password
// 4. User is_admin
// 5. User created_at
// 6. User updated_at
var UserModel = new Schema({
  email:{
    type:String
  },
  name: {
    type: String
  },
  password:{
    type:String
  },
  is_admin:{
    type:Boolean
  },
  created_at:{
    type:Date,
    default:Date.now
  },
  updated_at:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('User',UserModel);
