const User = require('../models/user.model');
const {generateToken} = require('../jwt.js');

// Add User Function
const addUser = async function (req, res) {
    // if(!req.file)res.status(200).json({
    //   status: true,
    //   statusCode: 200,
    //   message: "New user has been successfully create!"
    // });


    try {
        var user = await User.create(req.body);
        const token = generateToken(user.id);
        // user.token = token;

        if (req.file) {
          user = await User.findByIdAndUpdate(user.id, {profileImage: process.env.BASE_URL+req.file.path});
        }

      res.status(200).json({
        status: true,
        statusCode: 200,
        data: user,
        token: token,
        message: "New user has been successfully create!"
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: error.message
    });
    }
  };

  // login User Function
const loginUser = async function (req, res) {
    try {

        const { email } = req.query;

      const user = await User.findOne({email});

      if(!user){
        return res.status(404).json({
          status: true,
          statusCode: 404,
          message: "User  Not found"
        });
      }

    const token = generateToken(user.id);

    // user.token = token;

      res.status(200).json({
        status: true,
        statusCode: 200,
        data: user,
        token: token,
        message: "User has been successfully logged in!"
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: error.message
    });
    }
  };

  // View User profile Function
  const viewUserProfile = async (req, res) => {
    try {
  
      const userData= req.user;
      const user = await User.findById(userData.data);

      if(!user){
        return res.status(404).json({
          status: true,
          statusCode: 404,
          message: "User  Not found"
        });
      }

      res.status(200).json({
        status: true,
        statusCode: 200,
        data: user,
        message: "User successfully retreived!"
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        statusCode: 500,
        message: error.message
    });
    }
  };

// Update User Function
const updateUser = async(req, res) => {
    try {
  
      const {id} = req.query;
  
      const user = await User.findByIdAndUpdate(id, req.body);

      if (req.file) {
        await User.findByIdAndUpdate(id, {profileImage: process.env.BASE_URL+req.file.path});
      }

      if(!user){
        return res.status(404).json({
          status: true,
          statusCode: 404,
          message: "User  Not found"
        });
      }
  
      const updatedUser = await User.findById(id);
      res.status(200).json({
        status: true,
        statusCode: 200,
        data: updatedUser,
        message: "User successfully updated!"
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

// Delete User Function
  const deleteUser = async (req, res) => {
    try {
      const {id} = req.params;
  
      const user = await User.findByIdAndDelete(id);
  
      if(!user){
        return res.status(404).json({
          status: true,
          statusCode: 404,
          message: "User  Not found"
        });
      }
  
      res.status(200).json({
        status: true,
        statusCode: 200,
        data: product,
        message: "User has been deleted successfully!"
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
    addUser,
    loginUser,
    viewUserProfile,
    updateUser,
    deleteUser
  };