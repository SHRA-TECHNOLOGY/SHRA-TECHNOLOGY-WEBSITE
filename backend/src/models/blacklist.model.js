const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    }
},{timestamps:true});
const BlackListModel = mongoose.model("BlackList",tokenSchema);

module.exports = BlackListModel;