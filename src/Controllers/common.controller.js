const express = require('express');
const router = express.Router();
const userModel = require('../Models/User.model');
const propertyModel = require('../Models/Property.model')
const validateReqObj = require('../Middlewares/validateReqObj')
const signup = require('../Middlewares/signup')
const validateEmailId = require('../Middlewares/validateEmail')
const checkPassword = require('../customLogics/login')
const validateAuth = require('../Middlewares/validateAuth')
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
    console.error(error);
    return res.status(500).send("Internal Server Error")
    }
})

// user login api
router.post('/login', [validateReqObj, validateEmailId] , async(req, res) => {
    try {
        const user = await userModel.findOne({email_ID: req?.body?.email_ID});
        if(!user){
            return res.status(404).send('User does not registered!')
        }
        const {msg, token: bearerToken} = await checkPassword(req?.body, user?.password);
        if(!msg){
            return res.status(401).send('Invalid Password!')
        }
       return res.status(200).send({user: await userModel.findOne({email_ID: req?.body?.email_ID}).select('-password'),
       bearerToken});
    } catch (error) {
         console.error(error);
         return res.status(500).send("Internal Server Error")
    }
})

// fetch all available properties
router.get('/list-properties', async(req, res) => {
    try {
        const properties = await propertyModel.find().populate({path: 'owner_ID', select: '-password'});
        return res.status(200).send(properties)
    } catch (error) {
         console.error(error);
         return res.status(500).send("Internal Server Error")
    }
})

// add properties
router.post('/property', [validateReqObj, validateAuth], async(req, res) => {
    try {
        const property = await propertyModel.create(req.body);
        return res.status(200).send('Successfully Added Property to Portal!')
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }
})

// update  property
router.put('/property/:id', [validateReqObj, validateAuth], async(req, res) => {
    try {
        const {owner_ID} = req.body;
        const targetProperty  = await propertyModel.findOne({_id: req?.params?.id});
        if(!targetProperty){
            return res.status(404).send('Requested Property does not exist!')
        }
        if(targetProperty['owner_ID'].toString() !== owner_ID){
            return res.status(401).send("You do not have the required permissions to update this property!")
        }
        const updatedProperty = await propertyModel.findByIdAndUpdate(req?.params?.id, req.body);
        return res.status(200).send("Successfully Updated the Property!")
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }
})

// delete property
router.delete('/property/:id', [validateReqObj, validateAuth], async(req, res) => {
    try {
        const {owner_ID} = req.body;
        const targetProperty  = await propertyModel.findOne({_id: req?.params?.id});
        if(!targetProperty){
            return res.status(404).send('Requested Property does not exist!')
        }
        if(targetProperty['owner_ID'].toString() !== owner_ID){
            return res.status(401).send("You do not have the required permissions to update this property!")
        }
        const deletedProperty = await propertyModel.findByIdAndDelete(req?.params?.id);
        return res.status(200).send("Successfully Deleted the Property!")
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }
})

// list owner's properties
router.get('/property', [validateReqObj, validateAuth], async(req, res) => {
    try {
        const ownerId = req?.query?.owner_ID;
        if(!ownerId){
            return res.status(400).send('Owner Id is missing in the query!')
        }
        const targetOwner = await userModel.findOne({_id: ownerId});
        if(!targetOwner){
            return res.status(401).send('Owner does not exist!')
        }
        const properties = await propertyModel.find({owner_ID: ownerId});
        if(!properties.length){
            return res.status(400).send('No Properties exist for this owner')
        }
        return res.status(200).send(properties)
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error")
    }
})
module.exports = router;