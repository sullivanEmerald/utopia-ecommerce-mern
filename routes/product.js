const express =  require('express')
const router = express.Router()
const productController = require('../controllers/product')

router.get('/cloths', productController.getCloths)
router.post('/addCart/:id', productController.addToCart)



module.exports =  router