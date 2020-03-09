const Product = require('../models/products.model');

exports.test = (req, res) => {
    res.send('Greetings from the Test controller!');
};
exports.product_create = (req, res) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    console.log("products", product);
    product.save((err) => {
        if (err) return next(err)
        res.send('Product Created successfully')
    })
};
exports.product_details = (req, res) => {
    console.log("req.param.id", req.params);
    Product.findById(req.param.id, (err, product) => {
        if (err) return next(err)
        res.send(product)
    })
};
exports.product_update = (req, res) => {
    console.log(req.body);
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }), (err, product) => {
        if (err) return next(err)
        res.send('Product Updated');
    }
};
exports.product_delete = (req, res) => {
    console.log("req.body", req.body);
    Product.findOneAndDelete(req.params.id), (err) => {
        if (err) return next(err)
        res.send("Product Deleted")
    }

}