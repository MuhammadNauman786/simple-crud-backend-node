const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    mobile: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: [true, 'Duplicate email entry']
    }


});



const User = mongoose.model("User", userSchema);

module.exports = User;