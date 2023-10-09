const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const checkPassword = async(user, hashedPassword) => {
const match = await bcrypt.compare(user?.password, hashedPassword);
if(match){
   return {msg: true, token: jwt.sign({data: user?.email_ID}, process?.env?.PRIVATE_KEY, {expiresIn: '7 days'})}
}else{
    return {msg: false};
}
}

module.exports = checkPassword;