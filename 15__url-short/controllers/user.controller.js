const { setUser, getUser } = require("../auth");
const User = require("../models/user.model");

async function handleSignupUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const response = await User.create({
      name,
      email,
      password,
    });

    if (!response) {
      return res.status(401).json({
        err: "BACKEND: Invalid email or password",
      });
    }

    // JWT
    const token = setUser(response);
    res.cookie("user-token", token);

    return res.status(200).json({
      msg: "user created aptly",
      response,
    });

    // res.redirect("/url");
  } catch (error) {
    console.log("BACKEND: ERROR IN handleSignupUser(): ", error);
    return res.status(500).json({
      err: "ERROR IN handleSignupUser()",
    });
  }
}

async function handleLoginUser(req, res) {
  try {
    const { email, password } = req.body;
    const response = await User.findOne(
      {
        email,
        password,
      },
      { new: true }
    );

    // JWT
    const token = setUser(response);
    res.cookie("user-token", token);

    return res.status(200).json({
      msg: "user login aptly",
      response,
    });
  } catch (error) {
    console.log("BACKEND: err in handleLoginUser(): ", error);
    return res.status(500).json({
      err: "BACKEND: err in handleLoginUser()",
    });
  }
}

module.exports = { handleSignupUser, handleLoginUser };
