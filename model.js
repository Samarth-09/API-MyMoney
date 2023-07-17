const mongoose = require('mongoose');

const student_schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,

    },
    spent_money: {
        type: Map,
        of: Number,
    },
    Total_balance: Number,
    Total_money_spent: Number,
    lt: {
        type: Map,
        of: [String],

    }

});


module.exports = mongoose.model('user', student_schema);