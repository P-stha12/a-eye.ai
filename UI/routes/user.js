let patientModel = require('../model/patientModel');


let path = require('path');
let router = require('express').Router();
router.get('/',async (req,res)=>{
    console.log("Do we reach the user page");
    let result = await patientModel.find({}).sort({
        "problem.percentage":-1
    }).limit(10);
    console.log(result);
    let renderData =result.map((data)=>{
        return {
            name:data.name,
            age:data.age,
            gender:data.gender,
            disL:data.leftEyeProblem.name,
            perL:data.leftEyeProblem.percentage.toFixed(2),
            disR:data.rightEyeProblem.name,
            perR:data.rightEyeProblem.percentage.toFixed(2)
        }
    })
    res.render('profilePage/index',{data:renderData})
})

router.post('/',async (req,res)=>{
    console.log("We are good");
    let result = await patientModel.find({}).sort({age:-1}).limit(3);
    res.status(200).send(result)
    console.log(result)
})

router.get('/logout',async (req,res)=>{
    console.log("We are logging out");
    try{
        console.log(req.session)
        req.session.destroy();
        console.log("We destryoed database");
        console.log(req.session);
    }catch(err){
        console.log(err)
    }
})

module.exports = router;