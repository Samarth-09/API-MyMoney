const express = require('express');
const mongoose = require('mongoose');
const student_model = require('./model');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://samarth:samarth009@cluster0.twpsfoj.mongodb.net/?retryWrites=true&w=majority').then(function () {
    const port = process.env.PORT || 3000;
    app.listen(port, () => { console.log(`server started at port:- ${port}`) });
    app.get('/', (req, res) => {
        res.send("Hello World");
    });
    app.get('/read/:username', async (req, res) => {
        const student_data = await student_model.find({ username: req.params.username });
        if (student_data.length == 0) {
            res.json({ msg: "Username is not present" });
            return;
        }
        res.json(student_data);
    });

    app.post('/add/newuser', async (req, res) => {
        const student_data = await student_model.find({username:req.body.username});
        if(student_data.length!=0)
        {
            console.log(student_data);
            res.json({msd: "USername already present"});
            return;
        }
        console.log(student_data);
        const  new_student = new student_model({
            username: req.body.username,
            password: req.body.password,
            Total_balance : req.body.Total_balance,
            spent_money: {},
            Total_money_spent: 0
        });
        await new_student.save();
        res.json({ msg: "New User Created" });
    });
    app.post('/add/money/:username', async (req, res) => {
        const student_data = await student_model.find({ username: req.params.username });
        if (student_data.length == 0) {
            res.json("Username doesnot exist");
            return;
        }
        const new_student = new student_model({
            username: req.params.username,
            password: req.body.password,
            Total_balance: req.body.Total_balance,
            spent_money: req.body.spent_money,
            Total_money_spent: req.body.Total_money_spent
        });
        await student_model.deleteOne({ username: req.body.username });
        await new_student.save();
        res.json(new_student);
    });
});
//https://samarth-09.github.io/API-MyMoney/

//https://lively-undershirt-bat.cyclic.app/