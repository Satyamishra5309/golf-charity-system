import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

name: {
type: String,
required: true,
},

email: {
  type: String,
  required: true,
  unique: true,
},

password: {
  type: String,
  required: true,
},

role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},

subscription: {
  type: String,
  enum: ["inactive", "monthly", "yearly"],
  default: "inactive",
},

charityPercentage: {
  type: Number,
  default: 10,
},

selectedCharity: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Charity",
  default: null,
},
});

const User = mongoose.model("User", userSchema);

export default User;
