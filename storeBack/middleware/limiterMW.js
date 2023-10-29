const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 Hours
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 24 Hours)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { limiter };
