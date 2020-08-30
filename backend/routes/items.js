const express = require('express')
const router = express.Router()

const { db } = require("../conf")

// ITEMS FETCHING || GET
router.get("/", (req, res) => {
    db.query(
      "SELECT * from items",
      (err, results) => {
        if (err) {
          res.status(500).send("Erreur lors de la récupération des données")
        } else {
          res.status(200).json(results)
        }
      }
    )
  })

module.exports = router