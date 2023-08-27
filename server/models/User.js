import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email cannot be empty"],
      validate: {
        validator: validator.isEmail,
        message: "not a valid email",
      },
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password cannot be empty"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.hashPassword = async function (password) {
  return await bcrypt.hashSync(password, 10);
};

UserSchema.methods.createAccessToken = async function () {
  return jwt.sign(
    { userId: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export default mongoose.model("User", UserSchema);
