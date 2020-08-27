const mysql = require('mysql')
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

const {
    CONFIG: { jwtSecret, backendPort },
    db,
} = require("./conf")

const bcrypt = require("bcrypt")

const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// USER REGISTRATION || POST
app.post("/signup", async (req, res, next) => {
    const formData = req.body
    
    bcrypt.hash(formData.password, 10, (err, hash) => {
        formData.password = hash
        const newUser = formData
          db.query("INSERT INTO user SET ?", [newUser], (err, results) => {
            if (err) {
              return res.status(400).send(err.sqlMessage)
            }
            newUser.password = undefined
            newUser.id = results.insertId
            return res.status(201).send({
              user: newUser,
              token: jwt.sign(JSON.stringify(newUser), jwtSecret)
            })
          })
    })
})


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