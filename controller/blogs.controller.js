const { Blog } = require('../modal/blogs.modal')
const createError = require('http-errors')
const mongoose = require('mongoose')
const uniqid = require('uniqid');

module.exports = {
    blogs: async(req, res, next) => {
        try {
            const blog = await Blog.find({}, { __v: 0 })
            if (!blog) {
                throw createError(404, 'Users does not exists')
            }
            res.status(200).json({
                success: true,
                blog: blog
            })
        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    blog: async(req, res, next) => {
        console.log(req.params.blog_id)
        try {
            const blog = await Blog.findById(req.params.blog_id, { __v: 0 })
            if (!blog) {
                throw createError(404, 'User does not exists')
            }
            res.status(200).json({
                success: true,
                blog: blog
            })
        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'Invalid user id'))
                return
            }
            next(error)
        }
    },
    createBlog: async(req, res, next) => {
        console.log(req.body)
        const blog = new Blog({
            userid: uniqid(),
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            urls: req.body.urls,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        await blog.save().then(() => {
            console.log(blog)
            return res.status(201).send({
                success: false,
                message: 'success',
                blog: blog
            })
        }).catch((error) => {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        })
    },
    deleteBlog: async(req, res, next) => {
        try {
            const result = await Blog.findByIdAndDelete(req.params.blog_id)
            if (!result) {
                throw createError(404, 'Not Found User')
            }
            res.status(200).json({
                success: true,
                result: result
            })
        } catch (error) {
            console.log(error)
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    },
    updateBlog: async(req, res, next) => {
        try {
            const id = req.params.blog_id
            const updates = req.body
            const options = { new: true }
            const update = await Blog.findByIdAndUpdate(id, updates, options)
            if (!update) {
                throw createError(404, 'Not Found')
            }
            res.status(200).json({
                success: true,
                update: update
            })
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(createError(400, 'something wrong'))
                return
            }
            next(error)
        }
    }
}