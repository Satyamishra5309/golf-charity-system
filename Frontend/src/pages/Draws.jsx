import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayouts";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Draws = () => {

const { user } = useAuth();

const [draws, setDraws] = useState([]);

const fetchDraws = async () => {


try {

  const { data } = await API.get(
    "/draws",
    {
      headers: {
        Authorization:
          `Bearer ${user.token}`,
      },
    }
  );

  setDraws(data);

} catch (error) {

  console.log(error);

}


};

useEffect(() => {


fetchDraws();


}, []);

return ( <DashboardLayout>


  <h1 className="text-4xl font-bold text-emerald-400 mb-8">
    Monthly Draws
  </h1>

  <div className="space-y-8">

    {draws.map((draw) => (

      <div
        key={draw._id}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
      >

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              {draw.drawMonth}
            </h2>

            <p className="text-slate-400">
              Prize Pool:
              ₹{draw.totalPrizePool}
            </p>

          </div>

          <span className="bg-emerald-500 px-4 py-2 rounded-full text-sm font-semibold">
            {draw.status}
          </span>

        </div>

        <div className="flex gap-4 mb-8">

          {draw.drawNumbers.map((num) => (

            <div
              key={num}
              className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-xl font-bold"
            >
              {num}
            </div>

          ))}

        </div>

        <div>

          <h3 className="text-xl font-bold mb-4">
            Winners
          </h3>

          <div className="space-y-4">

            {draw.winners.map((winner) => (

              <div
                key={winner._id}
                className="bg-slate-800 p-4 rounded-xl flex justify-between"
              >

                <div>

                  <p className="font-semibold">
                    {winner.user?.name}
                  </p>

                  <p className="text-slate-400 text-sm">
                    {winner.matchedCount}
                    Match Winner
                  </p>

                </div>

                <p className="text-emerald-400 font-bold">
                  ₹{winner.prizeAmount}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    ))}

  </div>

</DashboardLayout>


);
};

export default Draws;
