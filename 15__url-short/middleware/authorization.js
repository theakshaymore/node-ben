const { getUser } = require("../auth");

async function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    let token = null;
    token = authHeader.split("Bearer ")[1]; // "Bearer 127189hh1s81w71"

    if (!token) {
      // return res.redirect("/login");
      console.log("JWT ERROR");
      return res.status(401).json({ err: "JWT: Please login first" });
    }

    const user = getUser(token);

    if (!user) {
      return res
        .status(401)
        .json({ err: "BACKEND: Invalid or expired jwt token" });
    }

    req.user = user; // Attach user info to request
    next();
  } catch (error) {
    console.log("BACKEND: err in isAuthenticated(): ", error);
    return res.status(404).json({
      err: "BACKEND: err in isAuthenticated()",
    });
  }
}

module.exports = { isAuthenticated };
