import mongoose from "mongoose";

const charitySchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
},

description: {
  type: String,
  required: true,
},

image: {
  type: String,
  default: "",
},

website: {
  type: String,
  default: "",
},

},
{
timestamps: true,
}
);

const Charity = mongoose.model("Charity", charitySchema);

export default Charity;
