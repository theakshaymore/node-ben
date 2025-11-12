import JWT from "jsonwebtoken";

const SECRET = "MONICA";

function createToken(user) {
  const payload = {
    fullname: user.fullname,
    email: user.email,
    profileurl: user.profileurl,
    role: user.role,
  };

  const token = JWT.sign(payload, SECRET);

  return token;
}

function verifyToken(token) {
  const token = JWT.verify(token, SECRET);
  return token;
}

export { createToken, verifyToken };
