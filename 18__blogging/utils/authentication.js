import JWT from "jsonwebtoken";

const SECRET = "MONICA";

function createJwtToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
    profileurl: user.profileurl,
    role: user.role,
  };

  const token = JWT.sign(payload, SECRET);

  return token;
}

function verifyJwtToken(token) {
  const payload = JWT.verify(token, SECRET);
  return payload;
}

export { createJwtToken, verifyJwtToken };
