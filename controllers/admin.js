const Product =  require('../model/product')
const cloudinary =  require('../middleware/cloudinary')
const Users =  require('../model/User')
const User = require('../model/User')

module.exports = {
    getIndex : async (req, res) => {
        res.render('admin/index.ejs', { title : "Admin Page"})
    },

    createProductForm : async (req, res) => {
        try {
            res.render('admin/createproduct.ejs', { title : 'Create Product'})
        } catch (error) {
            console.error(error)
        }
    },

    createProduct : async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path)
            await Product.create({
                productName : req.body.name,
                productDescription : req.body.description,
                productPrice : req.body.price,
                productName : req.body.name,
                productImage : result.secure_url,
                cloudinaryId : result.public_id,
                productCategory : req.body.productCategory,
                productAvailable : true,
                likes : 0,
            })
            console.log('product added to the database')
            res.redirect('/admin/create')
        } catch (error) {
            console.error(error)
        }
    },

    viewUsers : async (req, res) => {
        try {
            const users =  await Users.find().lean()
            res.render('admin/users.ejs', {users : users, title : "Utopia Users"} )
        } catch (error) {
            console.error(error)
        }
    },

    updateAdmin : async (req, res) => {
        try {
            await Users.findOneAndUpdate({ _id : req.params.id}, {
                adminStatus : false
            })
            res.redirect('/admin/view/users')
        } catch (error) {
            console.error(error)
        }
    },

    reverseAdmin : async (req, res) => {
        try {
            await Users.findOneAndUpdate({ _id : req.params.id}, {
                adminStatus : true
            })
        res.redirect('/admin/view/users')
        } catch (error) {
            console.error(error)
        }
    }
}