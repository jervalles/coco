const express = require('express')
const router = express.Router()

const auth = require('../middlewares/Auth.middleware')

const itemController = require('../controllers/Item.controller')

// ITEMS FETCHING || GET
router.get("/", auth, itemController.fetchItems)

module.exports = router