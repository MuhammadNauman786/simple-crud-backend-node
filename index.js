const express = require('express')
const mongoose = require('mongoose');
const app = express()
const productRoute = require('./routes/product.route.js');

// Midleware
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.)

// Routes
app.use('/api/products', productRoute);


app.get('/', function (_req, res) {
  res.send('Hello World Oye...');
});


mongoose.connect('mongodb+srv://mnomi00000:EZi9nKe42jDhcek5@backenddb.mwf5s5g.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
  console.log("Data Base is connected..");
  app.listen(3000 , () => {
    console.log("I am listening from server..port 3000");
});
})
.catch(()=>{
  console.log("Data Base could not connect..");
});