const mongoose = require('mongoose');
const Schema = mongoose.Schema


const blogShema = new Schema({
    userid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    urls: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: String,
        required: true,
    }
})

const Blog = mongoose.model('blog', blogShema)

module.exports = { Blog }