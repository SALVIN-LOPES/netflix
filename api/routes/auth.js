const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER : User
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    })
    try {
        const user = await newUser.save();
        res.status(201).json(user)
        // console.log(user);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});
//LOGIN : USER
router.post("/login", async (req, res) => {
    try {
        const user =  await User.findOne({
            email: req.body.email,
        });
        !user && res.status(401).send("WRONG EMAIL OR PASSWORD");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if( originalPassword !== req.body.password){
            res.status(401).send("WRONG EMAIL OR PASSWORD");
        }
        
        //JWT ACCESS TOKEN :
        const accessToken = jwt.sign(
            {id : user._id,isAdmin : user.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn : "5d"}
            )
            
        const { password , ...info} = user._doc; //dont show password on request : 
        res.status(200).send({...info,accessToken});
        }
    catch (e) {
        res.status(500).send(e);
    }

})

module.exports = router;