const jwt = require('jsonwebtoken')

// Configuration
const {
    CONFIG: { jwtSecret },
} = require("../conf")

// This middleware check if a user is authed and if he has a valid token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, jwtSecret)
        const userId = decodedToken.userId

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID not valid !'
        } else {
            next()
        }

    } catch {
        res.status(401).json({
            error: 'Authentication error !'
          });
    }
}