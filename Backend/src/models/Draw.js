import mongoose from "mongoose";

const drawSchema = new mongoose.Schema(
{
drawMonth: {
type: String,
required: true,
},


drawNumbers: [
  {
    type: Number,
  },
],

drawType: {
  type: String,
  enum: [
    "random",
    "algorithmic",
  ],
  default: "random",
},

status: {
  type: String,
  enum: [
    "simulation",
    "draft",
    "published",
  ],
  default: "simulation",
},

isSimulation: {
  type: Boolean,
  default: true,
},

jackpotRollover: {
  type: Number,
  default: 0,
},

totalPrizePool: {
  type: Number,
  default: 0,
},

winners: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Winner",
  },
],

createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

publishedAt: Date,


},
{
timestamps: true,
}
);

const Draw = mongoose.model(
"Draw",
drawSchema
);

export default Draw;
