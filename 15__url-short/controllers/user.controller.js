const { setUser, getUser } = require("../auth");
const User = require("../models/user.model");

async function handleSignupUser(req, res) {
  console.log("YOU'RE IN handleSignupUser()");

  try {
    const { name, email, password } = req.body;
    const response = await User.create({
      name,
      email,
      password,
    });

    if (!response) {
      return res.status(401).json({
        err: "BACKEND: err creating user",
      });
    }

    // JWT
    const token = setUser(response);
    res.cookie("userjwt", token);

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
  console.log("YOU'RE IN handleLoginUser()");

  try {
    const { email, password } = req.body;
    const response = await User.findOne({
      email,
      password,
    });

    if (!response)
      return res.status(404).json({ err: "BACKEND: email/password is wrong" });

    // JWT
    const token = setUser(response);
    // res.cookie("userjwt", token);
    // res.json({ token });

    return res.status(200).json({
      msg: "user login aptly",
      response,
      token,
    });
  } catch (error) {
    console.log("BACKEND: err in handleLoginUser(): ", error);
    return res.status(500).json({
      err: "BACKEND: err in handleLoginUser()",
    });
  }
}

module.exports = { handleSignupUser, handleLoginUser };
