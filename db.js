const mongoose = require('mongoose');
require('dotenv').config();


const connectionString = process.env.MONGODB_URL;

// Database connection
mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('connected' ,() =>{
    console.log("Data Base is connected..");
});

db.on('error' ,(error) =>{
    console.log("Data Base connection error:", error);
});

db.on('disconnected' ,() =>{
    console.log("Data Base is disConnected..");
});

module.exports = db;