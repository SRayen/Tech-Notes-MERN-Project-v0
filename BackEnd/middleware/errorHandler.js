const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; //server error
  res.status(status);

  //In FrontEnd we are using Redux with RTK Query : any expected error it would be nice if you could say isError:true
  res.json({ message: err.message, isError: true });
};

module.exports = errorHandler;
