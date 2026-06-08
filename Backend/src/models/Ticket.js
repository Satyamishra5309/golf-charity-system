
import mongoose from "mongoose";

const ticketSchema =
  mongoose.Schema(
    {

      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      numbers: [
        {
          type: Number,
        },
      ],

      drawMonth: {
        type: String,
      },

    },
    {
      timestamps: true,
    }
  );

const Ticket =
  mongoose.model(
    "Ticket",
    ticketSchema
  );

export default Ticket;
