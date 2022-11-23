const mongoose = require('mongoose')


const UserInfo = new mongoose.Schema({
    address : {
        type : String,
        required : true,
    },

    phoneNo : {
        type : String,
        required : true,
    },

    landmark : {
        type : String,
        required : true,
    },

    paymentMethod : {
        type : String,
        required : false
    },

    pickUp : {
        type : String,
        required : false
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }

})

module.exports = mongoose.model('Address', UserInfo)