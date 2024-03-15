"use strict";

const express = require("express");
const app = express();


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

app.get('/math/rectangle/:length/:width', function (req,res) {
    if (!req.params.length || !req.params.width) {
        res.type("json")
            .status(400) // Bad request
            .send({status:"error",error:"Length and width must be defined."});
        return;
    }
    let length = parseFloat(req.params.length);
    let width = parseFloat(req.params.width);
    let perimeter = (2*length)+(2*width);
    let area = length*width;
    res.type("json")
        .status(200) // OK
        .send({status:"ok", area, perimeter});
});

app.get('/math/power/:base/:exponent', function (req,res) {
    if (!req.params.base || !req.params.exponent) {
        res.type("json")
            .status(400) // Bad request
            .send({status:"error",error:"Base and exponent must be defined."});
        return;
    }
    if (req.query && req.query.root && req.query.root == "true") {
        let base = parseFloat(req.params.base);
        let exponent = parseFloat(req.params.exponent);
        res.type("json")
            .status(200) // OK
            .send({status:"ok", result: Math.pow(base, exponent), root: Math.pow(base, (1 / exponent))}); // Takes inverse because that makes it a root
    } else {
        let base = parseFloat(req.params.base);
        let exponent = parseFloat(req.params.exponent);
        res.type("json")
            .status(200) // OK
            .send({status:"ok", result: Math.pow(base, exponent)});
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server is running on port '+PORT);
});