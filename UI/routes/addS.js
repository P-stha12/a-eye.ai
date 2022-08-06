let adminModel = require('../model/adminModel');
let {validationResult , body} = require('express-validator')
let bcrypt = require('bcrypt');

const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('add')
})
router.post('/',body('contactNumber',"Contact Number is a required field and should be of 10 digits").notEmpty().isLength({"max":10,"min":10}),body('email',"Email is a required field for staff members").notEmpty(),body('password',"Password is a required field").notEmpty(),async (req,res)=>{
    let result =  validationResult(req);
    if(!result.isEmpty()){
        let err={}
        result.array().forEach(element => {
            err[element.param]= element.msg
        });
        res.status(400).json({
            status:false,
            error:err
        })
        return
    }else{
        let {contactNumber,email,password}= req.body
        let salt =await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password,salt)
        let admin = new adminModel({
            contactNumber:contactNumber,
            email:email,
            password:hash
        })
        try{
            let saveResponse  = await admin.save()
            res.status(200).json({
                "status":true,
                "msg":"We added a user to the admin page"
            })
        }
        catch(error){
            console.log(error.message);
            console.log('\n',error)
            res.status(500).json({
                "status":false,
                "msg":"Some internal server error"
            })
        }
    }
})
module.exports  = router

