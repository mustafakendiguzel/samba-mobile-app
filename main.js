const express = require("express");
const port = 3000;
const connectionString =
  "server=.;Database=SAMBAPOSV5;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
const query = "Select * from Accounts";
const app = express();

const reportsRoute = require("./routes/reports/index");

app.use("/reports", reportsRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("App Running on port: 3000");
});
