const loginAttempts = {};

function addToTries(ip) {
  if (loginAttempts[ip]) {
    loginAttempts[ip].tries += 1;
  } else {
    loginAttempts[ip] = {
      tries: 1,
    };
  }
}

function blockLogin(ip) {
  loginAttempts[ip]["blockUntil"] = Date.now() + 24 * 60 * 60 * 1000;
}

function getLoginStatus(ip) {
  return loginAttempts[ip];
}

function removeBlocked(ip) {
  delete loginAttempts[ip];
}

const loginMW = (req, res, next) => {
  if (
    loginAttempts[req.ip] &&
    loginAttempts[req.ip].blockUntil &&
    Date.now() < loginAttempts[req.ip].blockUntil
  ) {
    res.statusMessage = `Ip ${req.ip} is blocked until ${new Date(
      loginAttempts[req.ip].blockUntil
    ).toLocaleString()}.`;
    res
      .status(409)
      .send(
        `Ip ${req.ip} is blocked until ${new Date(
          loginAttempts[req.ip].blockUntil
        ).toLocaleString()}.`
      );
    return;
  }
  if (
    loginAttempts[req.ip] &&
    loginAttempts[req.ip].blockUntil &&
    Date.now() > loginAttempts[req.ip].blockUntil
  ) {
    removeBlocked[req.ip];
  }
  next();
};

module.exports = {
  addToTries,
  getLoginStatus,
  blockLogin,
  loginMW,
  removeBlocked,
};
