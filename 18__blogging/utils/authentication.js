import JWT from "jsonwebtoken";

const SECRET = "MONICA";

function createJWTToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileurl: user.profileurl,
    role: user.role,
  };
  ss;

  const token = JWT.sign(payload, SECRET);

  return token;
}

function verifyJWTToken(token) {
  const token = JWT.verify(token, SECRET);
  return token;
}

export { createToken, verifyToken };
