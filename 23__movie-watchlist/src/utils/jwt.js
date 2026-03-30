import jwt from "jsonwebtoken";

const SECRET = "something";

export async function generateToken(user) {
  try {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    return "jwt error";
  }
}
