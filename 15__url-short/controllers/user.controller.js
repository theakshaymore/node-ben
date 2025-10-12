const { setUser } = require("../auth");
const User = require("../models/user.model");

async function handleAddUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const response = await User.create({
      name,
      email,
      password,
    });

    // JWT
    const token = setUser(response);
    res.cookie("token", token);

    res.status(200).json({
      msg: "user created aptly",
      response,
    });
  } catch (error) {
    console.error("handleAddUser error:", error);
    return res.status(500).json({
      err: "internal server error",
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

    res.status(200).json({
      msg: "user login aptly",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: "internal server error",
    });
  }
}

module.exports = { handleAddUser, handleLoginUser };
