const express =  require('express')
const router =  express.Router()
const upload = require('../middleware/multer')
const adminControl = require('../controllers/admin')
const { ensureAdmin} = require('../middleware/auth')

// RENDERING ADMIN PAGES

router.get('/', ensureAdmin, adminControl.getIndex)
router.get('/create', adminControl.createProductForm)
router.post('/createProduct', upload.single('file'), adminControl.createProduct)

module.exports = router