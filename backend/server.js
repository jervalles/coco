const mysql = require('mysql')
const express = require("express")
const app = express()

const {
    CONFIG: { backendPort },
    db,
} = require("./conf")

    const bodyParser = require("body-parser")

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    )

// TEST || GET
app.get("/api/", (req, res) => {
    db.query(
      "SELECT * from wizard",
      (err, results) => {
        if (err) {
          res.status(500).send("Erreur lors de la récupération des données")
        } else {
          res.status(200).json(results)
        }
      }
    )
  })

app.listen(backendPort, (err) => {
    if (err) {
        throw new Error("Something bad happened...")
    } else {
        console.log(`Server is listening on ${backendPort}`)
    }
})