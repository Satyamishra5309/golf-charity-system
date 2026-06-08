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


subscriptionType: {
  type: String,
  enum: [
    "monthly",
    "yearly",
    "none",
  ],
  default: "none",
},

subscriptionExpiry: {
  type: Date,
},

subscriptionActive: {
  type: Boolean,
  default: false,
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
