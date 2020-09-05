const express = require('express')
const router = express.Router()

const ordersController = require('../controllers/Orders.controller')
const auth = require('../middlewares/Auth.middleware')

// ORDERS FETCHING || GET (NEED AUTH)
router.get("/", auth, ordersController.fetchOrders)

// ORDERS CREATE || POST (NEED AUTH)
router.post("/", auth, ordersController.create)

// ORDER DELETE || DELETE (NEED AUTH)
router.delete("/:id", auth, ordersController.delete)

module.exports = router