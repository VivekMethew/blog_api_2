const mongoose = require('mongoose');
const Schema = mongoose.Schema


const userShema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

const User = mongoose.model('users', userShema)

module.exports = { User }