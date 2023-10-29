const fs = require("fs");
const onFinished = require("on-finished");

// Middleware to log 400 errors to a file
function loggerMW(req, res, next) {
  // Create a log file stream
  const date = new Date();
  const dateYear = date.getFullYear();
  const dateMonth =
    String(date.getMonth() + 1).length == 2
      ? date.getMonth() + 1
      : `0${date.getMonth() + 1}`;
  const dateDay = date.getDate();
  const dateHour = date.getHours();
  const dateMinute =
    String(date.getMinutes()).length == 2
      ? date.getMinutes()
      : `0${date.getMinutes()}`;
  const dateSecond =
    String(date.getSeconds()).length == 2
      ? date.getSeconds()
      : `0${date.getSeconds()}`;
  const logStream = fs.createWriteStream(
    `./logs/log_${dateYear}_${dateMonth}_${dateDay}.log`,
    {
      flags: "a",
    }
  );

  onFinished(res, (err, response) => {
    if (res.statusCode >= 400) {
      const logData = `${dateHour}:${dateMinute}:${dateSecond} - URL: ${req.originalUrl}, Status Code: ${res.statusCode}, Message: ${res.statusMessage}\n`;
      logStream.write(logData);
    }
  });

  next();
}

module.exports = loggerMW;
