const mssql = require("mssql");
const config = require("../../../../database/config");

async function getDetailedPriceList(pageSize, pageNumber, search) {
  const pool = await mssql.connect(config);
  const offset = (pageNumber - 1) * pageSize;
  const searchCondition = search ? "AND MenuItems.Name LIKE @search" : "";

  const query = `
    SELECT MenuItemPrices.*, MenuItemPortions.*, MenuItems.Name as MenuItemName, MenuItems.GroupCode as MenuItemGroupCode FROM MenuItemPrices
    INNER JOIN MenuItemPortions ON MenuItemPrices.MenuItemPortionId = MenuItemPortions.MenuItemId
    LEFT JOIN MenuItems ON MenuItemPortions.MenuItemId = MenuItems.Id
    WHERE 1=1 ${searchCondition}
    ORDER BY MenuItemPrices.Id OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `;

  try {
    const result = await pool
      .request()
      .input("search", mssql.VarChar, search ? `${search}%` : null) // `search` parametresi ile başlayanları getir
      .input("offset", mssql.Int, offset)
      .input("pageSize", mssql.Int, pageSize)
      .query(query);

    return result.recordset;
  } finally {
    await pool.close();
  }
}

async function updateDetailedPriceList(menuItemId, price) {
  const pool = await mssql.connect(config);

  const updateQuery = `
    UPDATE MenuItemPrices
    SET Price = @price
    WHERE MenuItemPortionId = @menuItemId;
  `;

  try {
    const result = await pool
      .request()
      .input("price", mssql.Decimal, price)
      .input("menuItemId", mssql.Int, menuItemId)
      .query(updateQuery);

    return result.rowsAffected;
  } finally {
    await pool.close();
  }
}

module.exports = {
  updateDetailedPriceList,
  getDetailedPriceList,
};
