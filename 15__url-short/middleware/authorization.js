const { getUser } = require("../auth");

async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies["user-token"];

    if (!token) {
      return res.status(401).json({ err: "BACKEND: Please login first" });
    }

    const user = getUser(token);

    if (!user) {
      return res.status(401).json({ err: "BACKEND: Invalid or expired token" });
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

module.exports = isAuthenticated;
