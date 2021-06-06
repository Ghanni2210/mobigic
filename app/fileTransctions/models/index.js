// import mongoose from 'mongoose';
const mongoose = require("mongoose")
const uniqueValidator =  require("mongoose-unique-validator");
const Files = new mongoose.Schema({
  userId: { type: String, required: true },
  // firstname: { type: String },
  // lastname: { type: String },
  // email: { type: String },
  // phone: { type: Number, required: true, unique: true, min: 10 },
  path: { type: String },
  code: { type: Number, unique:true }
  // gender: { type: String, 'enum': ['male', 'female'] },
  // birthday: { type: String },
  // image: { type: String, required: true, default: " " },
  // status: { type: String, 'enum': ['registered', 'active', 'suspended', 'terminated'], required: true, default: 'active' },
  // notificationToken: { type: String, required: true, default: "N.A" },
  // referralCode: { type: String, default: "N.A" },
  // userReferralCode: { type: String, default: "N.A" },
},{
    timestamps:true
}
);

Files.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const filesModel = mongoose.model('files', Files);
module.exports = filesModel;