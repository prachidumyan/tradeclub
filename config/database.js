
const mysql = require('mysql2');
//------ Connect Databases ----------
const db = mysql.createPool({
    host     : process.env.APP_URL,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
}).promise();

module.exports = db;

