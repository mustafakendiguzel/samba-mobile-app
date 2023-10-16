const sql = require("msnodesqlv8");

function getDetailedPriceList() {
  const connectionString =
    "server=.;Database=SAMBAPOSV5;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  const query = `
    SELECT MenuItemPrices.*, MenuItemPortions.*, MenuItems.Name as MenuItemName, MenuItems.GroupCode as MenuItemGroupCode FROM MenuItemPrices
    INNER JOIN MenuItemPortions ON MenuItemPrices.MenuItemPortionId = MenuItemPortions.MenuItemId
    LEFT JOIN MenuItems ON MenuItemPortions.MenuItemId = MenuItems.Id
  `;

  return new Promise((resolve, reject) => {
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err); // Hata oluşursa reddedin
      } else {
        resolve(rows); // Başarılı ise sonuçları çözün
      }
    });
  });
}

module.exports = {
  getDetailedPriceList,
};