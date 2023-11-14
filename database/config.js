// config.js

require("dotenv").config();

module.exports = {
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_DATABASE || "SAMBAPOSV5",
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "cb.12345678",
  options: {
    encrypt: false,
    trustedConnection: true,
  },
};
