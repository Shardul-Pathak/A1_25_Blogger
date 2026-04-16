const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.MYSQLDBHOST,
  user     : process.env.MYSQLDBUN,
  password : process.env.MYSQLDBPASS,
  database : process.env.NYSQLDBNAME
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;

