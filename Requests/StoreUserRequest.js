module.exports={
  'email': {
     notEmpty: true,
     isEmail: {
       errorMessage: 'Email is Required'
     }
   },
   'password': {
     notEmpty: true,
     errorMessage: 'Password is Required' // Error message for the parameter
   },
   'is_admin':{
     notEmpty: true,
     isBoolean:{
       errorMessage:'Type must boolean',
     }
     errorMessage:'is Admin is required',
   }
}
