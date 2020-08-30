const express = require('express')
const app = express()
var admin = require("firebase-admin");

var serviceAccount = require("./coco-248ba-firebase-adminsdk-fdiij-a81367e9c4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://" // SET FIREBASE DATABASE URL
});

app.get('/setAdmin', async (req,res) => {
    admin.auth()
        .setCustomUserClaims('setUidHere', { // SET UID HERE
            type: 'administrator'
        }).then(() => console.log('done'))
})

app.listen(4000, () => console.log('listening on port 4000'))