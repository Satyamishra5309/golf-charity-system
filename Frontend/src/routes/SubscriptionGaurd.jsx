
import { Navigate }
from "react-router-dom";

import { useAuth }
from "../context/AuthContext";

const SubscriptionGaurd = ({
  children,
}) => {

  const { user } =
    useAuth();

  // NO SUBSCRIPTION
  if (
    !user?.subscriptionActive
  ) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-10">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 max-w-xl text-center">

          <h1 className="text-5xl font-bold text-emerald-400 mb-6">
            Subscription Required
          </h1>

          <p className="text-slate-300 text-xl mb-8">

            You need an active subscription
            to access this feature.

          </p>

          <a
            href="/subscription"
            className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-2xl text-xl font-bold inline-block"
          >
            View Plans
          </a>

        </div>

      </div>

    );

  }

  return children;

};

export default SubscriptionGaurd;
