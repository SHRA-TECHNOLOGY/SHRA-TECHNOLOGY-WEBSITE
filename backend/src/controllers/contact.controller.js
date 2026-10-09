const contactModel = require("../models/contact.model");
const userModel = require("../models/auth.model")

// accept user problem

async function addContactDetails(req, res) {
  try {
    const { username, email, subject, message } = req.body;

    const contact = await contactModel.create({
      user: req.user.id,
      username,
      subject,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Your Problem send to company successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// fetch all user problem

async function getAllContactDetails(req, res) {
  try {

    const user = await userModel.findOne({_id:req.user.id}).select("role").lean()

    if(user.role === "admin"){

        const contacts = await contactModel.find().populate("user", "username email")

        return res.status(200).json({
            success:true,
            contacts
        })
    }

    return res.status(200).json({
        success:false,
        contacts:null
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { addContactDetails,getAllContactDetails };
