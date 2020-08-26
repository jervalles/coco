const express = require('express')
const app = express()
var admin = require("firebase-admin");

var serviceAccount = require("./coco-248ba-firebase-adminsdk-fdiij-a81367e9c4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coco-248ba.firebaseio.com"
});

app.get('/setAdmin', async (req,res) => {
    admin.auth()
        .setCustomUserClaims('xGmqAyUW1ZggN9nJtCPIXwWXfzy1', {
            type: 'administrator'
        }).then(() => console.log('done'))
})

app.listen(4000, () => console.log('listening on port 4000'))