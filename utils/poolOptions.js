const poolOptions = {
    host: 'localhost',
    database: 'new-portfolio',
    user: 'root',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    maxIdle: 10
};

module.exports = poolOptions;
