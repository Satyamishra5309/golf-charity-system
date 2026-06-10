// pages/Subscription.jsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import {
  useAuth,
} from "../context/AuthContext";

const Subscription = () => {

  const navigate =
    useNavigate();

  const {
    user,
    setUser,
  } = useAuth();

  const [loading, setLoading] =
    useState(false);

  // BUY PLAN
  const buyPlan = async (
    type
  ) => {

    try {

      setLoading(true);

      const res =
        await API.post(
          "/subscriptions/buy",
          { type },
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

      // UPDATED USER
      const updatedUser = {
        ...user,
        ...res.data.user,
      };

      // UPDATE CONTEXT
      setUser(updatedUser);

      // UPDATE LOCAL STORAGE
      localStorage.setItem(
        "userInfo",
        JSON.stringify(
          updatedUser
        )
      );

      alert(
        `${type} plan activated successfully`
      );

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
        "Subscription failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // CANCEL PLAN
  const cancelPlan =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.put(
            "/subscriptions/cancel",
            {},
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        const updatedUser = {
          ...user,
          ...res.data.user,
        };

        setUser(updatedUser);

        localStorage.setItem(
          "userInfo",
          JSON.stringify(
            updatedUser
          )
        );

        alert(
          "Subscription cancelled"
        );

      } catch (error) {

        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
          "Cancellation failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* HEADER */}
      <div className="mb-12">

        <h1 className="text-5xl font-bold text-emerald-400 mb-4">
          Subscription Plans
        </h1>

        <p className="text-slate-400 text-lg">
          Unlock premium golf
          charity features and
          reward participation.
        </p>

      </div>

      {/* ACTIVE SUBSCRIPTION */}
      {user?.subscriptionActive ? (

        <div className="bg-emerald-500/20 border border-emerald-500 rounded-3xl p-8 mb-12">

          <h2 className="text-3xl font-bold text-emerald-400 mb-6">
            Active Subscription
          </h2>

          <div className="space-y-3 text-lg">

            <p>

              <span className="font-bold text-white">
                Plan:
              </span>

              {" "}

              <span className="capitalize">
                {user.subscriptionType}
              </span>

            </p>

            <p>

              <span className="font-bold text-white">
                Expiry:
              </span>

              {" "}

              {user.subscriptionExpiry
                ? new Date(
                    user.subscriptionExpiry
                  ).toLocaleDateString()
                : "N/A"}

            </p>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-8">

            <button
              onClick={() =>
                navigate(
                  "/dashboard"
                )
              }
              className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-bold transition"
            >
              Go To Dashboard
            </button>

            <button
              onClick={() =>
                navigate(
                  "/draws"
                )
              }
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl font-bold transition"
            >
              View Draws
            </button>

            <button
              onClick={() =>
                navigate(
                  "/scores"
                )
              }
              className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-bold transition"
            >
              Track Scores
            </button>

            <button
              onClick={
                cancelPlan
              }
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold transition"
            >
              {loading
                ? "Processing..."
                : "Cancel Subscription"}
            </button>

          </div>

        </div>

      ) : (

        <div className="bg-yellow-500/10 border border-yellow-500 rounded-2xl p-5 mb-10 text-yellow-300">

          No active subscription.

        </div>

      )}

      {/* PLANS */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* MONTHLY PLAN */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-emerald-500 transition duration-300">

          <h2 className="text-4xl font-bold mb-4">
            Monthly Plan
          </h2>

          <p className="text-6xl font-bold text-emerald-400 mb-6">
            ₹499
          </p>

          <ul className="space-y-4 text-slate-300 mb-10">

            <li>
              ✔ Draw Participation
            </li>

            <li>
              ✔ Golf Tracking
            </li>

            <li>
              ✔ Monthly Rewards
            </li>

            <li>
              ✔ Charity Support
            </li>

          </ul>

          <button
            disabled={
              loading
            }
            onClick={() =>
              buyPlan(
                "monthly"
              )
            }
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-4 rounded-2xl text-xl font-bold transition"
          >
            {loading
              ? "Processing..."
              : "Buy Monthly"}
          </button>

        </div>

        {/* YEARLY PLAN */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-blue-500 transition duration-300 relative overflow-hidden">

          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">

            BEST VALUE

          </div>

          <h2 className="text-4xl font-bold mb-4">
            Yearly Plan
          </h2>

          <p className="text-6xl font-bold text-blue-400 mb-2">
            ₹3999
          </p>

          <p className="text-yellow-400 mb-6 font-semibold">
            Save 30%
          </p>

          <ul className="space-y-4 text-slate-300 mb-10">

            <li>
              ✔ All Monthly Features
            </li>

            <li>
              ✔ Discounted Pricing
            </li>

            <li>
              ✔ Priority Rewards
            </li>

            <li>
              ✔ Exclusive Tournaments
            </li>

          </ul>

          <button
            disabled={
              loading
            }
            onClick={() =>
              buyPlan(
                "yearly"
              )
            }
            className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-2xl text-xl font-bold transition"
          >
            {loading
              ? "Processing..."
              : "Buy Yearly"}
          </button>

        </div>

      </div>

    </div>

  );

};

export default Subscription;