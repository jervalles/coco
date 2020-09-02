const express = require('express')
const router = express.Router()

const ordersController = require('../controllers/Orders.controller')
const auth = require('../middlewares/Auth.middleware')

// ITEMS FETCHING || GET (NEED AUTH)
router.get("/", auth, ordersController.fetchOrders)

module.exports = router