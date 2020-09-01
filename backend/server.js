// Server module
const express = require("express")

// Express instance
const app = express()

// Getting routes
const routes = require("./routes/Routes")

// Cors allows the server to request resources from another url
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Configuration
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

// Routes setup
app.use('/api', routes)

// Listening server with the defined port
app.listen(backendPort, (err) => {
    if (err) {
        throw new Error("Something bad happened...")
    } else {
        console.log(`Server is listening on ${backendPort}`)
    }
})