const express = require('express');
const cors = require('cors')
const app = express();
const { createProd, fetchProd } = require("./types");
const data = require("./Prods.json");
const { json } = require('stream/consumers');
const PORT = 3000;
app.use(cors());
app.use(express.json());
let prodID = 2
app.post('/createProd', function (req, res) {
    prodID = prodID + 1;
    try {
        const { productname, productcode, description, releasedate, price, rating, imageurl } = req.body;
        const formtDate = new Date(releasedate);
        const parsedProd = createProd.safeParse({ productid: prodID, productname, productcode, description, releasedate: formtDate, price, rating, imageurl });
        if (!parsedProd.success) {
            res.status(400).json({
                "statusCode": 400,
                "status": "failure",
                "message": "Input data mismatch",
                "data": []
            });
        }
        const RcrdExistence = data.Products.find(p => p.productname === productname);
        if (RcrdExistence) {
            res.status(400).json({
                "statusCode": 400,
                "status": "failure",
                "message": "same product already exists",
                "data": []
            })
        } else {
            data.Products.push({ productid: prodID, productname, productcode, description, releasedate: formtDate.toISOString().split('T')[0], price, rating, imageurl })
        }
        const recordAdded = data.Products.find(p => p.productid === prodID);
        res.status(200).json({
            "statusCode": 200,
            "message": "product data added successfully",
            "status": "success",
            "data": recordAdded
        });
    } catch {
        (err) => {
            res.status(500).json({
                "statusCode": 500,
                "status": "failure",
                "message": "There is some issue at server side" + err,
                "data": []
            })
        }
    }
});


app.get('/getAllProds', function (req, res) {
    const getdata = data.Products
    if (getdata == []) {
        res.status(400).json({
            "statusCode": 400,
            "status": "Failure",
            "message": "no record found",
            "data": []
        })
    }
    res.status(200).json({
        "statusCode": 200,
        "status": "Success",
        "message": "all product data",
        "data": getdata
    });
});

app.get('/getProd/:id', function (req, res) {
    const productid = parseInt(req.params.id);
    const RcrdExistence = data.Products.find(p => p.productid === productid);
    if (RcrdExistence) {
        res.status(200).json({
            "statusCode": 200,
            "status": "Success",
            "message": "product data found",
            "data": RcrdExistence
        })
    } else {
        res.status(400).json({
            "statusCode": 400,
            "status": "Failure",
            "message": "the product doesn’t exist",
            "data": RcrdExistence
        })
    }
});

app.put('/updateProd', function (req, res) {
    const { productid, productname, productcode, description, releasedate, price, rating, imageurl } = req.body;
    const RcrdExistence = data.Products.find(p => p.productid === parseInt(productid));
    if (RcrdExistence) {
        if (productname !== undefined) RcrdExistence.productname = productname;
        if (productcode !== undefined) RcrdExistence.productcode = productcode;
        if (description !== undefined) RcrdExistence.description = description;
        if (releasedate !== undefined) RcrdExistence.releasedate = releasedate;
        if (price !== undefined) RcrdExistence.price = price;
        if (rating !== undefined) RcrdExistence.rating = rating;
        if (imageurl !== undefined) RcrdExistence.imageurl = imageurl;
        res.status(200).json({
            "statusCode": 200,
            "status": "Success",
            "message": "product data updated successfully",
            "data": data.Products
        })
    } else {
        res.status(400).json({
            "statusCode": 400,
            "status": "Failure",
            "message": "the product doesn’t exist",
            "data": RcrdExistence
        })
    }

});

app.get('/deleteProd/:id', function (req, res) {
    const productid = parseInt(req.params.id);
    const RcrdExistence = data.Products.find(p => p.productid === productid);
    if (RcrdExistence) {
        data.Products = data.Products.filter(p => p.productid !== productid);
        RcrdExistenceAfterDelete = data.Products.find(p => p.productid === productid);
        if (!RcrdExistenceAfterDelete) {
            res.status(200).json({
                "statusCode": 200,
                "status": "Success",
                "message": "product data removed successfully",
                "data": data.Products
            })
        }
    } else {
        res.status(400).json({
            "statusCode": 400,
            "status": "Failure",
            "message": "the product doesn’t exist",
            "data": RcrdExistence
        })
    }
});
app.listen(PORT);