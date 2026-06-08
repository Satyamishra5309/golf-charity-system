import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},


draw: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Draw",
  required: true,
},

matchedCount: {
  type: Number,
  required: true,
},

prizeAmount: {
  type: Number,
  required: true,
},

proofImage: {
  type: String,
  default: "",
},

verificationStatus: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending",
},

paymentStatus: {
  type: String,
  enum: ["pending", "paid"],
  default: "pending",
},


},
{
timestamps: true,
}
);

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;
