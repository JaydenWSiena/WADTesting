"use strict";

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.get('/math/circle/:radius', function (req,res) {
    if (!req.params.radius) {
        res.type("json")
            .status(400) // Bad request
            .send({status:"error",error:"Radius has not been defined."});
        return;
    }
    let radius = parseFloat(req.params.radius);
    let circumference = 2*radius*Math.PI;
    let area = Math.PI*Math.pow(radius,2);
    res.type("json")
        .status(200) // OK
        .send({status:"ok",circumference, area});
});

app.listen(PORT);