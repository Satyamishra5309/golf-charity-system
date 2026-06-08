import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
const AdminDraws = () => {
const { user } = useAuth();
const [draws, setDraws] = useState([]);
const [loading, setLoading] =
useState(false);

const [drawMode, setDrawMode] =
useState("random");

const [simulationMode, setSimulationMode] =
useState(true);

// FETCH DRAWS
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

// RUN DRAW
const runDraw = async () => {


try {

  setLoading(true);

  await API.post(
    "/draws/run",
    {
      mode: drawMode,
      simulation: simulationMode,
    },
    {
      headers: {
        Authorization:
          `Bearer ${user.token}`,
      },
    }
  );

  fetchDraws();

} catch (error) {

  console.log(error);

  alert(
    error.response?.data?.message
  );

} finally {

  setLoading(false);

}


};

// PUBLISH DRAW
const publishDraw = async (id) => {


try {

  await API.put(
    `/draws/publish/${id}`,
    {},
    {
      headers: {
        Authorization:
          `Bearer ${user.token}`,
      },
    }
  );

  fetchDraws();

} catch (error) {

  console.log(error);

}


};

return ( <AdminLayout>


  {/* HEADER */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

    <div>

      <h1 className="text-5xl font-bold text-emerald-400 mb-3">
        Manage Draws
      </h1>

      <p className="text-slate-400">
        Run, simulate and publish
        monthly reward draws.
      </p>

    </div>

    {/* ACTION PANEL */}
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col gap-4 min-w-[320px]">

      <div>

        <label className="block mb-2 text-slate-400">
          Draw Mode
        </label>

        <select
          value={drawMode}
          onChange={(e) =>
            setDrawMode(
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded-xl"
        >

          <option value="random">
            Random Lottery
          </option>

          <option value="algorithmic">
            Algorithmic Weighted
          </option>

        </select>

      </div>

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={simulationMode}
          onChange={() =>
            setSimulationMode(
              !simulationMode
            )
          }
        />

        <p className="text-slate-300">
          Simulation Mode
        </p>

      </div>

      <button
        onClick={runDraw}
        className="bg-emerald-500 hover:bg-emerald-600 py-4 rounded-2xl font-bold transition-all"
      >

        {loading
          ? "Running Draw..."
          : simulationMode
          ? "Run Simulation"
          : "Run Official Draw"}

      </button>

    </div>

  </div>

  {/* DRAWS */}
  <div className="space-y-8">

    {draws.map((draw) => (

      <div
        key={draw._id}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
      >

        {/* TOP */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

          <div>

            <div className="flex items-center gap-4 mb-3">

              <h2 className="text-4xl font-bold">
                {draw.drawMonth}
              </h2>

              <span
                className={`px-4 py-2 rounded-full text-sm font-bold
                ${
                  draw.status ===
                  "published"
                    ? "bg-emerald-500"
                    : draw.status ===
                      "draft"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                }`}
              >

                {draw.status}

              </span>

            </div>

            <div className="space-y-2 text-slate-400">

              <p>
                Draw Type:
                {" "}
                {draw.drawType}
              </p>

              <p>
                Prize Pool:
                ₹{draw.totalPrizePool}
              </p>

              <p>
                Jackpot Rollover:
                ₹{draw.jackpotRollover}
              </p>

            </div>

          </div>

          {/* PUBLISH */}
          {draw.status !==
            "published" && (

            <button
              onClick={() =>
                publishDraw(
                  draw._id
                )
              }
              className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-2xl font-bold"
            >
              Publish Draw
            </button>

          )}

        </div>

        {/* DRAW NUMBERS */}
        <div className="flex flex-wrap gap-4 mb-10">

          {draw.drawNumbers.map(
            (num) => (

              <div
                key={num}
                className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-3xl font-bold shadow-lg"
              >

                {num}

              </div>

            )
          )}

        </div>

        {/* WINNERS */}
        <div>

          <h3 className="text-3xl font-bold mb-6">
            Winners
          </h3>

          {draw.winners.length ===
          0 ? (

            <div className="bg-slate-800 p-6 rounded-2xl">

              <p className="text-slate-400">
                No winners.
                Jackpot rolls to
                next month.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {draw.winners.map(
                (winner) => (

                  <div
                    key={winner._id}
                    className="bg-slate-800 p-6 rounded-2xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                  >

                    <div>

                      <h4 className="text-2xl font-bold">
                        {
                          winner.user
                            ?.name
                        }
                      </h4>

                      <p className="text-slate-400">
                        {
                          winner.matchedCount
                        }
                        -Number Match
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-3xl font-bold text-emerald-400">
                        ₹
                        {
                          winner.prizeAmount
                        }
                      </p>

                      <p className="text-slate-400">
                        {
                          winner.verificationStatus
                        }
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    ))}

  </div>

</AdminLayout>


);

};

export default AdminDraws;