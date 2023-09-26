const express = require("express");
const router = express.Router();
const helperFunctions = require("./helpers/functions");

router.get("/", async (req, res) => {
  try {
    const detailedPriceList = await helperFunctions.getGroupBasedProductSales();
    const menuItemName = req.query.menuItemName;
    const checkQueryIsNotEmpty = Object.keys(req.query).length;
    const filteredDetailedPrice = detailedPriceList.filter((detailedPrice) => {
      if (detailedPrice.MenuItemName == menuItemName) {
        return detailedPrice;
      }
    });
    res.json(
      checkQueryIsNotEmpty
        ? {
            data: filteredDetailedPrice,
            dataLength: filteredDetailedPrice.length,
          }
        : { data: detailedPriceList, dataLength: detailedPriceList.length }
    );
  } catch (error) {
    console.error(error);
    res.status(400).send("Bir hata oluştu.");
  }
});

module.exports = router;
