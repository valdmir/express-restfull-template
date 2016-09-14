module.exports={
  'expense_date': {
     notEmpty: true,
     optional:true,
     isDate:{
       errorMessage: 'Expense Date is must in format YYYY-MM-DD'
     },
     errorMessage: 'Expense Date is Required'

   },
   'description': {
     notEmpty: true,
     optional:true,
     isLength: {
       options: [{ min: 20 }],
       errorMessage: 'Description with minimal 20 characters' // Error message for the validator, takes precedent over parameter message
     },
     errorMessage: 'Description is Required' // Error message for the parameter
   },
   'type': {
     notEmpty: true,
     optional:true,
     errorMessage: 'Type is Required' // Error message for the parameter
   },
   'amount': {
     notEmpty: true,
     optional:true,
     isFloat:{
       errorMessage:'Amount must Number'
     },
     errorMessage: 'Amount is Required' // Error message for the parameter
   },
}
