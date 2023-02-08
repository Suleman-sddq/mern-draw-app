const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

const { loginUser, registerUser, getUser, forgetPassword } = require('../controllers/userController')

router.post('/', registerUser);
router.post('/login', loginUser)
router.post('/forgetpassword', forgetPassword)
router.get('/getuser', protect, getUser);


module.exports = router