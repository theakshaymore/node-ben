const express = require("express");
const {
  getAllUsers,
  addUser,
  getUserById,
  editUserById,
  deleteUserById,
} = require("../middlewares/user.middleware");

getAllUsers;

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(editUserById)
  .delete(deleteUserById);

module.exports = router;
