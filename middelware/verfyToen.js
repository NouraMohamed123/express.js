var jwt = require('jsonwebtoken');
const verifyHeaders = (req, res, next) =>{

    const authheaders = req.headers['authorization'];
    if(!authheaders){
        return res.status(401).send('token is required');
    }
    const token = authheaders.split(' ')[1];
    try{
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
     
        req.currentUser = decodeToken;
        next();
    }catch(e){
        return res.status(401).send('invalid token');
    }
   
   

}
module.exports = verifyHeaders;