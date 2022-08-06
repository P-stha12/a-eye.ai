let path = require('path')
let router = require('express').Router();
router.get('//',(req,res)=>{
    console.log("Do we reach here");
    //We will use the below render if the render is not working in any case backup render code
    //res.render(path.join(__dirname,'a-eye/home/index.html'))
    res.render('home/index.html')
})

module.exports = router ; 