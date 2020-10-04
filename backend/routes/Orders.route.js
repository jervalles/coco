const express = require('express')
const router = express.Router()

const ordersController = require('../controllers/Orders.controller')
const auth = require('../middlewares/Auth.middleware')

// ORDERS FETCHING || GET (NEED AUTH)
router.get("/", auth, ordersController.fetchOrders)

// ORDERS CREATE || POST (NEED AUTH)
router.post("/", auth, ordersController.create)

// ORDER ARCHIVE || UPDATE (NEED AUTH)
router.put("/:id", auth, ordersController.archive)

module.exports = router