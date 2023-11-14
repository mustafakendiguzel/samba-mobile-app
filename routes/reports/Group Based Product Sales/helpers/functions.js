const mssql = require("mssql");
const config = require("../../../../database/config");

async function getGroupBasedProductSales(req) {
  const pool = await mssql.connect(config);
  const menuItemName = req.query.menuItemName;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const offset = (pageNumber - 1) * pageSize;

  let query = `
    SELECT Orders.*, MenuItems.*, MenuItems.Name as MenuItemNames, MenuItems.GroupCode as MenuItemGroupCode FROM Orders
    LEFT JOIN MenuItems ON Orders.MenuItemId = MenuItems.Id
  `;

  if (menuItemName) {
    query += ` WHERE MenuItems.Name = '${menuItemName}'`;
  }

  query += ` ORDER BY Orders.Id OFFSET ${offset} ROWS FETCH NEXT ${pageSize} ROWS ONLY`;

  try {
    const result = await pool.request().query(query);
    return result.recordset;
  } finally {
    await pool.close();
  }
}

module.exports = {
  getGroupBasedProductSales,
};
