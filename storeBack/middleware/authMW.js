const jwt = require("jsonwebtoken");
const config = require("config");

function authMW(...roles) {
  return async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      res.statusMessage = "Access Denied. No token provided";
      res.status(401).send("Access Denied. No token provided");
      return;
    }

    let rolesObj = {
      isAdmin: false,
      isBusiness: false,
      userOwner: false,
      cardOwner: false,
    };

    try {
      const decode = jwt.verify(token, config.get("auth.JWT_SECRET"));
      req.user = decode;

      if (!roles || roles.length == 0) {
        next();
        return;
      }

      if (roles.includes("isAdmin") && req.user.isAdmin) {
        rolesObj.isAdmin = true;
      }

      if (roles.includes("userOwner") && req.user._id == req.params.id) {
        rolesObj.userOwner = true;
      }

      let rolesValArr = [];
      roles.forEach((role) => {
        rolesValArr.push(rolesObj[role]);
      });
      let rolesValidation = rolesValArr.reduce(
        (accumulator, currentValue) => accumulator || currentValue,
        false
      );

      if (rolesValidation) {
        next();
      } else {
        res.statusMessage = "User is not authorized to do that operation.";
        res.status(400).send("User is not authorized to do that operation.");
        return;
      }
    } catch (err) {
      res.statusMessage = "Invalid Token";
      res.status(400).send("Invalid Token");
      return;
    }
  };
}

module.exports = authMW;
