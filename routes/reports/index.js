const express = require("express");
const router = express.Router();

const detailedPriceList = require("./Detailed Price");
const groupBasedProductSales = require("./Group Based Product Sales");

router.use("/detailed-price", detailedPriceList);
router.use("/group-based-product-sales", groupBasedProductSales);

module.exports = router;
