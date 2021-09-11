const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please provide a username."]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide a valid email address."]
    },
    avatar: {
      type: String,
      default: "https://www.chocolatebayou.org/wp-content/uploads/No-Image-Person-1536x1536.jpeg"
    },
    bio: String,
    password: {
      type: String,
      required: [true, "Please provide a password."],
    }
  }
)

const User = mongoose.model('User', UserSchema);

module.exports = User;