var express= require('express');

var routes = function(Expense){
  var ExpenseRouter = express.Router();
  var ExpenseController=require('../Controllers/ExpenseController')(Expense);
  // for api routes
  ExpenseRouter.use(utils.middleware());
  ExpenseRouter.route('/')
    .post(ExpenseController.post)
    .get(ExpenseController.get);

    // implementation middleware
    ExpenseRouter.use('/:expenseId',function(req,res,next){
      var query={};
      Expense.findById(req.params.expenseId,query,function(err,expense){
        if(err){
          res.status(500).json(err);
        }
        else if(expense){
          req.expense=expense;
          next();
        }
        else{
          res.status(404).send('no book found');
        }
      });
    });
    ExpenseRouter.route('/:expenseId')
      .get(function(req,res){
        var returnExpense= req.expense.toJSON();
        if(returnExpense.type==1){
          returnExpense.type_name='daily';
        }
        else if(returnExpense.type==2){
          returnExpense.type_name='monthly';
        }
        else if(returnExpense.type==3){
          returnExpense.type_name='yearly';
        }

        res.json(returnExpense);
        // for filter all
        // var query = req.query;
      })
    .put(function(req,res){
      req.expense.description=req.body.description;
      req.expense.type=req.body.type;
      req.expense.amount=req.body.amount;
      req.expense.save();
      res.status(200).json(req.expense);
    })
    .patch(function(req,res){
      if(req.body._id){
        delete req.body._id;
      }
      for(var p in req.body){
        req.expense[p]=req.body[p];
      }
      req.expense.save(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.json(req.expense);
        }
      });
    })
    .delete(function(req,res){
      req.expense.remove(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(204).send('Remove');
        }
      });
    });
  return ExpenseRouter;
};
module.exports= routes;
