import User from "../models/users.model.js";

async function handleSignup(req, res) {
  //
  const { fullName, email, password } = req.body;
  try {
    const response = await User.create({
      fullname: fullName,
      email: email,
      password: password,
    });
    res.redirect("/");
  } catch (error) {
    console.log("ERR at handleSignup() ", error);
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  try {
    const respopnse = await User.findOne({ email, password });
    if (!respopnse) {
      console.log("error checking user in DB");
    }
    res.redirect("/");
  } catch (error) {
    console.log("ERR at handleLogin() ", error);
  }
}

export { handleSignup, handleLogin };
