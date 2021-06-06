// import mongoose from 'mongoose';
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // firstname: { type: String },
  // lastname: { type: String },
  // email: { type: String },
  // phone: { type: Number, required: true, unique: true, min: 10 },
  password: { type: String, minlength: 6 },
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

// UserSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;