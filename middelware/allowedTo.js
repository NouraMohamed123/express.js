module.exports = (...roles)=>{
    // ['','']
     console.log(roles);
    return (req,res,next)=>{
        console.log(req.currentUser);
        if(!roles.includes(req.currentUser.role)){
            return res.status(401).send({'error':'Invalid role'});
        }
        next();
    }
}