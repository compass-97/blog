const mysql = require('mysql');

const options = {
    host: 'localhost',
    user: 'root',
    password: 'cbm96439633@',
    database: 'blog'
}

const db = mysql.createPool(options)

module.exports = db;