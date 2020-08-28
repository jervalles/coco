const mysql = require('mysql')
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

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
          token: jwt.sign(JSON.stringify(newUser), jwtSecret) // ptete pas
        })
      })
  })
})

// USER LOGIN || POST
app.post("/login", async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  db.query('SELECT * FROM user WHERE email = ?',[email], (err, results) => {
    console.log({results})
    if (err) {
        res.json({
          status:false,
          message:'there are some error with query'
          })
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Wrong password' })
          }
          res.status(200).json({
            user: {
              userId: results[0].iduser,
              email: results[0].email,
              role: results[0].role
            },
            token: jwt.sign({ userId: results[0].iduser}, jwtSecret)
          })
        })
        .catch(err => res.status(500).json({ err }))
        // return res.status(200).json(results)
      } else {
        return res.status(401).json({ error: 'User not found' })
      }
    }
  })
})


// ITEMS FETCHING || GET
app.get("/api/items", (req, res) => {
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

app.listen(backendPort, (err) => {
    if (err) {
        throw new Error("Something bad happened...")
    } else {
        console.log(`Server is listening on ${backendPort}`)
    }
})