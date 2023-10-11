const jwt = require('jsonwebtoken');
const validateAuth = async(req, res, next) => {
const token = req?.headers?.authorization;
if(!token){
    return res.status(401).send("Unauthorized - No token provided")
}
if(!token.startsWith('Bearer ')){
    return res.status(401).send("Invalid Authorization token!")
}
jwt.verify(token.substring(7), process?.env?.PRIVATE_KEY, (err, decode) => {
    if(err){
        return res.status(400).send('Forbidden - Invalid token');
    }else{
        next();
    }
})
}

module.exports = validateAuth;