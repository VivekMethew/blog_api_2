const express = require('express')
const router = express.Router()

// Controllers
const blogsController = require('../controller/blogs.controller')


// Get All blogs
router.get('/blogs', blogsController.blogs)

// Get blog
router.get('/blogs/:blog_id', blogsController.blog)

// Create new blog
router.post('/blogs', blogsController.createBlog)

// update blog
router.patch('/blogs/:blog_id', blogsController.updateBlog)

// delete blog
router.delete('/blogs/:blog_id', blogsController.deleteBlog)

module.exports = router