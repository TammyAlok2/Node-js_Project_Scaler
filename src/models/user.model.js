import mongoose, { Schema } from "mongoose";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

// we will use pre middleware

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, // cloudaniry url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    passward: {
      type: String,
      required: [true, "Passward is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//arrow function ke pass this nahi hota hai 
userSchema.pre("save", async function (next) {
  if (!this.isModified("passward")) {
    return next();
  }

  this.passward = await bcrypt.hash(this.passward, 10);
  next();
});

userSchema.methods.isPasswardCorrect = async function (passward) {
  return await bcrypt.compare(passward, this.passward);
};

userSchema.methods.generateAccessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    }.Process.env.ACCESS_TOKEN_SECRET,
    {
      expriresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    }.Process.env.REFRESH_TOKEN_SECRET,
    {
      expriresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

// middleware : jane se pahle mujhse milte jana
