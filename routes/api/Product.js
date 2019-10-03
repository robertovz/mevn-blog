const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");

router.get("/product", (req, res) => {
    Product.findAll()
    .then(product => {
        res.json(product)
    })
    .catch(err => {
        res.send("Error: w" + err)
    })
})

router.post("/product", (req, res) => {
    const today = new Date();
    const productData = {
        name : req.body.name,
        type : req.body.type,
        time : req.body.time,
        people : req.body.people,
        image : req.body.image,
        number : req.body.number,
        created : today
    }

        productData.image = encodeUriComponent(productData.image.split(',')[1]);
        console.log(productData.image);

        require('fs').writeFile('w.jpeg', productData.image, 'base64', function(err) {
            console.log(err);
        });
    if(!req.body.name) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {


        Product.create(productData)
        .then((product) => {
    
            res.send("Product added")
        })
        .catch(err => {
            res.send("Error: "+ err)
        })
    }
})

router.delete("/product/:id", (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.send("Product Deleted!")
    })
    .catch(err => {
        res.send("Error: " + err)
    })
})

router.put("/product/:id", (req, res) => {
    if(!req.body.name) {
        res.status(400)
        res.json({
            error: "Error"
        })
    } else {
        Product.update(
            { name: req.body.name },
            { where: { id: req.params.id } }
        )
        .then(() => {
            res.send("Product Updated!")
        })
        .catch(err => {
            res.send("Error: " + err)
        })
    }
})

module.exports = router