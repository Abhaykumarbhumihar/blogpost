const { default: mongoose } = require("mongoose");
const mongodb = require("mongoose");

const UserSchema = new mongodb.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
