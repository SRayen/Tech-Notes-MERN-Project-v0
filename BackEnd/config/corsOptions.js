const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    //checks if the origin is present in the allowedOrigins array or if the origin is not specified
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //first param:error==>null //second param:allowed boolean : successful ==>true
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  /*The credentials property is set to true. This enables the server to include credentials
   (such as cookies, HTTP authentication, and client-side SSL certificates) in CORS requests. */
  credentials: true,
  /*optionsSccessStatus property is set to 200. This specifies the status code to be returned when handling
   preflight requests, which are sent by browsers to check if a CORS request is allowed before making the 
   actual request.*/
  optionsSccessStatus: 200,
};

module.exports = corsOptions;
