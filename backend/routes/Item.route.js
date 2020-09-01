const express = require('express')
const router = express.Router()

const itemController = require('../controllers/Item.controller')

// ITEMS FETCHING || GET
router.get("/", itemController.fetchItems)

module.exports = router