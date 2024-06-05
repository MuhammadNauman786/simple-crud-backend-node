const { jwtAuthMiddleWare } = require('../jwt.js');
const { addUser, updateUser, deleteUser, viewUserProfile, loginUser } = require('../controllers/user.controller.js');
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Directory where files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Initialize upload variable using the storage engine
const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const fs = require('fs');
const dir = './public';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  const dirUpload = './public/uploads';
  if (!fs.existsSync(dirUpload)) {
    fs.mkdirSync(dirUpload);

  }
}

// SignUp a User
router.post('/signup', upload.single('profileImage'), addUser);

// Login a User
router.get('/login', loginUser);

// View User Profile
router.get('/', jwtAuthMiddleWare, viewUserProfile);

// Update User
router.put('/updateprofile', jwtAuthMiddleWare, upload.single('profileImage'), updateUser);

// Delete a User
router.delete('/:id', jwtAuthMiddleWare, deleteUser);

module.exports = router;