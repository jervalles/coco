const express = require('express')
const router = express.Router()

const { 
    db,
    CONFIG: { jwtSecret } 
} = require("../conf")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// USER REGISTRATION || POST
router.post("/signup", async (req, res, next) => {
  
    const formData = req.body
  
    // Check if user with that email exists
    // const existingUser = await UserService.getByProperties({ email })
    
    bcrypt.hash(formData.password, 10, (err, hash) => {
      formData.password = hash
      
      const { email, password } = formData
      const newUser = { 
        email: email,
        password: password,
        role_id: 2
      }
  
        db.query("INSERT INTO user SET ?", [newUser], (err, results) => {
          if (err) {
            return res.status(400).send(err.sqlMessage)
          }
          newUser.password = undefined
          newUser.id = results.insertId
          return res.status(201).send({
            user: newUser
          })
        })
    })
  })
  
// USER LOGIN || POST
router.post("/login", async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    db.query('SELECT user.id, user.email, user.password, role.name as role FROM user LEFT JOIN role ON user.role_id = role.id WHERE email = ?',[email], (err, results) => {
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
                    userId: results[0].id,
                    email: results[0].email,
                    role: results[0].role
                    },
                    token: jwt.sign({ userId: results[0].id}, jwtSecret)
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

module.exports = router