
import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

const AdminScores = () => {

  const { user } = useAuth();

  const [scores, setScores] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [newScore, setNewScore] =
    useState("");

  // FETCH SCORES
  const fetchScores = async () => {

    try {

      const { data } = await API.get(
        "/admin/scores",
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

    }

  };

  useEffect(() => {

    fetchScores();

  }, []);

  // UPDATE SCORE
  const updateScore = async (
    id
  ) => {

    try {

      await API.put(
        `/admin/scores/${id}`,
        {
          score: newScore,
        },
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      setEditingId(null);

      fetchScores();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AdminLayout>

      <h1 className="text-5xl font-bold text-emerald-400 mb-10">
        Score Management
      </h1>

      <div className="space-y-6">

        {scores.map((s) => (

          <div
            key={s._id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>

                <h2 className="text-3xl font-bold">
                  {s.user?.name}
                </h2>

                <p className="text-slate-400">
                  Current Score:
                  {" "}
                  {s.score}
                </p>

              </div>

              {editingId === s._id ? (

                <div className="flex gap-4">

                  <input
                    type="number"
                    value={newScore}
                    onChange={(e) =>
                      setNewScore(
                        e.target.value
                      )
                    }
                    className="bg-slate-800 p-3 rounded-xl"
                  />

                  <button
                    onClick={() =>
                      updateScore(
                        s._id
                      )
                    }
                    className="bg-emerald-500 px-6 py-3 rounded-xl"
                  >
                    Save
                  </button>

                </div>

              ) : (

                <button
                  onClick={() => {

                    setEditingId(
                      s._id
                    );

                    setNewScore(
                      s.score
                    );

                  }}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl"
                >
                  Edit Score
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>

  );

};

export default AdminScores;