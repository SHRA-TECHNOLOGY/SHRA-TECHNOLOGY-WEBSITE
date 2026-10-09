const userModel = require("../models/auth.model");
const bcrypt = require("bcrypt");

// update account settings controller here

async function accountController(req, res) {
  try {
    const { fullName, newEmail, city, bio } = req.body;

    const userId = req.user?.id;

    const updateData = {};

    // Empty values ko ignore karo
    if (fullName?.trim()) {
      updateData.fullName = fullName.trim();
    }

    if (newEmail?.trim()) {
      updateData.email = newEmail.trim();
    }

    if (city?.trim()) {
      updateData.city = city.trim();
    }

    if (bio?.trim()) {
      updateData.bio = bio.trim();
    }

    // Agar update karne ke liye kuch bhi nahi hai
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid changes provided",
      });
    }

    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account settings updated successfully",
      user,
    });
  } catch (error) {
    console.error("Account Update Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// password update settings

async function passwordSettings(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    //fetch user
    const user = await userModel
      .findOne({ _id: req.user?.id })
      .select("_id password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Please must be login or register !",
      });
    }

    // check current password are same or not
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isValidPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid your current password !",
      });
    }

    // convert new password into hash form
    const hashNewPassword = await bcrypt.hash(newPassword, 10);

    // update password here
    const userUpdate = await userModel.findOneAndUpdate(
      { _id: user._id },
      {
        password: hashNewPassword,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successful.",
      userUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}



module.exports = { accountController, passwordSettings };
