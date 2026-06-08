import Charity from "../models/Charity.js";
import User from "../models/User.js";

// ADD CHARITY
export const addCharity = async (req, res) => {

try {
const { name, description, image, website } = req.body;

const charity = await Charity.create({
  name,
  description,
  image,
  website,
});

res.status(201).json(charity);

} catch (error) {

res.status(500).json({
  message: error.message,
});


}

};

// GET ALL CHARITIES
export const getCharities = async (req, res) => {

try {

const charities = await Charity.find();

res.status(200).json(charities);

} catch (error) {

res.status(500).json({
  message: error.message,
});


}

};

// SELECT CHARITY
export const selectCharity = async (req, res) => {

try {


const { charityId, charityPercentage } = req.body;

const charity = await Charity.findById(charityId);

if (!charity) {
  return res.status(404).json({
    message: "Charity not found",
  });
}

const user = await User.findById(req.user._id);

user.selectedCharity = charityId;

if (charityPercentage >= 10) {
  user.charityPercentage = charityPercentage;
}

await user.save();

res.status(200).json({
  message: "Charity selected successfully",
  user,
});

} catch (error) {

res.status(500).json({
  message: error.message,
});

}

};
