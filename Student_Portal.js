const express = require('express');
const mongoose = require('mongoose');
const student_model = require('./model');

const app = express();
app.use(express.json());
mongoose.connect('mongodb+srv://samarth:samarth009@cluster0.twpsfoj.mongodb.net/?retryWrites=true&w=majority').then(function () {
    const port = process.env.PORT || 3000;
    app.listen(port, () => { console.log(`server started at port:- ${port}`) });

    app.get('/student/read/:id', async (req, res) => {
        const student_data = await student_model.find({ id: req.params.id });
        if (student_data.length==0) {
            res.json({ msg: "Id is not present" });
            return;
        }
        res.json(student_data);
    });

    app.post('/student/add', async (req, res) => {
        const student_data = await student_model.find({ id: req.body.id });
        if (student_data.length!=0) {
            res.json("Id already exists");
            return;
        }
        const new_student = new student_model({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            sem: req.body.sem,
            dept: req.body.dept,
            rollno: req.body.rollno,
            marks: req.body.marks
        });
        await new_student.save();
        res.json({msg: "Data added"});
    });

    app.put('/student/update/:id', async (req, res) => {
        const student_data = await student_model.find({ id: req.params.id });
        if (student_data.length==0) {
            res.json({ msg: "Id is not present" });
            return;
        }
        await student_model.deleteOne({ id: req.params.id });
        const new_student = new student_model({
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            sem: req.body.sem,
            dept: req.body.dept,
            rollno: req.body.rollno,
            marks: req.body.marks
        });
        await new_student.save();
        res.json({msg: "Data added"});
    });
    
    app.delete('/student/delete/:id', async (req, res) => {
        const student_data = await student_model.find({ id: req.params.id });
        if (student_data.length==0) {
            res.json({ msg: "Id is not present" });
            return;
        }
        await student_model.deleteOne({ id: req.params.id });
        res.json({ msg: 'data deleted' });
    });
});

