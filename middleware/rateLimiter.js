const { RateLimiterMemory } = require('rate-limiter-flexible');

const authRateLimiter = new RateLimiterMemory({
    points: 2,
    duration: 60 * 60,
});

const rateLimiterMiddleware = async (req, res, next) => {
    try {
        const clientIP = req.ip || req.connection.remoteAddress;
        
        await authRateLimiter.consume(clientIP);
        next();
    } catch (error) {
        if (error.remainingPoints === 0) {
            return res.status(429).json({
                error: 'Too many attempts. Please try again later.',
                retryAfter: Math.ceil(error.msBeforeNext / 1000)
            });
        }
        next(error);
    }
};

module.exports = rateLimiterMiddleware; 