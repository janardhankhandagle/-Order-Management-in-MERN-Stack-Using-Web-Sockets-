const express = require('express');
const router = express.Router();

module.exports = (io) => {
    const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')(io);

    router.get('/', getProducts);
    router.post('/', createProduct);
    router.put('/:id', updateProduct);
    router.delete('/:id', deleteProduct);

    return router;
};
