import { verifyJwtToken } from "../utils/authentication.js";

function isAuthenticated(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Authentication required - no token",
      });
    }

    try {
      const payload = verifyJwtToken(token);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        msg: "Invalid or expired token",
      });
    }
  };
}

export { isAuthenticated };
