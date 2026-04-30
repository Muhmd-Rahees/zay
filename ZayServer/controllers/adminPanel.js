const user = require("../models/userModels");

const userCount = async (req, res) => {
  try {
    const user_count = await user.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Total user count retrieved successfully",
      user_count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user count",
      error: error.message,
    });
  }
};

module.exports = {userCount}