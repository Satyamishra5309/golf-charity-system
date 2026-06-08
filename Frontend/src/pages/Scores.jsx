
import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../layouts/DashboardLayouts";

import API from "../api/axios";

import { useAuth }
from "../context/AuthContext";

const Scores = () => {

  const { user } =
    useAuth();

  const [scores, setScores] =
    useState([]);

  const [score, setScore] =
    useState("");

  const [date, setDate] =
    useState("");

  // FETCH SCORES
  const fetchScores =
    async () => {

      try {

        const { data } =
          await API.get(
            "/scores/",
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

  // ADD SCORE
  const addScore =
    async (e) => {

      e.preventDefault();

      try {

        await API.post(
          "/scores",
          {
            score,
            playedAt: date,
          },
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        setScore("");

        setDate("");

        fetchScores();

      } catch (error) {

        console.log(error);

      }

    };

  // STATS
  const totalGames =
    scores.length;

  const averageScore =
    totalGames > 0
      ? (
          scores.reduce(
            (acc, curr) =>
              acc + curr.score,
            0
          ) / totalGames
        ).toFixed(1)
      : 0;

  const bestScore =
    totalGames > 0
      ? Math.min(
          ...scores.map(
            (s) => s.score
          )
        )
      : 0;

  return (

    <DashboardLayout>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold text-emerald-400 mb-3">
          Your Scores
        </h1>

        <p className="text-slate-400 text-lg">
          Track your golf performance history.
        </p>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <p className="text-slate-400 text-lg">
            Total Games
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {totalGames}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <p className="text-slate-400 text-lg">
            Average Score
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {averageScore}
          </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          <p className="text-slate-400 text-lg">
            Best Score
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {bestScore}
          </h2>

        </div>

      </div>

      {/* ADD SCORE FORM */}
      <form
        onSubmit={addScore}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10"
      >

        <h2 className="text-3xl font-bold mb-6">
          Add Golf Score
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="number"
            placeholder="Enter Score"
            value={score}
            onChange={(e) =>
              setScore(
                e.target.value
              )
            }
            className="bg-slate-800 p-4 rounded-2xl"
            required
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="bg-slate-800 p-4 rounded-2xl"
            required
          />

        </div>

        <button
          type="submit"
          className="mt-6 bg-emerald-500 hover:bg-emerald-600 transition px-8 py-4 rounded-2xl text-xl font-bold"
        >
          Add Score
        </button>

      </form>

      {/* SCORE LIST */}
      <div className="grid lg:grid-cols-2 gap-6">

        {scores.map((s, index) => (

          <div
            key={s._id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >

            <div className="flex justify-between items-center mb-6">

              <div>

                <p className="text-slate-400 text-lg">
                  Match #
                  {index + 1}
                </p>

                <h2 className="text-6xl font-bold text-emerald-400 mt-3">
                  {s.score}
                </h2>

              </div>

              <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30">
                ⛳
              </div>

            </div>

            <div className="border-t border-slate-800 pt-4 flex justify-between">

              <p className="text-slate-400">
                Played On
              </p>

              <p className="text-lg">
                {new Date(
                  s.playedAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>

  );

};

export default Scores;

