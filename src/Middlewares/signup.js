const bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async(req, res, next) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req?.body?.password, salt);
    req.body = {...req.body, password: hash};
    next()
}

module.exports = signup;