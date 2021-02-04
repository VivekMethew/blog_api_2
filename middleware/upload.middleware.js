const multer = require('multer')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload')
    },
    filename: function(req, file, cb) {
        cb(null, 'img' + '-' + Date.now() + '.jpg')
    }
})

module.exports = {
    upload: multer({ storage: storage })
}