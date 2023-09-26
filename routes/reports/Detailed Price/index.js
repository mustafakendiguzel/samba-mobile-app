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

module.exports = router;
