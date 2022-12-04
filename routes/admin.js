const express =  require('express')
const router =  express.Router()
const upload = require('../middleware/multer')
const adminControl = require('../controllers/admin')

// RENDERING ADMIN PAGES

router.get('/', adminControl.getIndex)
router.get('/create', adminControl.createProductForm)
router.post('/createProduct', upload.single('file'), adminControl.createProduct)

module.exports = router