const {jwtAuthMiddleWare} = require('../jwt.js');
const {addUser, updateUser, deleteUser, viewUserProfile, loginUser} = require('../controllers/user.controller.js');

const express = require('express');
const router = express.Router();

// SignUp a User
router.post('/signup', addUser);

// Login a User
router.get('/login', loginUser);

// View User Profile
router.get('/', jwtAuthMiddleWare ,viewUserProfile);

// Update User
router.put('/:id', jwtAuthMiddleWare ,updateUser);
  
// Delete a User
router.delete('/:id', jwtAuthMiddleWare ,deleteUser);

  module.exports = router;