const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  // named export
  try {
    const token = req.cookies.authToken;
    console.log(".....................");
    if (!token) return res.status(400).json({ message: "token not found" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      // here the payload is a placeholder that will take the values from the payload , during the time of verification the decode occurs

      if (err) {
        return res
          .status(400)
          .json({ message: "Token verification failed", error: err.message });
      }

      console.log("Payload token:___", payload);
      req.user = payload;
      next();
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Admin not verified", error: error.message });
  }
};

module.exports.verifyRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    res.status(401).json({ message: "Un-authorized" });
  };
};
