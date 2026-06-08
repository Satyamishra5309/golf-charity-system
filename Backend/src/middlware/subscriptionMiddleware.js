
const subscriptionRequired =
  async (req, res, next) => {

    if (
      !req.user.subscriptionActive
    ) {

      return res.status(403).json({
        message:
          "Active subscription required",
      });

    }

    next();

  };

export default
subscriptionRequired;