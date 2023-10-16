const express = require("express");
const router = express.Router();
const PieSocket = require("piesocket-nodejs");

var piesocket = new PieSocket({
    clusterId: 's10270.fra1',
    apiKey: 'MdBrJajRfapopSzNvIDR8LfHRoOL3O0Y7aWuXxte',
    secret: 'bbtDppomAS8b9xZpfCfnOPOeCRUHGXZa'
});


router.post("/", async (req, res) => {
  try {
    JSON.parse(req.body);
    piesocket.publish('room',"text",);
    res.status(200).send('okey');
  } catch (error) {
    console.error(error);
    res.status(400).send("Bir hata oluştu.");
  }
});

module.exports = router;