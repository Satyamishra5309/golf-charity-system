
import Ticket from "../models/Ticket.js";

// CREATE TICKET
export const createTicket =
  async (req, res) => {

    try {

      const {
        numbers,
      } = req.body;

      if (
        !numbers ||
        numbers.length !== 5
      ) {

        return res.status(400).json({
          message:
            "Exactly 5 numbers required",
        });

      }

      const currentMonth =
        new Date().toLocaleString(
          "default",
          {
            month: "long",
            year: "numeric",
          }
        );

      // CHECK DUPLICATE
      const existingTicket =
        await Ticket.findOne({

          user:
            req.user._id,

          drawMonth:
            currentMonth,

        });

      if (existingTicket) {

        return res.status(400).json({
          message:
            "Ticket already submitted this month",
        });

      }

      const ticket =
        await Ticket.create({

          user:
            req.user._id,

          numbers,

          drawMonth:
            currentMonth,

        });

      res.status(201).json(
        ticket
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };


// GET MY TICKET
export const getMyTickets =
  async (req, res) => {

    try {

      const tickets =
        await Ticket.find({

          user:
            req.user._id,

        });

      res.json(tickets);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

