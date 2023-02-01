
const Product = require('../model/product')
const Orders = require('../model/orders')
const cloudinary =  require('../middleware/cloudinary')
const Address =  require("../model/info")
const saveOrder = require('../model/save')
const { connect } = require('mongoose')
 

module.exports = {
    getIndex : async (req, res) => {
        try {
            const electronics =  await Product.find({ productCategory : 'Electronics'}).sort({ createdAt : 1}).lean()
            const cloths = await Product.find({ productCategory : 'Cloths'}).sort({ createdAt : 1}).lean()
            const funitures = await Product.find({ productCategory : 'Funitures'}).sort({ createdAt : 1}).lean()
            const utensils =  await Product.find({ productCategory : 'Utensils'}).sort({ createdAt : 1}).lean()
            const phone = await Product.find({ productCategory : 'Phone'}).sort({ createdAt : 1}).lean()
            const saveNumbers = await saveOrder.countDocuments({user :  req.user.id})
            const savedItems = await saveOrder.find({ user : req.user.id})
            

            if(req.user){
                const cartNumber =  await Orders.countDocuments({ userId : req.user.id})
                res.render('index.ejs', { electronics : electronics, title : "Home Page", user : req.user, cartNumber : cartNumber, cloths : cloths, funitures : funitures, utensils :  utensils, phone : phone,  savesNo : saveNumbers, savedItems : savedItems})
            }else{
                res.render('index.ejs', { electronics : electronics, title : "Home Page", user : req.user, cloths : cloths, funitures : funitures, utensils :  utensils, phone : phone,  savesNo : saveNumbers}) 
            }
            
            
        } catch (error) {
            console.error(error)
        }
    },

    addLike : async (req , res) => {
        try {
            await Product.findByIdAndUpdate(req.params.id , {
                $inc : {likes: 1}
            })
            console.log('Likes Updated')
            res.redirect('/')
        } catch (error) {
            console.error(error)
        }
    },

    addToCart : async (req, res) => {
       
        try {
            const productDetails = await Product.find({ _id  : req.params.id})
            const element = productDetails[0]
            const ordererdCart = await Orders.find({ userId : req.user.id, productId : req.params.id})
            if(ordererdCart.length > 0){
                await Orders.findOneAndUpdate({userId : req.user.id, productId : element._id}, {
                    $inc : {quantity : 1}
                })

            }else{
                    Orders.create({
                    productId : element._id,
                    productName  : element.productName,  
                    productDescription  : element.productDescription,
                    productPrice : element.productPrice,
                    productImage : element.productImage,
                    cloudinaryId : element.cloudinaryId,
                    likes : element.likes,
                    quantity : 1,
                    userId : req.user.id,
                    status : null,
                    showAdmin : false,
    
                })
            
            }

            console.log("added to the Orders and for the admin")
            res.redirect('/')
        } catch (error) {
            console.error(error)
        }
    },

    viewOrder : async (req, res) => {
        try {
            const userOrders = await Orders.find({ userId : req.user.id}).lean()
            const cartNumber =  await Orders.countDocuments({ userId : req.user.id})
            res.render('order.ejs', { Orders : userOrders, user : req.user, title : req.user.userName, cartNumber: cartNumber })
        } catch (error) {
            console.error(error)
        }
    },

    plusQuality  : async (req, res)  => {
        try {
            await Orders.findOneAndUpdate({ _id : req.params.id}, {
                $inc : {quantity : 1}
            })
            res.redirect('/cart/orders')
        } catch (error) {
            console.error(error)
        }
    },

    minusQuality : async (req, res) => {
        try {
            await Orders.findByIdAndUpdate(req.params.id, {
                $inc : {quantity : -1}
            })
            res.redirect('/cart/orders')
        } catch (error) {
            console.error(error)
        }
    },

    removeOrder : async (req, res) => {
        try {
            await Orders.findOneAndDelete({_id : req.params.id})
            res.redirect('/cart/orders')
        } catch (error) {
            console.error(error)
        }
    },

    checkout : async (req, res) => {
        try {
            const userAddrress = await Address.find({ userId : req.user.id})
            if(userAddrress.length > 0){
                res.redirect('/checkout/review/checkout')
            }else{
                const totalOrder =  await Orders.find({ userId : req.user.id})
                res.render('checkout.ejs', { userOrders : totalOrder, title : "CheckOut", user : req.user})
            }
        } catch (error) {
            console.error(error)
        }
    },

    indexCart : async (req, res) => {
        try {
                const products =  await Product.find().lean()
                const cartNumber =  await Orders.countDocuments({ userId : req.user.id})
                res.render('logIndex.ejs', { products : products, title : "Home Page", user : req.user, cartNumber : cartNumber})
        } catch (error) {
            console.error(error)
        }
    },

    fetchOrders : async (req, res) => {
        try {
            const myOrders =  await Orders.find({ userId : req.user.id})
            const cart = await Orders.countDocuments({ userId : req.user.id })
            const userAddress =  await Address.find({userId : req.user.id})
            console.log(userAddress)
            res.render('track.ejs', { userOrder : myOrders, title : "My Orders", user : req.user, cartNumber : cart, address : userAddress[0]})
        } catch (error) {
            console.error(error)
        }
    },

    createFavourite : async (req, res) => {
        try {
            const favourite = await Product.find({ _id  : req.params.id})
            const favouritEntity = favourite[0]

                    saveOrder.create({
                    productId : favouritEntity._id,
                    productName  : favouritEntity.productName,  
                    productDescription  : favouritEntity.productDescription,
                    productPrice : favouritEntity.productPrice,
                    productImage : favouritEntity.productImage,
                    user : req.user.id,
    
                })  
            console.log('favourite Saved')
            res.redirect('/')
        } catch (error) {
            console.error(error)
        }
        
    },

    viewSavedItems :  async (req, res) => {
        try {
            const userSaves =  await saveOrder.find({ user : req.user.id})
            const cart = await Orders.countDocuments({ userId : req.user.id })
            const saveNumbers = await saveOrder.countDocuments({user :  req.user.id})
            res.render('save.ejs', { title : 'Saved Items', savedItems : userSaves, user: req.user, cartNumber : cart, savesNo : saveNumbers})
        } catch (error) {
            console.error(error)
        }
    },

    deleteSave :  async (req, res) => {
        try {

           await saveOrder.findOneAndDelete({ user : req.user.id, productId : req.params.id})
           console.log('save Deleted')
           res.redirect('/')
            
        } catch (error) {
            console.error(error)
        }
    }
}