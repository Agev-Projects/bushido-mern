const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const lists = require("./lists");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Error: Please enter an username"],
      unique: true,
      minlength: [3, "Error: Username should be 3 characters minimum"],
      maxlength: [12, "Error: Username should be 12 characters maximum"],
    },
    email: {
      type: String,
      required: [true, "Error: Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Error: Invalid Email"],
    },
    password: {
      type: String,
      required: [true, "Error: Please enter a password"],
      minlength: [6, "Error: Password should be 6 characters minimum"],
    },
    profilePic: {
      type: String,
      default: "https://i.ibb.co/nsKb6XV/default-picture.jpg",
    },
    list: {
      type: lists,
      default: {},
    },
  },
  { timestamps: true }
);

//Encrypt Password before saving
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

//Login Method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Error: Incorrect Password");
  }
  throw Error("Error: Incorrect Email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
