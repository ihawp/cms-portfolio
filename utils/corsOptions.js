const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://ihawp.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
    credentials: true,
}

module.exports = corsOptions;