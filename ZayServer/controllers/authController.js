const user = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
  try {
    const { email } = req.body;
    const isExist = await user.findOne({ email });

    if (!isExist) {
      const newUser = await user.create(req.body);
      return res.status(200).json({ message: "Sign Up Success" });
    }

    res.status(409).json({ message: "User already exist with this email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await user.findOne({ username: username });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const auth = await bcrypt.compare(password, existingUser.password);
    console.log(auth);

    if (!auth) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
        role: existingUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3hr" }
    );

    res.cookie("authToken", token, { maxAge: 3 * 60 * 60 * 1000 });

    res.status(200).json({ message: "Sign In Successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.me = async (req, res) => {
  try {
    const userInfo = await user.findById(req.user.id); // after verifyToken middleware we set user info into req.user (id = mongoos id)
    console.log(userInfo);
    res.status(200).json({ message: "User found", user: userInfo }); // authSlice req.data.user
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.userLogOut = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // In authController.js
// module.exports.updateProfile = async (req, res) => {
//   try {
//     const { username, email } = req.body;

//     // Check if email is already taken by another user
//     if (email) {
//       const existingUser = await user.findOne({
//         email,
//         _id: { $ne: req.user.id },
//       });

//       if (existingUser) {
//         return res.status(400).json({
//           success: false,
//           message: "Email already in use",
//         });
//       }
//     }

//     const updatedUser = await user
//       .findByIdAndUpdate(req.user.id, { username, email }, { new: true })
//       .select("-password -confirmPassword");

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update profile",
//     });
//   }
// };

// module.exports.changePassword = async (req, res) => {
//   try {
//     const { currentPassword, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Passwords do not match",
//       });
//     }

//     const existingUser = await user.findById(req.user.id);

//     const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Current password is incorrect",
//       });
//     }

//     // Update password and confirmPassword
//     existingUser.password = password;
//     existingUser.confirmPassword = password; // This will be hashed by the pre-save middleware
//     await existingUser.save();

//     res.status(200).json({
//       success: true,
//       message: "Password updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to change password",
//     });
//   }
// };

// Update user profile
module.exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await user.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Change user password
module.exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userData = await user.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, userData.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect current password" });

    userData.password = await bcrypt.hash(newPassword, 10);
    await userData.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password" });
  }
};
