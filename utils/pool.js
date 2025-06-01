const mysql = require('mysql2/promise');
const poolOptions = require('./poolOptions');

const pool = mysql.createPool(poolOptions);

module.exports = pool;