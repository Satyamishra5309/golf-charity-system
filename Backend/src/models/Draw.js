import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
{
drawNumbers: {
type: [Number],
required: true,
},

drawMonth: {
  type: String,
  required: true,
},

totalPrizePool: {
  type: Number,
  default: 0,
},

jackpotCarryForward: {
  type: Number,
  default: 0,
},

winners: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    matchedCount: Number,

    prizeAmount: Number,
  },
],

status: {
  type: String,
  enum: ["simulation", "published"],
  default: "simulation",
},


},
{
timestamps: true,
}
);

const Draw = mongoose.model("Draw", drawSchema);

export default Draw;
