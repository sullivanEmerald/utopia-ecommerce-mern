const mongoose = require('mongoose')

const saveSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }, 


    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    },


    productName : {
        type : String,
        required  : true,
    },

    productDescription : {
        type : String,
        required  : true,
    },

    productPrice : {
        type : Number,
        required  : true,
    },

    productImage : {
        type : String,
        required  : true,
    },

    createdAt : {
        type : Date,
        default : Date.now,

    },
})



module.exports = mongoose.model('Favourite', saveSchema)