require("dotenv").config()
const mysql = require("mysql")

let CONFIG = {
    backendPort: process.env.BACKEND_PORT || "8080",
    jwtSecret: process.env.JWT_SECRET || "jwt_please_change"
}

const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST || "example.org", // server address
    user: process.env.DB_USER || "bob", // username
    password: process.env.DB_PASSWORD || "secret", // database password
    database: process.env.DB_DATABASE || "my_db" // database name
})

module.exports = {
    CONFIG,
    db,
  };