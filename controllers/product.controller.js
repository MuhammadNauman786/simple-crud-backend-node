const Product = require('../models/product.model.js');

// Add Product Function
const addProduct = async function (req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

  // View Product Function
  const viewProduct = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

  // View Product By Id Function
  const viewProductById = async (req, res) => {
    try {
  
      const {id} = req.params;
      const product = await Product.findById(id);

      if(!product){
        return res.status(404).json({message: "Product not found"});
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

  // Update Product Function
  const updateProduct = async(req, res) => {
    try {
  
      const {id} = req.params;
  
      const product = await Product.findByIdAndUpdate(id, req.body);
  
      if(!product){
        return res.status(404).json({message: "Product Not found"});
      }
  
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
  
  
    //   const { id, name, description } = req.body;
    // res.send(`Name ${id} ${name}, desc ${description}`);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

// Delete Product Function
  const deleteProduct = async (req, res) => {
    try {
      const {id} = req.params;
  
      const product = await Product.findByIdAndDelete(id);
  
      if(!product){
        return res.status(404).json({message: "Product Not found"});
      }
  
      res.status(200).json({message: "Product has been deleted successfully!"});
  
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

  module.exports = {
    addProduct,
    viewProduct,
    viewProductById,
    updateProduct,
    deleteProduct
  };