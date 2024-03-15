"use strict";

const express = require("express");
const app = express();


app.get('/math/circle/:radius', function (req,res) {
    if (!req.params.radius) {
        res.type("json")
            .status(400) // Bad request
            .send({error:"Radius has not been defined."});
        return;
    }
    let radius = parseFloat(req.params.radius);
    let circumference = 2*radius*Math.PI;
    let area = Math.PI*Math.pow(radius,2);
    res.type("json")
        .status(200) // OK
        .send({circumference, area});
});

app.get('/math/rectangle/:length/:width', function (req,res) {
    if (!req.params.length || !req.params.width) {
        res.type("json")
            .status(400) // Bad request
            .send({error:"Length and width must be defined."});
        return;
    }
    let length = parseFloat(req.params.length);
    let width = parseFloat(req.params.width);
    let perimeter = (2*length)+(2*width);
    let area = length*width;
    res.type("json")
        .status(200) // OK
        .send({area, perimeter});
});

app.get('/math/power/:base/:exponent', function (req,res) {
    try {
        if (!req.params.base || !req.params.exponent) {
            res.type("json")
                .status(400) // Bad request
                .send({error:"Invalid base or exponent. Please provide numeric values."});
            return;
        }
        if (req.query && req.query.root && req.query.root == "true") {
            let base = parseFloat(req.params.base);
            let exponent = parseFloat(req.params.exponent);
            res.type("json")
                .status(200) // OK
                .send({result: Math.pow(base, exponent), root: Math.pow(base, (1 / 2))});
        } else {
            let base = parseFloat(req.params.base);
            let exponent = parseFloat(req.params.exponent);
            res.type("json")
                .status(200) // OK
                .send({result: Math.pow(base, exponent)});
        }
    } catch (err) {
        res.type("json")
            .status(500) // OK
            .send({error:"Something went wrong; please try again."});
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server is running on port '+PORT);
});