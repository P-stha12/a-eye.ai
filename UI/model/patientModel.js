let mongoose = require('mongoose');
const scema  = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    age:{
        type: Number,
        required : true,
    },
    gender:{
        type:String,
        required:true
    },
    hypertension:{
        type:Boolean,
        required:true,
        default:false,
    },
    diabeties:{
        type:Boolean,
        required:true,
        default:false,
    },
    address:{
        province:{
            type:String,
            required : true
        },
        district:{
            type: String,
            requied:true
        },
        municipality:{
            type:String,
            required:true
        }
    },
    contactNumber:{
        type:String,
        minLength: 10,
        maxLength : 10
    },
    email : String,
    leftEye:{
        pic:Buffer,
        contentType: {
            type:String,
            default:"image/jpg"
        }
    },
    rightEye :{
        pic:Buffer,
        contentType: {
            type:String,
            default:"image/jpg"
        }
    },
    profile:{
        pic:Buffer,
        contentType:String
    },
    leftEyeProblem:{
        type:{
                name:String,
                percentage:Number
            }
    },
    rightEyeProblem:{
        type:{
            name:String,
            percentage:Number
        }
    },
    problem:{
        type:{
            name:String,
            eye:String,
            percentage:Number
        }
    }
})

module.exports  = mongoose.model('patientModel',scema);