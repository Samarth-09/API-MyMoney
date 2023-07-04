const mongoose = require('mongoose');

const student_schema = new mongoose.Schema({
    username:{
        type: String,
        unique: true
        //required: true
    },
    password:{
        type: String,
        //required:true
    },
    spent_money:{
        type: Map,
        of: Number,
    },
    Total_balance: Number,
    Total_money_spent: Number

});

module.exports = mongoose.model('user', student_schema);