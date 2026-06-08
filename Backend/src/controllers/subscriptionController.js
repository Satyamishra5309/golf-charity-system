
import User from "../models/User.js";

// BUY PLAN
export const buySubscription =
  async (req, res) => {

    try {

      const {
        type,
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      let expiryDate =
        new Date();

      if (
        type === "monthly"
      ) {

        expiryDate.setMonth(
          expiryDate.getMonth() + 1
        );

      } else if (
        type === "yearly"
      ) {

        expiryDate.setFullYear(
          expiryDate.getFullYear() + 1
        );

      }

      user.subscriptionType =
        type;

      user.subscriptionExpiry =
        expiryDate;

      user.subscriptionActive =
        true;

      await user.save();

      res.json({
        message:
          "Subscription activated",
        user,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// CANCEL PLAN
export const cancelSubscription =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      user.subscriptionActive =
        false;

      user.subscriptionType =
        "none";

      await user.save();

      res.json({
        message:
          "Subscription cancelled",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };
