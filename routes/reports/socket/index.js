const express = require("express");
require("dotenv").config();
const router = express.Router();
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json({ type: 'application/*+json' }))

var admin = require("firebase-admin");

var serviceAccount = require('./sammobile-44bd2-firebase-adminsdk-6hk00-6267f7df0c.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var jsonParser = bodyParser.json()


router.post("/",jsonParser, async (req, res) => {
  try {
    const payload = {
      notification : {
         title : req.body.title,
         body : req.body.body,
      }
    }
    const options = {
      priority: "high"
    }

    var registrationToken = ''

    admin.firestore().collection('fcmTokens').doc(req.headers.host).get().then(function(doc) {
      registrationToken = doc.data().token;
      admin.messaging().sendToDevice(registrationToken, payload, options)
    .then(function (response) {
      res.send('message succesfully sent !')
    })
    .catch(function (error) {
      res.send(error).status(500)
    });
    })
  } catch (error) {
    console.error(error);
    res.status(400).send("Bir hata oluştu.");
  }
});

module.exports = router;
