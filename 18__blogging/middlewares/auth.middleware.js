import { verifyJwtToken } from "../utils/authentication";

async function isAuthenticated(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      next();
    }

    try {
      const payload = verifyJwtToken(token);
      req.user = payload;
    } catch (error) {}
    next();
  };
}

export { isAuthenticated };
