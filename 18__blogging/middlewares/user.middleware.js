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
    res.redirect("/");
  }
}

export { handleSignup };
