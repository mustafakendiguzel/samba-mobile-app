const msql = require('mssql');
const sql = require('msnodesqlv8')

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
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function updateDetailedPriceList(menuItemId, price) {
    const config = {
      server: 'localhost',
      database: 'SAMBAPOSV5',
      user:'sa',
      password:'cb.1234',
      options:{
        encrypt: false,
        trustedConnection: true
      }
    }
    msql.connect(config, function(err) {
      if (err) console.log(err);
      const request = new msql.Request();

      console.log(price)
      console.log(menuItemId)
  
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
