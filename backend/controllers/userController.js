const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');




// @Desc   Register new user
// @Route  POST  /api/user/
// @Access public
const registerUser = asyncHandler(async (req, res) => {
   const { username, email, password } = req.body;

   // Check if all the fields are entered
   if (!username || !email || !password) {
      res.status(400)
      throw new Error('Please enter all fields')
   }

   // Check if user already exists with same email
   const userExists = await User.findOne({ email });
   if (userExists) {
      res.status(400)
      throw new Error('User already exists')
   }
   // Hash the password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt);

   // Create new User
   const user = await User.create({
      username,
      email,
      password: hashedPassword
   })
   if (user) {
      res.status(200).json({
         _id: user.id,
         name: user.username,
         email: user.email,
         token: generateToken(user._id)
      });
   } else {
      res.status(400)
      throw new Error('Invalid user data')
   }
})


// @desc     Login a user
// @Route    POST /api/user/
// @Access   Private

const loginUser = asyncHandler(async (req, res) => {

   const { email, password } = req.body;
   if (!email || !password) {
      res.status(400);
      throw new Error('Please enter all fields')
   }
   const user = await User.findOne({ email })

   if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
         _id: user.id,
         username: user.username,
         email: user.email,
         token: generateToken(user._id)
      })

   } else {
      res.status(400)
      throw new Error('Invalid credentials')
   }
   res.status(401).json({ message: "Invalid credentials" });

})


// @Desc    Get current user
// @Route   GET   api/user/getUser
// @Access  Privare
const getUser = asyncHandler(async (req, res) => {


   res.status(200).json(req.user)

   res.json({ userData: 'User data' })
})


// @Desc    Forget Password
// @Route   POST   api/user/forgetPassword
// @Access  Privare
const forgetPassword = asyncHandler(async (req, res) => {
   // const email = req.body.email;
   res.status(200).json({
      message: "User forgot password"
   })

})

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.SECRET, { expiresIn: '30d', })
}

module.exports = { loginUser, registerUser, forgetPassword, getUser }