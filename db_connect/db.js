const mysql = require('mysql2');
const connect_data = {
    host: 'localhost',
    user: 'root',
    database : 'node-app-test',
    password : 'cemal7769'
}
const db_connection = mysql.createConnection(connect_data);
module.exports = db_connection.promise();