const express = require("express")
const router = express.Router()

const itemsRoutes = require('./Item.route')
const usersRoutes = require('./Users.route')
const ordersRoutes = require('./Orders.route')
const ItemCategoriesRoutes = require('./ItemCategories.route')

// Users routes
router.use('/users', usersRoutes)

// Items routes
router.use('/items', itemsRoutes)

// Orders routes
router.use('/orders', ordersRoutes)

// Categories routes
router.use('/categories', ItemCategoriesRoutes)

module.exports = router