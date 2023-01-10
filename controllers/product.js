const products = require('../model/product')
const orders = require('../model/orders')

module.exports = {
    getCloths : async (req, res) => {
        try {
            const cloths = await products.find({productCategory : 'Cloths'})
            const cartNumber = await orders.countDocuments({ userId :  req.user.id})
            res.render('cloths.ejs', { title : 'cloths', cloths : cloths, user : req.user, cartNumber})
        } catch (error) {
            console.error(error)
        }
    },

    addToCart : async (req, res) => {
        try {
            const productDetails = await products.find({ _id  : req.params.id})
            const element = productDetails[0]
            const ordererdCart = await orders.find({ userId : req.user.id, productId : req.params.id})
            if(ordererdCart.length > 0){
                await orders.findOneAndUpdate({userId : req.user.id, productId : element._id}, {
                    $inc : {quantity : 1}
                })

            }else{
                    orders.create({
                    productId : element._id,
                    productName  : element.productName,  
                    productDescription  : element.productDescription,
                    productPrice : element.productPrice,
                    productImage : element.productImage,
                    cloudinaryId : element.cloudinaryId,
                    likes : element.likes,
                    quantity : 1,
                    userId : req.user.id 
    
                })
            
            }

            console.log("added to the Orders and for the admin")
            res.redirect('/products/cloths')
        } catch (error) {
            console.error(error)
        }
    }
}