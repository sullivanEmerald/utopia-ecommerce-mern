const express = require('express')
const router =  express.Router()
const authController =  require('../controllers/auth')
const indexController = require('../controllers/index')
const upload = require('../middleware/multer')
const { ensureAuth} =  require('../middleware/auth')


router.get('/', indexController.getIndex)
router.post('/editLike/:id',  indexController.addLike)
router.post('/addCart/:id',  indexController.addToCart)
router.get('/cart/orders', indexController.viewOrder)
router.post('/order/plus/:id', indexController.plusQuality)
router.post('/order/minus/:id', indexController.minusQuality)
router.post('/order/remove/:id', indexController.removeOrder)
router.get('/order/checkout', indexController.checkout)
router.get('/logIndex', ensureAuth, indexController.indexCart)
router.get('/track/orders',indexController.fetchOrders )
router.put('/save/product/:id', indexController.saveItem)


router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', upload.single('file'), authController.postSignup)


module.exports = router