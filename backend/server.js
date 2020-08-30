const express = require("express")
const app = express()

const itemsRoutes = require('./routes/items')
const usersRoutes = require('./routes/users')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const {
    CONFIG: { backendPort },
} = require("./conf")

const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use('/api/items', itemsRoutes)
app.use('/api/users', usersRoutes)

app.listen(backendPort, (err) => {
    if (err) {
        throw new Error("Something bad happened...")
    } else {
        console.log(`Server is listening on ${backendPort}`)
    }
})