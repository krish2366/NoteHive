const express = require("express")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require("../models/User")
const fetchuser = require("../middleware/fetchuser")
const { body , validationResult } = require('express-validator');
const JWT_SECRET = "khada_hu_aaj_bhi_wahi"





// Registering a user using POST : endpoint is "api/auth/createuser"
const ValidationCriteria = [
    body("name","Enter a valid Name").isLength({min : 3}),
    body("email","Enter a valid email").isEmail(),
    body("password","Enter a valid password").isLength({min : 2})
]

router.post("/createuser" , ValidationCriteria , async(req,res)=>{

    // checking the format of body is correct or not
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            success:false ,
            error : error.array()
        })
    }

    try {
        // checking for duplicate entry of a email
        let user = await User.findOne({email: req.body.email})
    
        if(user){
            return res.status(400).json({success:false , error : "Email already exists"})
        }else{

            // encrypting the password
            const salt = await bcrypt.genSalt(10)
            const securePassword = await bcrypt.hash(req.body.password,salt)

            user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : securePassword
            })

            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign( data , JWT_SECRET )
            // console.log(authToken)
            res.json({
                success : true , 
                authtoken : authToken
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }
})



// Authenticating a user: endpoint is "/api/auth/login"
const ValidationCriteriaForAuth = [
    body("email","Enter a valid email").isEmail(),
    body("password","password cannot be blank").exists()
]

router.post("/login", ValidationCriteriaForAuth , async (req,res) =>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(500).json({success:false , error : error.array})
    }

    const {email , password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(500).json({success:false , error : "Wrong Credentials"})
        }else{
            const passwordCompare = await bcrypt.compare(password , user.password)
            if(!passwordCompare){
                return res.status(500).json({success:false , error : "Wrong Credentials"})
            }else{
                const payload = {
                    id : user.id
                }
                const authToken = jwt.sign(payload , JWT_SECRET)
                res.json({
                    success : true,
                    authToken : authToken
                })
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong")
    }

})


// get user data after logining in : "/api/auth/getuser"
// here 'fetchUser' middleware is used 
router.post("/getuser", fetchuser ,async (req,res) =>{
    try {
        // console.log(req.user)
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.json({success : true , user:user})

    } catch (error) {
        console.log(error.message)
        res.status(500).send("something went wrong")
    }
})

module.exports = router  