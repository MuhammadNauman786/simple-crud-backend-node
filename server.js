const express = require('express')
const db = require('./db.js');
const app = express()
const productRoute = require('./routes/product.route.js');
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
app.use('/api/products', productRoute);


app.get('/', function (_req, res) {
  res.send('Hello World Oye...');
});

const PORT = process.env.PORT || 3000 ;

db.addListener("connected", () => {
  app.listen(PORT , () => {
    console.log("I am listening from server..port 3000");
  });
});


