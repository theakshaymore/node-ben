import User from "../models/users.model.js";

async function handleSignup(req, res) {
  const { fullName, email, password } = req.body;

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

  try {
    const response = await User.matchPassword(email, password);

    if (!response) {
      return res.status(400).json({
        success: false,
        msg: "password is wrong",
      });
    }

    res.status(200).json({
      success: true,
      msg: "login successful",
      user: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}

export { handleSignup, handleLogin };
