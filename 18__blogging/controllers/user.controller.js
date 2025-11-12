import User from "../models/users.model.js";
import { createJwtToken } from "../utils/authentication.js";

async function handleSignup(req, res) {
  const { fullName, email, password } = req.body;
  console.log("=== LOGIN REQUEST RECEIVED ===", email);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "Email already registered. Please login instead",
      });
    }

    const newUser = await User.create({
      fullname: fullName,
      email: email,
      password: password,
    });

    return res.status(200).json({
      success: true,
      msg: "user created aptly",
      user: {
        id: newUser._id,
        fullnam: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log("ERR at handleSignup() ", error);
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  console.log("=== LOGIN REQUEST RECEIVED ===", email);

  try {
    const response = await User.matchPassword(email, password);

    if (!response) {
      return res.status(400).json({
        success: false,
        msg: "password is wrong",
      });
    }
    console.log("User response:", response);
    const jwtToken = createJwtToken(response);
    console.log("TOKEN " + jwtToken);

    if (!jwtToken) {
      return res.status(400).json({
        success: false,
        msg: "JWT is wrong",
      });
    }

    res.status(200).json({
      success: true,
      msg: "login successful",
      user: response,
      token: jwtToken,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

export { handleSignup, handleLogin };
