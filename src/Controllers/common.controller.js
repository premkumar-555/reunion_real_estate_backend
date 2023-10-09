const express = require('express');
const router = express.Router();
const userModel = require('../Models/User.model');
const validateReqObj = require('../Middlewares/validateReqObj')
const signup = require('../Middlewares/signup')
const validateEmailId = require('../Middlewares/validateEmail')
const checkPassword = require('../customLogics/login')
// user signup api
router.post('/signup', [validateReqObj, signup, validateEmailId], async(req, res) => {
    try {
        const targetUser = await userModel.findOne({$or: [
            {email_ID : req?.body?.email_ID},
            {user_name : req?.body?.user_name}
        ]});
        if(targetUser){
            return res.status(400).send('User already exist!')
        }
     const user = await userModel.create(req.body);
     return res.status(200).send('Signup done successfully');
    } catch (error) {
    return res.status(500).send(error.message)
    }
})

// user login api
router.post('/login', [validateReqObj, validateEmailId] , async(req, res) => {
    try {
        const user = await userModel.findOne({email_ID: req?.body?.email_ID});
        if(!user){
            return res.status(401).send('User does not registered!')
        }
        const {msg, token: bearerToken} = await checkPassword(req?.body, user?.password);
        if(!msg){
            return res.status(400).send('Invalid Password!')
        }
       return res.status(200).send({user: await userModel.findOne({email_ID: req?.body?.email_ID}).select('-password -_id'),
       bearerToken});
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = router;