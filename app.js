var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  // for json web token
  jwt= require('jsonwebtoken'),
  // for validator
  expressValidator = require('express-validator'),
  // get config
  config=require('./config');
  // for add user model
var User= require('./Models/UserModel');
var Expense=require('./Models/ExpenseModel');
var app = express();
app.set('superSecret',config.secret);
// add database
var db= mongoose.connect(config.database);
// var Book = require('./models/bookModel');
// var Expense= require('./models/ExpenseModel');

var port = process.env.PORT ||  8000;

app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended:true}));
// use morgan to log requests to the console
app.use(morgan('dev'));

app.get('/',function(req,res){
  res.send('welcome to my API');
});

// expenseRouter= require('./Routes/expenseRouter')(Expense);
// bookRouter = require('./Routes/bookRoutes')(Book);
userRouter=require('./Routes/userRoutes')(User,jwt,app);
expenseRouter=require('./Routes/expenseRoutes')(Expense);

// create router
app.use('/api/expenses',expenseRouter);
app.use('/api/users',userRouter);


app.listen(port,function(){
  console.log('Gulp is running on PORT:'+port);
});
