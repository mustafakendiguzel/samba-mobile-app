const sql = require("msnodesqlv8");

function getGroupBasedProductSales() {
  const connectionString =
    "server=.;Database=SAMBAPOSV5;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
  const query = `
    SELECT Orders.*, MenuItems.*, MenuItems.Name as MenuItemNames, MenuItems.GroupCode as MenuItemGroupCode  FROM Orders
    LEFT JOIN MenuItems ON Orders.MenuItemId = MenuItems.Id
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
  getGroupBasedProductSales,
};
