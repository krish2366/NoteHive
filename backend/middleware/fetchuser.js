const jwt = require("jsonwebtoken")
const JWT_SECRET = "khada_hu_aaj_bhi_wahi"

const fetchuser = (req,res,next) => {

    // get the user from jwt and add id to the req object
    const jwtToken = req.header("authToken")
    if(!jwtToken){
        return res.status(401).json({error : "user not authenticated"})
    }
    try {
        const data = jwt.verify( jwtToken , JWT_SECRET )
        req.user = data
        // console.log(data.id)
        next()  
    } catch (error) {
        return res.status(401).json({error : "user not authenticated"})
    }
}

module.exports = fetchuser