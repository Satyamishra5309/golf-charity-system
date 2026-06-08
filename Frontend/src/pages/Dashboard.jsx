import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayouts";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

const { user } = useAuth();

const [scores, setScores] = useState([]);

const [loading, setLoading] =
useState(true);

const fetchScores = async () => {


try {

  const { data } = await API.get(
    "/scores",
    {
      headers: {
        Authorization:
          `Bearer ${user.token}`,
      },
    }
  );

  setScores(data);

} catch (error) {

  console.log(error);

} finally {

  setLoading(false);

}


};

useEffect(() => {


if (user?.token) {
  fetchScores();
}


}, [user]);

return ( <DashboardLayout>


  <h1 className="text-5xl font-bold text-emerald-400 mb-4">
    Welcome {user?.name}
  </h1>

  <p className="text-slate-400 mb-10">
    Manage your golf journey and charity impact.
  </p>

  {loading ? (

    <p>Loading...</p>

  ) : (

    <div className="grid lg:grid-cols-2 gap-8">

      {/* ADD SCORE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Latest Scores
        </h2>

        <div className="space-y-4">

          {scores.map((score) => (

            <div
              key={score._id}
              className="bg-slate-800 p-4 rounded-xl flex justify-between"
            >

              <span>
                Score:
                {score.score}
              </span>

              <span>
                {new Date(
                  score.playedAt
                ).toLocaleDateString()}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  )}

</DashboardLayout>


);

};

export default Dashboard;
