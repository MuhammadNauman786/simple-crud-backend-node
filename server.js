const express = require('express')
const db = require('./db.js');
const app = express()
const productRoute = require('./routes/product.route.js');
const userRoute = require('./routes/user.route.js');
const {jwtAuthMiddleWare} = require('./jwt.js');
require('dotenv').config();
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;

// Midleware
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// passport.use(new localStrategy(async (username, passport, done) => {
  
// }));



// Routes
app.use('/public', express.static('public'));
app.use('/api/v1/products', jwtAuthMiddleWare ,productRoute);
app.use('/api/v1/user', userRoute);


app.get('/', function (_req, res) {
  res.send("simple-crud-backend-node \n A Simple project of CRUD operations of mongo DB with Node.js products.");
});

const PORT = process.env.PORT || 3000 ;

db.addListener("connected", () => {
  app.listen(PORT , () => {
    console.log("I am listening from server..port ");
  });
});


