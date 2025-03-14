const Product = require('../models/Product');

const productController = (io) => {
    return {
        async getProducts(req, res) {
            try {
                const products = await Product.find();
                res.json(products);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },

        async createProduct(req, res) {
            try {
                const product = new Product(req.body);
                await product.save();
                io.emit('productUpdated'); 
                res.status(201).json(product);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },

        async updateProduct(req, res) {
            try {
                const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
                io.emit('productUpdated');
                res.json(product);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },

        async deleteProduct(req, res) {
            try {
                await Product.findByIdAndDelete(req.params.id);
                io.emit('productUpdated');
                res.json({ message: 'Product deleted' });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        }
    };
};

module.exports = productController;
