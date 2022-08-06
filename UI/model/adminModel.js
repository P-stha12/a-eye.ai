let mongoose = require('mongoose');
const scema  = new mongoose.Schema({
    contactNumber:{
        type:String,
        maxLength:10,
        minLength:10,
        required : true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:false
    }
})

module.exports  = mongoose.model('adminModel',scema);