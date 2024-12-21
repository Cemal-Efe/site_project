const mysql = require('mysql2');
const connect_data = {
    host: 'localhost',
    user: 'root',
    database : 'node-app-test',
    password : 'secret baby sorry :)'
}
const db_connection = mysql.createConnection(connect_data);
module.exports = db_connection.promise();