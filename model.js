const mongoose = require('mongoose');

const student_schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    sem: {
        type: Number,
        required: true
    },
    rollno: {
        type: Number,
        required: true
    },
    marks: {
        type: Map,
        of: Number,
        required: true
    }
});

module.exports = mongoose.model('student', student_schema);