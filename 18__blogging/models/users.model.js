import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
    },

    profileurl: {
      type: String,
      default:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const response = await User.findOne({ email });

  if (!response) return false;

  const saltFromDB = response.salt;
  const passwordFromDB = response.password;

  const userProvidedHasedPassword = createHmac("sha256", saltFromDB)
    .update(password)
    .digest("hex");

  if (userProvidedHasedPassword === passwordFromDB) {
    return {
      _id: response._id,
      email: response.email,
      fullname: response.fullname,
      profileurl: response.profileurl,
      role: response.role,
    };
  }
  return false;
});

const User = model("user", userSchema);

export default User;
