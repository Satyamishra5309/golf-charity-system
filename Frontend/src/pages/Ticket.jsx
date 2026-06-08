
import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayouts";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Ticket = () => {

  const { user } = useAuth();

  const [numbers, setNumbers] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const generateNumbers =
    () => {

      const nums = [];

      while (
        nums.length < 5
      ) {

        const random =
          Math.floor(
            Math.random() * 50
          ) + 1;

        if (
          !nums.includes(
            random
          )
        ) {

          nums.push(random);

        }

      }

      setNumbers(nums);

    };

  const submitTicket =
    async () => {

      try {

        await API.post(
          "/tickets",
          {
            numbers,
          },
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        setMessage(
          "Ticket submitted successfully"
        );

      } catch (error) {

        setMessage(
          error.response?.data
            ?.message
        );

      }

    };

  return (

    <DashboardLayout>

      <h1 className="text-5xl font-bold text-emerald-400 mb-10">
        Monthly Draw Ticket
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-3xl">

        <div className="flex gap-6 mb-10 flex-wrap">

          {numbers.map(
            (num) => (

              <div
                key={num}
                className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-3xl font-bold"
              >
                {num}
              </div>

            )
          )}

        </div>

        <div className="flex gap-6">

          <button
            onClick={
              generateNumbers
            }
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-2xl font-bold"
          >
            Generate Numbers
          </button>

          <button
            onClick={
              submitTicket
            }
            className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-2xl font-bold"
          >
            Submit Ticket
          </button>

        </div>

        {message && (

          <p className="mt-6 text-xl text-slate-300">
            {message}
          </p>

        )}

      </div>

    </DashboardLayout>

  );

};

export default Ticket;

