const express = require("express");
const router = express.Router();
const helperFunctions = require("./helpers/functions");

router.get("/", async (req, res) => {
  try {
    const detailedPriceList = await helperFunctions.getDetailedPriceList();
    res.json({ data: detailedPriceList, dataLength: detailedPriceList.length });
  } catch (error) {
    console.error(error);
    res.status(400).send("Bir hata oluştu.");
  }
});

router.put("/", async (req, res) => {
  const menuItemId = req.body.menuItemId;
  const price = req.body.price;
  try {
    const detailedPriceList = await helperFunctions.updateDetailedPriceList(
      menuItemId,
      price
    );
    res.json({ data: detailedPriceList, dataLength: detailedPriceList.length });
  } catch (error) {
    console.error(error);
    res.status(400).send("Bir hata oluştu.");
  }
});

module.exports = router;
