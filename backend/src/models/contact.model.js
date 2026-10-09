const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  username:{
    type:String,
    required:true,
    trim: true,
  },

  email:{
    type:String,
    required:true,
  },

  subject:{
    type:String,
    required:true
  },

  message:{
    type:String,
    required:true
  }

});


const contactModel = mongoose.model("Contact",contactSchema);

module.exports = contactModel