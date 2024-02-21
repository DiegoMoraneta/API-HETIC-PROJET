require('dotenv').config(); 

var sql = require("mssql");
var connect = function() {
    var conn = new sql.ConnectionPool({
        user: process.env.DB_USER, // Updated to use environment variables
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME
    });

    return conn;
};

module.exports = connect;
