const User = require("../models/user.model");
const { getUser } = require("../auth");

async function isAuthorized(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ msg: "unauthorized: no token" });

    const payload = getUser(token);
    if (!payload) return res.status(401).json({ msg: "invalid/expired token" });

    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ msg: "user not found" });

    req.user = user;
    return next();
  } catch (error) {
    console.error("isAuthorized error:", error);
    return res.status(500).json({ msg: "server error" });
  }
}

module.exports = isAuthorized;
