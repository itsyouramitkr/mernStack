const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "firstToken";

// create a user POST : "api/auth/createuser"
router.post('/createuser', [
    body('name').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })

], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(404).json({ error: error.array() });
    }

    //.if (!error.isEmpty())
    // error.isEmpty() returns true if there are no errors.
    // So !error.isEmpty() means:
    // 👉 "If there ARE validation errors..."


    // const userData = User(req.body)
    // userData.save();
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ err: "Sorry a user with this email already exist" });
    }
    try {
        const salt = await bcrypt.genSalt(10); /// generating the salt 
        const securePassword = await bcrypt.hash(req.body.password, salt); /// hashing done and adding salt to it
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });
        res.json(user);
        // return res.status(201).json(user); we will not send the user 
        // we will send the token (user id)
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
});

///// authenticate the user login  end point api/auth/login

router.post('/login', [
    body("email").isEmail(),
    body("password").exists()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(404).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email }); ///This gives you the full user object from your database:
        // console.log(user);
        // like this :->
        // {
        //   _id: "123abc",
        //   email: "harry@gmail.com",
        //   password: "$2b$10$X93z...hashedPasswordFromDB"
        // }
        if (!user) {
            return res.status(400).json({ error: "please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "please try to login with correct credentials" })
        }
        const TokenPlayload = {  /// Identify which user owns the token 
            user: {     /// You are creating a payload (i.e., data to be stored in the token).
                id: user.id   /// This payload contains only the user's id.
            }
        }
        const AuthToken = jwt.sign(TokenPlayload, JWT_SECRET);
        res.json({ AuthToken });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
});



//// get logged in user detail  api/auth/getuser login required
router.post('/getuser', fetchuser, async(req, res) => {
    try {
        const userID = req.user.id; // get the id from the header(payload)
        const user = await User.findById(userID).select("-password"); // select all the field except the password
        res.send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server Error" });
    }
    ///// jo jo request ye mangti hai ki user authenticate hone chaye main unme header bhej dunga
    /// us header me se jo v data nikal kr  userID me fetch kr lunga   
})
module.exports = router;