const express = require("express")
const router = express.Router()

const itemsRoutes = require('./Item.route')
const usersRoutes = require('./Users.route')
const ordersRoutes = require('./Orders.route')

router.use('/users', usersRoutes)
router.use('/items', itemsRoutes)
router.use('/orders', ordersRoutes)

module.exports = router