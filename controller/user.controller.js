

const User = require('../model/model.user');
const asyncWrapper = require('../middelware/asyncWrapper');
const appError = require('../utilites/appError');
const { validationResult } = require('express-validator')
var bcrypt = require('bcryptjs');
const generatejwt = require('../utilites/generatejwt');

const getAllUser = asyncWrapper(
   async (req, res, next) => {
      // try {
       
      const query = req.query;
      const limit = query.limit || 2;
      const page = query.page || 1;
      const skip = (page - 1) * limit;
      const users = await User.find({ __v: false }).limit(limit).skip(skip); //using {} to query filter or opton

      if (!users) {
         const error = appError.create('Course not found', 400)
         return next(error);

      }

      return res.status(200).json(users);


   }
)
const Register = asyncWrapper(async (req, res, next) => {
   const oldUser = await User.findOne({ email: req.body.email });
   console.log(oldUser)
   // if (oldUser) {
   //    const error = appError.create('user already exist ', 400)
   //    return next(error);
   // }
   const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8)
   });
   const users = await user.save();
   return res.status(200).json(user);

})
const Login = asyncWrapper(async (req, res, next) => {
  
   const { email, password } = req.body;
   const user = await User.findOne({ email: req.body.email });
  
   var token = await generatejwt({ email:user.email, id:user._id });

   if (user &&  bcrypt.compare(password, user.password)) {
      return res.status(200).json({ message: 'login successful',token: token });
   } else {
      const error = appError.create('email and user not success ', 400)
      return next(error);
   }



})
module.exports = {
   getAllUser,
   Register,
   Login,

}