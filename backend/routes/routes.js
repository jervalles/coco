const express = require("express")

const items = require("./items")

const router = express.Router()

router.use('/api/items', items)