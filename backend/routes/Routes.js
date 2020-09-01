const express = require("express")
const router = express.Router()

const itemsRoutes = require('./Item.route')
const usersRoutes = require('./Users.route')


router.use('/users', usersRoutes)
router.use('/items', itemsRoutes)


module.exports = router