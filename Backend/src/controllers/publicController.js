
import User from "../models/User.js";

import Charity from "../models/Charity.js";

import Draw from "../models/Draw.js";

export const getHomeStats =
  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalCharities =
        await Charity.countDocuments();

      const draws =
        await Draw.find();

const totalPrizePool =
  draws.reduce(
    (acc, curr) =>
      acc +
      (curr.prizePool || 0),
    0
  );

      res.json({

        totalUsers,

        totalCharities,

        totalPrizePool,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };
