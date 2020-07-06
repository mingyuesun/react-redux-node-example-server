const mysql = require("mysql");

const client = mysql.createConnection({
  host: "localhost",
  port: 8443,
  user: "root",
  password: "",
  database: "login",
});

function sqlFn(sql, array, callback) {
  client.query(sql, array, (error, result) => {
    if (error) {
      console.log(new Error(error));
      return;
    } else {
      callback(result);
    }
  });
}

module.exports = sqlFn;
