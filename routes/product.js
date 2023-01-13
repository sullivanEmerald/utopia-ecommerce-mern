const express =  require('express')
const router = express.Router()
const productController = require('../controllers/product')

router.get('/cloths', productController.getCloths)
router.get('/electronics', productController.getElectronics)
router.get('/utensils', productController.getUtensils)
router.get('/Funitures', productController.getFunitures)

router.post('/addCart/:id', productController.addToCart)
router.post('/addElectronics/:id', productController.addElectronis)
router.post('/addUtensils/:id', productController.addUtensils)
router.post('/addFuniture/:id', productController.addFuniture)




module.exports =  router