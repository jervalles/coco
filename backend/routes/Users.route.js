const express = require('express')
const router = express.Router()

const userController = require('../controllers/User.controller')

// USER REGISTRATION || POST
router.post("/signup", userController.signupUser)
  
// USER LOGIN || POST
router.post("/login", userController.loginUser)

module.exports = router