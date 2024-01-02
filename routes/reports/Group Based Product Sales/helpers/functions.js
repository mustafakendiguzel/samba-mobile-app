const mssql = require("mssql");
const config = require("../../../../database/config");

async function getGroupBasedProductSales(req) {
  const pool = await mssql.connect(config);
  const menuItemName = req.query.menuItemName;
  const search = req.query.search;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const offset = (pageNumber - 1) * pageSize;

  let query = `
    SELECT Orders.*, MenuItems.*, MenuItems.Name as MenuItemNames, MenuItems.GroupCode as MenuItemGroupCode FROM Orders
    LEFT JOIN MenuItems ON Orders.MenuItemId = MenuItems.Id
  `;

  // Eğer hem menuItemName hem de search varsa, WHERE koşuluna ikisini de ekleyin
  if (menuItemName && search) {
    query += ` WHERE MenuItems.Name LIKE @menuItemName AND MenuItems.Name LIKE @search`;
  } else if (menuItemName) {
    query += ` WHERE MenuItems.Name LIKE @menuItemName`;
  } else if (search) {
    query += ` WHERE MenuItems.Name LIKE @search`;
  }

  query += ` ORDER BY Orders.Id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`;

  try {
    const result = await pool
      .request()
      .input(
        "menuItemName",
        mssql.NVarChar,
        menuItemName ? `${menuItemName}%` : null
      )
      .input("search", mssql.NVarChar, search ? `%${search}%` : null)
      .input("offset", mssql.Int, offset)
      .input("pageSize", mssql.Int, pageSize)
      .query(query);

    console.log("Sorgu Başarılı:", result.recordset);
    return result.recordset;
  } catch (error) {
    console.error("Sorgu Hatası:", error);
    throw error; // Hata durumunda hatayı tekrar fırlat
  } finally {
    await pool.close();
  }
}

module.exports = {
  getGroupBasedProductSales,
};
