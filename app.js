require('dotenv').config()
const express = require('express')
const router = require('./routes/routes')
const blogRouter = require('./routes/blogs.router')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const morgan = require('morgan')
const app = express()
const server = require('http').createServer(app)

const port = process.env.PORT || 5000

require('./config/mongoose.connection')()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,token,Accept, Authorization')
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        return res.status(200).json({})
    }
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    next();
});
app.use(morgan('dev'))

app.use(router)
app.use(blogRouter)

app.use((req, res, next) => {
    next(createError(404, "Not Found Route"))
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

server.listen(port, () => {
    console.log('Server running on ', port)
})