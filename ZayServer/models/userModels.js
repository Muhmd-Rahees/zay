const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    avatar: {
      url: {
        type: String,
        default: "https://via.placeholder.com/150/cccccc/969696?text=Avatar",
      },
      publicId: {
        type: String,
        default: "",
      },
    },
    cartData: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      default: "User",
    },
  },
  { minimize: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  //pre is a middleware
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// default export
const User = mongoose.model("User", userSchema);
module.exports = User;
// named exports
// module.exports.User = mongoose.model("User", userSchema);