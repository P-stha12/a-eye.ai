let Router = require('express').Router();
let { body, validationResult } = require('express-validator')
let patientModel = require('../model/patientModel')
let multer = require('multer');
let gm = require('gm').subClass({ imageMagick: true });
let path = require('path');
let fs = require('fs')
let prediction =require('../prediction');


//This portion is a field where we decide how we retrive the data from the form
const storage = multer.diskStorage({
    destination: './uploadsTempImg',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + file.originalname)
    }
})

let upload = multer({
    storage: storage
})

//This is the part of the data that is used to listen to the requests of the user
Router.post('/add', upload.fields([
    { name: 'leftEye' },
    { name: 'rightEye' },
    {name:'profile'}
]),body('name',"name field is a required field").notEmpty().isString(),body('age',"Age is a required field").notEmpty().isNumeric(),body('gender',"Gender field is a required field").notEmpty().isString(),body('province',"Province is a required field").notEmpty().isString(),body('district',"District is a required field").notEmpty().isString(),body('municipality',"Municipality is a required field").notEmpty().isString(),body('contactNumber',"Contact number is a required field").notEmpty().isString().isLength({'max':10,'min':10}), async (req, res) => {
    let result = validationResult(req);
    if(!result.isEmpty()){
        let err ={}
        (result.array()).foreach((data)=>{
            err[data['param']] = data.msg
        })        
        res.status(400).json({
            "status":false,
            "err":err
        })
    }else{
        if (req.files['leftEye']) {
            if (req.files['rightEye']) {
                let { name, age, province, district, municipality, contactNumber, email ,gender,hypertension,diabeties} = req.body
                if(hypertension[0]=='false'){
                    hypertension = false
                }else{
                    hypertension =true
                }
                if(diabeties[0]=='false'){
                    diabeties = false
                }else{
                    diabeties=true
                }
                let address = { province, district, municipality }
                let patientDetail = new patientModel({
                    name, age, address, contactNumber, email,gender,hypertension,diabeties
                })
                gm(path.join(__dirname,"../",req.files.profile[0].path)).resize(512).write(path.join(__dirname,"../",req.files.profile[0].path),async (err)=>{
                    if(!err){
                        let buffe = fs.readFileSync(path.join(__dirname,"../", req.files.profile[0].path),{encoding:'base64'});
                        let ext = path.extname(req.files.profile[0].originalname)
                        patientDetail.profile={
                            "pic":buffe,
                            "contentType":ext
                        }
                    }else{
                        let buffe = fs.readFile(path.join(__dirname,"../","defaultImg/profile.png"))
                        let ext = 
                        patientDetail.profile={
                            "pic":buffe,
                            "contentType":ext
                        }
                    }
                })
                gm(path.join(__dirname, "../", req.files.leftEye[0].path)).resize(512).write(path.join(__dirname, "../", req.files.leftEye[0].path), async (err) => {
                    if (err) {
                        console.log("Error occured while resizing the image");
                        console.log(err);
                        res.status(500).json({
                            "status": false,
                            "mssg": "Failed to process image"
                        })
                    } else {
                        console.log(path.join(__dirname, "../", req.files.leftEye[0].path))
                        let buff= fs.readFileSync(path.join(__dirname, "../", req.files.leftEye[0].path))
                        patientDetail.leftEye = {
                            "pic": buff,
                            "contentType": "image/jpg"
                        }
                        gm(path.join(__dirname, "../", req.files.rightEye[0].path)).resize(512).write(path.join(__dirname, "../", req.files.rightEye[0].path), async (err) => {
                            if (err) {
                                console.log("Error occured while resizing the image");
                                console.log(err);
                                res.status(500).json({
                                    "status": false,
                                    "mssg": "Failed to process image"
                                })
                            } else {
                                let buf = fs.readFileSync(path.join(__dirname,"../",req.files.rightEye[0].path))
                                patientDetail.rightEye = {
                                    "pic": buf,
                                    "contentType": "image/jpg"
                                }
                                try {
                                   let r = await patientModel.findOneAndRemove({ contactNumber:contactNumber});
                                   await patientDetail.save();

                                    //We will call to the ML api from here
                                    prediction(fs.readFileSync(path.join(__dirname, "../", req.files.leftEye[0].path)),fs.readFileSync(path.join(__dirname,"../",req.files.rightEye[0].path)),contactNumber);
                                    res.status(200).json({
                                        "status": true,
                                        "mssg": "We are all good"
                                    })
                                } catch (error) {
                                    console.log("Some error occured while saving data in database");
                                    console.log("\n", error.message);
                                    res.status(500).json({
                                        "status": false,
                                        "mssg": "Some error occured while saving data in database"
                                    })
                                }
                            }
                        })
                    }
                })
            } else {
                res.status(400).json({
                    "status": false,
                    "mssg": "Right eye image was required"
                })
            }
        } else {
            res.status(400).json({
                "status": false,
                "mssg": "Left eye image is required"
            })
        }
    }
})


Router.post('/check', body('name', "Name fiels is compulsory").notEmpty().isString(), body('contactNumber', "Contact number is less than 10 digits and a required field").notEmpty().isNumeric().isLength({
    "min": 10,
    "max": 10
}), async (req, res) => {
    let result = validationResult(req)
    console.log(req.body)
    if (!result.isEmpty()) {
        res.status(400).json({
            "error": result.array().map((red) => {
                return { [red.param]: red.msg }
            })
        })
    } else {
        let { name, contactNumber } = req.body
        let data = await patientModel.findOne({
            contactNumber: contactNumber,
            name: name
        })
        let {leftEyeProblem,rightEyeProblem}= data;
        if (!data) {
            res.status(500).json({
                "status": false,
                "mssg": "No data in the given user Name"
            })
        } else {
            res.status(200).json({
                "status": true,
                "data":{
                    "leftEyeProblem":leftEyeProblem,
                    "rightEyeProblem":rightEyeProblem,
                    "age":data.age,
                    "gender":data.gender,
                    "img":`data:image/jpg;base64,${data.profile.pic}`
                }
            })
        }
    }
})


Router.get('/report',async (req,res)=>{
    if(false){
        res.status(400).json({
            status:false,
            "mssg":"No patient id found"
        })
    }else{
        try{
            let result = await patientModel.findOne({
                contactNumber:"9840170829"
            })
            res.status(200).render('patient',{
                name:result.name,
                left:`data:image/jpg;base64,${result.profile.pic}`
            })
        }catch(error){
            console.log(error);
            res.status(400).json({
                "status":false,
                "mssg":"We failed to load the documents from the database"
            })
        }
       
        
    }
})
module.exports = Router