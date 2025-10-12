const jwt = require("jsonwebtoken");
const SECRET = "MONICA";

function setUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, SECRET);
}

function getUser(token) {
  try {
    jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = { setUser, getUser };
