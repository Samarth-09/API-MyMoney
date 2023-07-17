const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
const test_schemma = new mongoose.Schema({
    name: String,
    cpi: Number
});

const test_model=mongoose.model('testing', test_schemma);

mongoose.connect('mongodb+srv://samarth:samarth009@cluster0.twpsfoj.mongodb.net/?retryWrites=true&w=majority').then(function () {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> {
        console.log(port);
        
    })
    app.post('/test/add', async (req, res)=> {
        const t = new test_model({
            name: req.body.name,
            cpi:req.body.cpi
        });
        console.log(t);
        await t.save();
        const x = await test_model.find({name: req.body.name});
        res.json(x[0].toString());
    })
});
