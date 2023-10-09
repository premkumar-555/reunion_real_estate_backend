
const validateReqObj = async(req, res, next) => {
  const values = Object.values(req.body);
  const emptyValues = values.filter((ele) => (!ele));
  if(emptyValues.length){
    return res.status(401).send('Required credentials are missing!');
  }
  next()
}
module.exports = validateReqObj;