var mongoose = require('mongoose');
Schema = mongoose.Schema;

// Data
// 1. Expense Date
// 2. Expense Description
// 3. Expense Type
// 4. Expense Amount
var ExpenseModel = new Schema({
  expense_date: {
    type: Date
  },
  description: {
    type:String
  },
  type: {
    type: Number
  },
  amount: {
    type: Number
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

module.exports = mongoose.model('Expense',ExpenseModel);
