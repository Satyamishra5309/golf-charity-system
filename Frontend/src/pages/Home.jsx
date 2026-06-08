
import {
  Link,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const Home = () => {

  const [stats, setStats] =
    useState({

      totalUsers: 0,

      totalCharities: 0,

      totalPrizePool: 0,

      totalDraws: 0,

    });

  // FETCH DYNAMIC STATS
  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const { data } =
            await API.get(
              "/public/stats"
            );

          setStats(data);

        } catch (error) {

          console.log(error);

        }

      };

    fetchStats();

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl font-bold text-emerald-400"
          >
            Golf Charity
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className="border border-slate-700 hover:border-emerald-400 px-6 py-3 rounded-xl transition-all"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-semibold transition-all"
            >
              Register
            </Link>

          </div>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-emerald-400 font-semibold mb-5 text-lg">
              Golf Meets Charity
            </p>

            <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">

              Win Rewards
              <br />

              While Supporting
              <br />

              Great Causes

            </h1>

            <p className="text-slate-400 text-xl mb-10 leading-relaxed max-w-2xl">

              Track your golf performance,
              participate in monthly reward draws,
              win exciting prizes,
              and support charities making
              a real-world impact.

            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-5">

              <Link
                to="/register"
                className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg shadow-emerald-500/20"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-slate-700 hover:border-emerald-400 px-8 py-4 rounded-2xl text-lg transition-all"
              >
                Login
              </Link>

              <Link
                to="/subscription"
                className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white px-8 py-4 rounded-2xl text-lg transition-all"
              >
                Subscription Plans
              </Link>

            </div>

          </div>

          {/* RIGHT STATS CARD */}
          <div className="relative">

            {/* GLOW */}
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full"></div>

            <div className="relative bg-linear-to-br from-emerald-500/10 to-cyan-500/10 border border-slate-800 rounded-32px p-10 backdrop-blur-xl">

              {/* PRIZE POOL */}
              <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl mb-6">

                <p className="text-slate-400 mb-3 text-lg">
                  Active Prize Pool
                </p>

                <h2 className="text-5xl font-bold text-emerald-400">

                  ₹
                  {stats.totalPrizePool.toLocaleString()}

                </h2>

              </div>

              {/* SMALL STATS */}
              <div className="grid grid-cols-2 gap-5 mb-5">

                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl">

                  <p className="text-slate-400 text-sm">
                    Active Players
                  </p>

                  <h3 className="text-4xl font-bold mt-3">
                    {stats.totalUsers}
                  </h3>

                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl">

                  <p className="text-slate-400 text-sm">
                    Charities
                  </p>

                  <h3 className="text-4xl font-bold mt-3">
                    {stats.totalCharities}
                  </h3>

                </div>

              </div>

              {/* EXTRA STATS */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl">

                <p className="text-slate-400 text-sm">
                  Total Monthly Draws
                </p>

                <h3 className="text-4xl font-bold mt-3 text-cyan-400">
                  {stats.totalDraws}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="grid md:grid-cols-3 gap-8">

          {/* FEATURE 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="text-5xl mb-6">
              ⛳
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Track Golf Scores
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Record and analyze your golf performance history
              with score tracking and insights.
            </p>

          </div>

          {/* FEATURE 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="text-5xl mb-6">
              🎟️
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Monthly Draws
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Participate in 3-match, 4-match,
              and jackpot reward systems every month.
            </p>

          </div>

          {/* FEATURE 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <div className="text-5xl mb-6">
              ❤️
            </div>

            <h3 className="text-3xl font-bold mb-4">
              Support Charities
            </h3>

            <p className="text-slate-400 leading-relaxed">
              A portion of every subscription contributes
              directly to impactful charitable organizations.
            </p>

          </div>

        </div>

      </section>

    </div>

  );

};

export default Home;