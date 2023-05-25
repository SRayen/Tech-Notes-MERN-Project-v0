const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");
/* The role of express-rate-limit is to provide a mechanism for controlling the rate at which clients can
 make requests to an API or server. It sets specific limits on the number of requests a client can make within
  a defined time window, such as a certain number of requests per minute or per hour. */

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // Limit each IP to 5 login requests per `window` per minute
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  //Recommended in documentation
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginLimiter;
