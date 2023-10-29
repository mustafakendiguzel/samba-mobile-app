const express = require("express");
const router = express.Router();
const PieSocket = require("piesocket-nodejs");
require("dotenv").config();

var piesocket = new PieSocket({
  clusterId: process.env.CLUSTER_ID,
  apiKey: process.env.API_KEY,
  secret: process.env.SECRET,
});

router.post("/", async (req, res) => {
  try {
    JSON.parse(req.body);
    piesocket.publish("room", "text");
    res.status(200).send("okey");
  } catch (error) {
    console.error(error);
    res.status(400).send("Bir hata oluştu.");
  }
});

module.exports = router;
