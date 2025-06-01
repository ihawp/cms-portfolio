const mysql = require('mysql');
const poolOptions = require('./poolOptions');

const pool = mysql.createPool(poolOptions);

module.exports = pool;