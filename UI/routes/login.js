let { validationResult, body } = require('express-validator')
let admin = require('../model/adminModel')
let bcrypt = require('bcrypt');

let router = require('express').Router();
// router.get('/', (req, res) => {
//     console.log("Do we reach the login page of the server");
//     res.render('one.html')
// })

router.post('/', body('contactNumber', "Contact Number is a required field and must be 10 characters").notEmpty().isLength({
    "maxlength": 10,
    "minLength": 10
}), body('password').notEmpty().isString(), async (req, res) => {
    let result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({
            "status": false,
            error: result.array()
        })
        return
    }
    let { contactNumber, password } = req.body
    try {
        let data = await admin.findOne({ contactNumber: contactNumber });
        if (!data) {
            res.status(400).json({
                "status": false,
                "mssg": "Not a admin"
            })
        } else {
            let match = await bcrypt.compare(password, data.password)
            if (match) {
                req.session.contactNumber = data.contactNumber
                req.session.type = "staff"
                res.status(200).json({
                    "status": true,
                    "mssg": "Found user"
                })
            } else {
                res.status(400).json({
                    "status": false,
                    "mssg": "User name and password does not match"
                })
            }
        }
    } catch (err) {
        console.log("This error is from the login route ");
        console.log("\nYou have failed to find the data and the error is \n");
        console.log(err);
        res.status(500).json({
            "status": false,
            "mssg": "There is some server error"
        })
    }
})
module.exports = router



