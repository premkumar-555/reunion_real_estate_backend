
const validateEmailId = async(req, res, next) => {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const email = req?.body?.email_ID;
    if(!regex.test(email)){
     return res.status(401).send('Email ID is invalid!')
    }
    next()
}

module.exports = validateEmailId;