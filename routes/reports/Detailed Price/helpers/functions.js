const mssql = require("mssql");
const config = require("../../../../database/config");

async function getDetailedPriceList(pageSize, pageNumber) {
  const pool = await mssql.connect(config);
  const offset = (pageNumber - 1) * pageSize;
  const query = `
    SELECT MenuItemPrices.*, MenuItemPortions.*, MenuItems.Name as MenuItemName, MenuItems.GroupCode as MenuItemGroupCode FROM MenuItemPrices
    INNER JOIN MenuItemPortions ON MenuItemPrices.MenuItemPortionId = MenuItemPortions.MenuItemId
    LEFT JOIN MenuItems ON MenuItemPortions.MenuItemId = MenuItems.Id
    ORDER BY MenuItemPrices.Id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY
  `;

  try {
    const result = await pool.request().query(query);
    return result.recordset;
  } finally {
    await pool.close();
  }
}

function updateDetailedPriceList(menuItemId, price) {
  msql.connect(config, function (err) {
    if (err) console.log(err);
    const request = new msql.Request();

    const updateQuery = `
      UPDATE MenuItemPrices
      SET Price = ${price}
      WHERE MenuItemPortionId = ${menuItemId};
    `;
    return new Promise((resolve, reject) => {
      request.query(updateQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

module.exports = {
  updateDetailedPriceList,
  getDetailedPriceList,
};
