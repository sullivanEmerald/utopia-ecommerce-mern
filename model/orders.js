const mongoose =  require('mongoose')

const OrderSchema =  new mongoose.Schema({

    productId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
    },

    productName : {
        type : String,
        required : true,
    },

    productDescription : {
        type : String,
        required : true,
    },


    productPrice : {
        type : Number,
        required : true,
    },

    productImage : {
        type : String,
        required : true,
    },

    cloudinaryId : {
        type : String,
        required : true,
    },

    likes : {
        type : Number,
        required : true,
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    quantity : {
        type : Number,
        required : true
    },

    status : {
        type : String,
        default : null,
    },

     showAdmin: {
        type : Boolean,
        required :  true,
    },

    saveItem: {
        type : Boolean,
        default : false,
    },

    clearCart: {
        type : Boolean,
        default : true,
    },

    createdAt  : { 
        type : Date,
        default : Date.now,
    }


})


module.exports = mongoose.model('Order', OrderSchema)




