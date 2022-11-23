const express =  require('express')
const router =  express.Router()
const upload = require('../middleware/multer')
const adminController =  require('../controllers/admin/adminAuth')
const adminControl = require('../controllers/admin/admin')

// SIGN AND LOGIN HANDLER
router.get('/login', adminController.getLogin)
router.post('/login', adminController.postLogin)
router.get('/logout', adminController.logout)
router.get('/signup', adminController.getSignup)
router.post('/signup', upload.single('file'), adminController.postSignup)

// RENDERING ADMIN PAGES

router.get('/', adminControl.getIndex)
router.get('/create', adminControl.createProductForm)
router.post('/createProduct', upload.single('file'), adminControl.createProduct)

module.exports = router