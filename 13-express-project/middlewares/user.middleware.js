const User = require("../model/user.model");

async function getAllUsers(req, res) {
  try {
    const user = await User.find();
    res.status(200).json({ msg: "Users fetched successful", user });
  } catch (err) {
    res.status(400).json({
      err: "Not able to fetch users",
    });
  }
}

async function addUser(req, res) {
  const { firstname, lastname, email, jobtitle, gender } = req.body;
  //   userData.push({ ...body, id: userData.length + 1 });
  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      jobtitle,
      gender,
    });
    res.status(201).json({
      msg: "User created successfully",
      userid: user._id,
    });
  } catch (err) {
    res.status(400).json({
      err: "Error creating user",
    });
  }
}

async function getUserById(req, res) {
  try {
    const userid = req.params.id;
    const user = await User.findById(userid);
    res.status(200).json({
      msg: "Fetched used successfully",
      user,
    });
  } catch (err) {
    res.status(400).json({
      msg: "Error getching user",
    });
  }
}

async function editUserById(req, res) {
  try {
    const userid = req.params.id;
    const { firstname, lastname, email, jobtitle, gender } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: userid },
      { firstname, lastname, email, jobtitle, gender },
      { new: true }
    );
    !user
      ? res.status(400).json({
          msg: "no user found with id",
        })
      : res.status(200).json({
          msg: "user updated aptly",
          user,
        });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "error in user updation",
    });
  }
}

async function deleteUserById(req, res) {
  try {
    const user_id = req.params.id;
    const user = await User.findOneAndDelete({ _id: user_id });
    !user
      ? res.status(400).json({
          msg: "user not found with id",
        })
      : res.status(200).json({
          msg: "user deleted aptly",
          user,
        });
  } catch (err) {
    res.status(400).json({
      msg: "error deleted user",
    });
  }
}
module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  editUserById,
  deleteUserById,
};
