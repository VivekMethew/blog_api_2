const { User } = require('../modal/users')
const sharp = require('sharp')
const createError = require('http-errors')
const mongoose = require('mongoose')

module.exports = {
    getAllUsers: async(req, res, next) => {
        try {
            const users = await User.find({}, { __v: 0 })
            if (!users) {
                throw createError(404, 'Users does not exists')
            }
            res.status(200).json({
                success: true,
                user: users
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
    getUser: async(req, res, next) => {
        console.log(req.params.userid)
        try {
            const user = await User.findById(req.params.userid, { __v: 0 })
            if (!user) {
                throw createError(404, 'User does not exists')
            }
            res.status(200).json({
                success: true,
                user: user
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
    createUsers: async(req, res) => {
        const user = new User(req.body)

        await user.save().then(() => {
            console.log(user)
            return res.status(201).send({
                success: false,
                message: 'success',
                user: user
            })
        }).catch((err) => {
            return res.status(500).send({
                success: false,
                message: err.message
            })
        })
    },
    deleteUsers: async(req, res, next) => {
        try {
            const result = await User.findByIdAndDelete(req.params.id)
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
    updateUsers: async(req, res, next) => {
        try {
            const id = req.params.id
            const updates = req.body
            const options = { new: true }
            const update = await User.findByIdAndUpdate(id, updates, options)
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
    },
    uploadProfile: async(req, res) => {
        let timestamp = Date.now()
        await sharp(`./upload/${req.file.filename}`)
            .resize(200, 200, {
                fit: 'contain',
                width: 400,
                height: 400
            })
            .toFile(`upload/resize_file/r${timestamp}.jpg`, (err, info) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: err.message
                    })
                }
                return res.send({
                    success: true,
                    message: 'success',
                    url: `http://localhost:3000/upload/resize_file/r${timestamp}.jpg`,
                    info: info
                })
            })
    },
    test: async(req, res) => {
        res.send(req.query)
    }
}