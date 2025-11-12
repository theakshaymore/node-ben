import JWT from "jsonwebtoken";

const SECRET = "MONICA";

function createJwtToken(user) {
  console.log("Creating JWT for user:", user);

  const payload = {
    _id: user._id,
    email: user.email,
    profileurl: user.profileurl,
    role: user.role,
  };

  console.log("JWT Payload:", payload); // Debug log

  const token = JWT.sign(payload, SECRET);

  console.log("Generated Token:", token); // Debug log

  return token;
}

function verifyJwtToken(token) {
  const payload = JWT.verify(token, SECRET);
  return payload;
}

export { createJwtToken, verifyJwtToken };
