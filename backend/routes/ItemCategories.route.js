const express = require('express')
const router = express.Router()

const itemCategoriesController = require('../controllers/ItemCategories.controller')

// ITEMS FETCHING || GET
router.get("/", itemCategoriesController.fetchCategories)

module.exports = router