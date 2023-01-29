
const info = require('../model/info')
const Info = require('../model/info')
const Orders = require('../model/orders')
const { get } = require('../routes/main')

module.exports = {
    createAddress  : async(req, res) => {
        try {    
            await Info.create({
                address : req.body.address,
                phoneNo : req.body.phoneNumber,
                landmark : req.body.landMark,
                userId : req.user.id
            })
            console.log('Succefully been added to the address model')
            res.redirect('/checkout/review/checkout')
        } catch (error) {
            console.error(error)
        }
    },

    reviewAddress : async(req, res) => {
        try {
            const useraddress = await Info.find({ userId : req.user.id})
            const userInfo = useraddress[0]
            const userOrder =  await Orders.find({ userId :  req.user.id})
            res.render('review.ejs', { address: userInfo, orders : userOrder, title : req.user.userName, user: req.user})
        } catch (error) {
            console.error(error)
        }
    },

    editAddress :  async(req, res) => {
        try {
            await Info.findOneAndUpdate({ _id : req.params.id}, {
                address : req.body.address,
                phoneNo :  req.body.phoneNumber,
                landmark : req.body.landMark
            })
            console.log('Address updated')
            res.redirect('/checkout/review/checkout')
        } catch (error) {
            console.error(error)
        }
    },

    addDeliveryMethod : async (req, res) => {
        try {
            await Info.findOneAndUpdate({ _id : req.params.id},{
                paymentMethod : req.body.deliveryMethod
            })
            console.log('Update has been added to the Info')
            res.redirect('/checkout/review/checkout')
        } catch (error) {
            console.error(error)
        }
    },

    addPickStation : async(req, res) => {
        const getLocation = await Info.find({ _id : req.params. id})
        const pickStation =  getLocation[0]
        console.log(pickStation)
            try {

                if(pickStation.paymentMethod === 'Pick Up Station'){
            
                    await Info.findOneAndUpdate({  _id :  req.params.id}, {
                        pickUp : req.body.pickStation
                    })
                    console.log('added pick up station')
                    res.redirect('/checkout/review/checkout')
               
                }else if(pickStation.paymentMethod === 'Pay On Delivery' || pickStation.paymentMethod === 'Credit Card' ){
                
                    await Info.findOneAndUpdate({  _id :  req.params.id}, {
                        $set : {
                            pickUp : ''
                        }
                    })
                    console.log('reset')
                    res.redirect('/checkout/review/checkout')
               
            }
            } catch (error) {
                console.error(error)
            }
        
    },

    paymentReview  : async (req, res) => {
        try {
            const pamentAmount = req.params.id
            res.render('payment.ejs', { pamentAmount : pamentAmount, user : req.user , title : "Review Payment"})
        } catch (error) {
            console.error(error)
        }
    },

    showAdmin : async (req, res) => {
        try {
            await Orders.updateMany({ userId : req.user.id}, {
                $set : {
                    showAdmin : true
                }
            })
            console.log('show all to the admin')
            res.redirect('/')
        } catch (error) {
            console.error(error)
        }
    }

}   