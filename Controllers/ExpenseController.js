// Name Controller
request=require('../Requests/StoreExpenseRequest');
var ExpenseController = function(Expense){
  // type post
  var post= function(req,res){
    req.checkBody(request);
    var errors=req.validationErrors();
    if(errors){
      res.json(errors);

    }
    else{
      var expense = new Expense(req.body);
      console.log(expense);
      expense.save();
      res.status(201).json(expense);
    }


  };
  // type get
  var get = function(req,res){
    // for filter all
    Expense.find(req.body,function(err,expenses){
      if(err){
        console.log(err);
        res.status(500).json(err);

      }
      else{
        console.log(expenses);
        var returnExpenses=[];
        expenses.forEach(function(element,index,array){
          var newExpenses=element.toJSON();
          if(newExpenses.type==1){
            newExpenses.type_name='daily';
          }
          else if(newExpenses.type==2){
            newExpenses.type_name='monthly';
          }
          else if(newExpenses.type==3){
            newExpenses.type_name='yearly';
          }
          return returnExpenses.push(newExpenses);
        });
        res.json(returnExpenses);
        // res.status(200).json(books);
      }
    });
    // var responseJson={hello: 'This is my api'};
    // res.json(responseJson,200); deprecated

  };
  return {
    post :post,
    get : get
  };
};
module.exports= ExpenseController;
