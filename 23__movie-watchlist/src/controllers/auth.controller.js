import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exist or not
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) {
      return res.status(400).json({
        success: false,
        error: "Email or password already exist",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert user
    const response = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // send response back
    if (response) {
      return res.status(200).json({
        success: true,
        message: "user register aptly",
      });
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

const loginUser = async (req, res) => {
  //
};

export { registerUser, loginUser };
