const Product = require('../models/product.model.js');

// Add Product Function
const addProduct = async function (req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      status: true,
      statusCode: 200,
      data: product,
      message: "Product Successfully Added!"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message
    });
  }
};

// View Product Function
const viewProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.count) || 10; // Default to 10 items per page

  try {
    const skip = (page - 1) * limit; // Calculate skip based on page and limit
    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();


    res.status(200).json({
      status: true,
      statusCode: 200,
      data: products,
      count: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      message: "Product Successfully Fetched!"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message
    });
  }
};

// View Product By Id Function
const viewProductById = async (req, res) => {
  try {

    const { id } = req.query;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: true,
        statusCode: 404,
        message: "Product  Not found"
      });
    }

    res.status(200).json({
      status: true,
      statusCode: 200,
      data: product,
      message: "Product successfully retreived!"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message
    });
  }
};

// Update Product Function
const updateProduct = async (req, res) => {
  try {

    const { id } = req.query;

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({
        status: true,
        statusCode: 404,
        message: "Product  Not found"
      });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json({
      status: true,
      statusCode: 200,
      data: updatedProduct,
      message: "Product successfully updated!"
    });


    //   const { id, name, description } = req.body;
    // res.send(`Name ${id} ${name}, desc ${description}`);
  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message
    });
  }
};

// Delete Product Function
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: true,
        statusCode: 404,
        message: "Product  Not found"
      });
    }

    res.status(200).json({
      status: true,
      statusCode: 200,
      data: product,
      message: "Product has been deleted successfully!"
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message
    });
  }
};

module.exports = {
  addProduct,
  viewProduct,
  viewProductById,
  updateProduct,
  deleteProduct
};