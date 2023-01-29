const express =  require('express')
const Router = express.Router()
const checkoutController =  require('../controllers/checkout')

Router.post('/user/address', checkoutController.createAddress)
Router.get('/review/checkout', checkoutController.reviewAddress)
Router.post('/review/edit/:id', checkoutController.editAddress)
Router.post('/review/deliveryMethod/:id', checkoutController.addDeliveryMethod)
Router.post('/review/station/:id', checkoutController.addPickStation)
Router.get('/payment/review/:id', checkoutController.paymentReview)
Router.put('/show/admin', checkoutController.showAdmin)


module.exports = Router