
import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayouts";

import API from "../api/axios";

import { useAuth }
from "../context/AuthContext";

const MyWinnings = () => {

  const { user } =
    useAuth();

  const [winners, setWinners] =
    useState([]);

  const fetchWinnings =
    async () => {

      const { data } =
        await API.get(
          "/winners/my",
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

      setWinners(data);

    };

  useEffect(() => {

    fetchWinnings();

  }, []);

  const uploadProof =
    async (id, file) => {

      const formData =
        new FormData();

      formData.append(
        "image",
        file
      );

      await API.put(
        `/winners/upload-proof/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      fetchWinnings();

    };

  return (

    <DashboardLayout>

      <h1 className="text-5xl font-bold text-emerald-400 mb-10">
        My Winnings
      </h1>

      <div className="space-y-6">

        {winners.map(
          (winner) => (

            <div
              key={winner._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
            >

              <h2 className="text-3xl font-bold mb-4">
                ₹
                {
                  winner.prizeAmount
                }
              </h2>

              <p className="text-slate-400 mb-4">
                Verification:
                {" "}
                {
                  winner.verificationStatus
                }
              </p>

              <p className="text-slate-400 mb-6">
                Payment:
                {" "}
                {
                  winner.paymentStatus
                }
              </p>

              {winner.proofImage ? (

                <img
                  src={
                    winner.proofImage
                  }
                  alt="proof"
                  className="w-full h-64 object-cover rounded-2xl"
                />

              ) : (

                <input
                  type="file"
                  onChange={(e) =>
                    uploadProof(
                      winner._id,
                      e.target.files[0]
                    )
                  }
                />

              )}

            </div>

          )
        )}

      </div>

    </DashboardLayout>

  );

};

export default MyWinnings;

