const express = require("express");
const mysql2 = require("mysql2/promise");
const app = express();
const dbConn = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: "localhost",
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

async function testDatabaseConnection() {
  try {
    const [rows, fields] = await dbConnection.execute(
      "SELECT 'test' AS result"
    );
    console.log(rows);
  } catch (error) {
    console.error(error.message);
  }
}
// dbConn.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });
testDatabaseConnection();
module.exports = dbConn;
