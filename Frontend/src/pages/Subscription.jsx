
import DashboardLayout
from "../layouts/DashboardLayouts";

import API from "../api/axios";

import { useAuth }
from "../context/AuthContext";

const Subscription = () => {

  const { user } =
    useAuth();

  const buyPlan =
    async (type) => {

      try {

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

        alert(
          `${type} plan activated`
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

  <>

      <h1 className="text-5xl font-bold text-emerald-400 mb-10">
        Subscription Plans
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* MONTHLY */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h2 className="text-4xl font-bold mb-4">
            Monthly Plan
          </h2>

          <p className="text-6xl font-bold text-emerald-400 mb-6">
            ₹499
          </p>

          <ul className="space-y-3 text-slate-300 mb-10">

            <li>
              ✔ Draw Participation
            </li>

            <li>
              ✔ Golf Tracking
            </li>

            <li>
              ✔ Monthly Rewards
            </li>

          </ul>

          <button
            onClick={() =>
              buyPlan(
                "monthly"
              )
            }
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-4 rounded-2xl text-xl font-bold"
          >
            Buy Monthly
          </button>

        </div>

        {/* YEARLY */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h2 className="text-4xl font-bold mb-4">
            Yearly Plan
          </h2>

          <p className="text-6xl font-bold text-emerald-400 mb-6">
            ₹3999
          </p>

          <p className="text-yellow-400 mb-6">
            Save 30%
          </p>

          <ul className="space-y-3 text-slate-300 mb-10">

            <li>
              ✔ All Monthly Features
            </li>

            <li>
              ✔ Discounted Pricing
            </li>

            <li>
              ✔ Priority Rewards
            </li>

          </ul>

          <button
            onClick={() =>
              buyPlan(
                "yearly"
              )
            }
            className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-2xl text-xl font-bold"
          >
            Buy Yearly
          </button>

        </div>

      </div>
      
      </>

  );

};

export default Subscription;
