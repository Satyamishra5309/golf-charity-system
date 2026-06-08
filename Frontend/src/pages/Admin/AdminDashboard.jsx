import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {

const { user } = useAuth();

const [stats, setStats] =
useState(null);

const fetchAnalytics =
async () => {


  const { data } =
    await API.get(
      "/admin/analytics",
      {
        headers: {
          Authorization:
            `Bearer ${user.token}`,
        },
      }
    );

  setStats(data);

};


useEffect(() => {


fetchAnalytics();


}, []);

if (!stats) {


return (
  <AdminLayout>
    Loading...
  </AdminLayout>
);


}

return ( <AdminLayout>


  <h1 className="text-5xl font-bold text-emerald-400 mb-10">
    Admin Dashboard
  </h1>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    <div className="bg-slate-900 p-8 rounded-3xl">

      <p className="text-slate-400">
        Total Users
      </p>

      <h2 className="text-5xl font-bold">
        {stats.totalUsers}
      </h2>

    </div>

    <div className="bg-slate-900 p-8 rounded-3xl">

      <p className="text-slate-400">
        Total Prize Pool
      </p>

      <h2 className="text-5xl font-bold">
        ₹
        {
          stats.totalPrizePool
        }
      </h2>

    </div>

    <div className="bg-slate-900 p-8 rounded-3xl">

      <p className="text-slate-400">
        Total Draws
      </p>

      <h2 className="text-5xl font-bold">
        {stats.totalDraws}
      </h2>

    </div>

    <div className="bg-slate-900 p-8 rounded-3xl">

      <p className="text-slate-400">
        Simulations
      </p>

      <h2 className="text-5xl font-bold">
        {
          stats.totalSimulations
        }
      </h2>

    </div>

    <div className="bg-slate-900 p-8 rounded-3xl">

      <p className="text-slate-400">
        Published Draws
      </p>

      <h2 className="text-5xl font-bold">
        {
          stats.totalPublished
        }
      </h2>

    </div>

    <div className="bg-slate-900 p-8 rounded-3xl">

      <p className="text-slate-400">
        Total Charities
      </p>

      <h2 className="text-5xl font-bold">
        {
          stats.totalCharities
        }
      </h2>

    </div>

  </div>

</AdminLayout>


);

};

export default AdminDashboard;
