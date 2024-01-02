const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const helperFunctions = require("./helpers/functions");
var app = express();
app.use(bodyParser.json({ type: "application/*+json" }));
var jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const search = req.query.search;
    console.log(search);
    const detailedPriceList = await helperFunctions.getDetailedPriceList(
      pageSize,
      pageNumber,
      search
    );

    res.json({ data: detailedPriceList, dataLength: detailedPriceList.length });
  } catch (error) {
    console.error(error);
    res.status(400).send("Bir hata oluştu.");
  }
});

router.put("/", jsonParser, async (req, res) => {
  const menuItemId = req.body.menuItemId;
  const price = req.body.price;
  try {
    const detailedPriceList = await helperFunctions.updateDetailedPriceList(
      menuItemId,
      price
    );
    res.json({ data: detailedPriceList });
  } catch (error) {
    console.error(error);
    res.status(400).send("Bir hata oluştu.");
  }
});

module.exports = router;
