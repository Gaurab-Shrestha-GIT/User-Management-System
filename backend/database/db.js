const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "user_management_system",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Database is Connected");
});

module.exports = db;
