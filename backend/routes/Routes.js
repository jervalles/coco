const express = require("express")
const router = express.Router()

const itemsRoutes = require('./Item.route')
const usersRoutes = require('./Users.route')
const ordersRoutes = require('./Orders.route')
const ItemCategoriesRoutes = require('./ItemCategories.route')

router.use('/users', usersRoutes)
router.use('/items', itemsRoutes)
router.use('/orders', ordersRoutes)
router.use('/categories', ItemCategoriesRoutes)

module.exports = router