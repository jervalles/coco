const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const morgan = require('morgan')

// Middleware logs.
app.use(morgan('dev'))

const newsRoutes = require('./routes/news')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

app.use('/api/news', newsRoutes)

app.use(bodyParser.json())

module.exports = app