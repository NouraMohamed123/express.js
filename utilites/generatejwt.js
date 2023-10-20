var jwt = require('jsonwebtoken');
module.exports = async(payloads)=>{

   const token =  await jwt.sign( payloads , process.env.JWT_SECRET_KEY,{expiresIn:"1m"});
    return token;
}