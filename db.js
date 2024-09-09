var mysql = require("mysql2");
var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "200521912Li@",
  database: "proyectoi_ing_software",
  port:3306
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("We did it!");
});

module.exports = conn;
