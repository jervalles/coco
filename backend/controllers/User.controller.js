const validator = require("email-validator")
const passwordValidator = require('password-validator')

const schema = new passwordValidator()
schema
    .is().min(5)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values
    .has().symbols(1)

/**
 * @controller UserController
 * @description Handling users requests
 * @method register
 * @method login
 */

const { 
    db,
    CONFIG: { jwtSecret } 
} = require("../conf")

const UserService = require('../services/User.service')

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


/**
 * @description register a new user
 * @listens /api/users/signup
 * @method register
 * @param {req} req request
 * @param {res} res response
 * @param {next} next callback method to call next middleware
 * @returns {Object} new user json format
 */
exports.signupUser = async (req, res, next) => {
  
    const formData = req.body
    let { email, password } = formData

    try {

        // Check if the email format is valid
        const validEmail = validator.validate(email)

        if (!validEmail) {
            return res.status(401).json('Email format not valid')
        }

        // Check if user with that provided email exists
        const existingUser = await UserService.getByEmail(email)

        if (existingUser) {
            return res.status(409).json('User with this email already exists')
        }

        // Check if the password has the minimum configuration
        const validPassword = schema.validate(password)

        if (!validPassword) {
            return res.status(401).json('Password is not safe')
        }
        
        bcrypt.hash(password, 10, (err, hash) => {
            password = hash
            
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

    } catch (err) {
        return next(err)
    }
}

/**
 * @description log an user
 * @listens /api/users/login
 * @method login
 * @param {req} req request
 * @param {res} res response
 * @param {next} next callback method to call next middleware
 * @returns {Object} user json format
 */
exports.loginUser = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    try {

        // Check if the email format is valid
        const validEmail = validator.validate(email)

        if (!validEmail) {
            return res.status(409).json('Email format not valid')
        }

        db.query('SELECT user.id, user.email, user.password, role.name as role \
        FROM user LEFT JOIN role ON user.role_id = role.id WHERE email = ?',[email], (err, results) => {
            
            if (err) { 
                return res.json({
                    message:'there are some error with query'
                })
            }

            // user found or not with that email
            const user = results[0]

            // if there is no user with that email
            if (!user) {
                return res.status(400).json({ error: 'User not found' })
            }

            // compare the user password with the input password
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

        })
    } catch (err) {
        return next(err)
    }
}