import Winner from "../models/Winner.js";

// CREATE WINNER RECORD
export const createWinner = async (
user,
draw,
matchedCount,
prizeAmount
) => {

await Winner.create({
user,
draw,
matchedCount,
prizeAmount,
});

};

// UPLOAD PROOF
export const uploadProof =
  async (req, res) => {

    try {

      const winner =
        await Winner.findById(
          req.params.id
        );

      if (!winner) {

        return res.status(404).json({
          message:
            "Winner not found",
        });

      }

      winner.proofImage =
        req.file.path;

      await winner.save();

      res.json({
        message:
          "Proof uploaded",
        image:
          winner.proofImage,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// VERIFY WINNER
export const verifyWinner = async (req, res) => {

try {


const { status } = req.body;

const winner = await Winner.findById(
  req.params.id
);

if (!winner) {
  return res.status(404).json({
    message: "Winner not found",
  });
}

winner.verificationStatus = status;

await winner.save();

res.status(200).json(winner);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}

};

// MARK AS PAID
export const markAsPaid = async (req, res) => {

try {


const winner = await Winner.findById(
  req.params.id
);

if (!winner) {
  return res.status(404).json({
    message: "Winner not found",
  });
}

winner.paymentStatus = "paid";

await winner.save();

res.status(200).json(winner);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}

};

// GET ALL WINNERS
export const getWinners = async (req, res) => {

try {


const winners = await Winner.find()
  .populate("user", "name email")
  .populate("draw");

res.status(200).json(winners);


} catch (error) {


res.status(500).json({
  message: error.message,
});


}

};
