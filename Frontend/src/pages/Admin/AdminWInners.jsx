
import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

const AdminWinners = () => {

  const { user } = useAuth();

  const [winners, setWinners] =
    useState([]);

  // FETCH WINNERS
  const fetchWinners = async () => {

    try {

      const { data } = await API.get(
        "/winners",
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      setWinners(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchWinners();

  }, []);

  // VERIFY WINNER
  const verifyWinner = async (
    id,
    status
  ) => {

    try {

      await API.put(
        `/winners/verify/${id}`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      fetchWinners();

    } catch (error) {

      console.log(error);

    }

  };

  // MARK PAYMENT COMPLETE
  const markPaid = async (id) => {

    try {

      await API.put(
        `/admin/winners/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      fetchWinners();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AdminLayout>

      <h1 className="text-5xl font-bold text-emerald-400 mb-10">
        Verify Winners
      </h1>

      <div className="space-y-6">

        {winners.map((winner) => (

          <div
            key={winner._id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >

            {/* TOP SECTION */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">

              {/* USER INFO */}
              <div>

                <h2 className="text-3xl font-bold mb-2">
                  {winner.user?.name}
                </h2>

                <p className="text-slate-400">
                  Match:
                  {" "}
                  {winner.matchedCount}
                  -Number Match
                </p>

              </div>

              {/* PRIZE INFO */}
              <div className="text-right">

                <p className="text-4xl font-bold text-emerald-400">
                  ₹{winner.prizeAmount}
                </p>

                <p className="text-slate-400 capitalize">
                  Verification:
                  {" "}
                  {winner.verificationStatus}
                </p>

                <p className="text-slate-400 capitalize">
                  Payment:
                  {" "}
                  {winner.paymentStatus}
                </p>

              </div>

            </div>

            {/* PROOF IMAGE */}
            {winner.proofImage && (

              <img
                src={`http://localhost:5123/${winner.proofImage}`}
                alt="proof"
                className="w-full h-300px object-cover rounded-2xl mb-6"
              />

            )}

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-4">

              {/* APPROVE */}
              <button
                onClick={() =>
                  verifyWinner(
                    winner._id,
                    "approved"
                  )
                }
                className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-xl font-semibold text-white"
              >
                Approve
              </button>

              {/* REJECT */}
              <button
                onClick={() =>
                  verifyWinner(
                    winner._id,
                    "rejected"
                  )
                }
                className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-xl font-semibold text-white"
              >
                Reject
              </button>

              {/* MARK PAID */}
              <button
                onClick={() =>
                  markPaid(
                    winner._id
                  )
                }
                disabled={
                  winner.paymentStatus ===
                  "completed"
                }
                className={`px-6 py-3 rounded-xl font-semibold text-white transition ${
                  winner.paymentStatus ===
                  "completed"
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >

                {winner.paymentStatus ===
                "completed"
                  ? "Paid"
                  : "Mark Paid"}

              </button>

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>

  );

};

export default AdminWinners;