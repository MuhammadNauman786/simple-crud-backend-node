
const { addProduct, viewProduct, viewProductById, updateProduct, deleteProduct } = require("../controllers/product.controller");
const express = require('express');
const router = express.Router();

// Add a Product
router.post('/', addProduct);

// View all Products
router.get('/', viewProduct);

// View Product By Id
router.get('/viewproduct', viewProductById);

// Update Product
router.put('/updateproduct', updateProduct);

// Delete a Product
router.delete('/:id', deleteProduct);

module.exports = router;