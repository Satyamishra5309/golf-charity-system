
import { useEffect, useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const AdminUsers = () => {

  const { user } = useAuth();

  const [users, setUsers] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
    });

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const { data } = await API.get(
        "/admin/users",
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      setUsers(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  // EDIT USER
  const editUser = (u) => {

    setEditingId(u._id);

    setFormData({
      name: u.name,
      email: u.email,
    });

  };

  // UPDATE USER
  const updateUser = async () => {

    try {

      await API.put(
        `/admin/users/${editingId}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      setEditingId(null);

      fetchUsers();

    } catch (error) {

      console.log(error);

    }

  };

  // TOGGLE SUBSCRIPTION
  const toggleSubscription =
    async (id, current) => {

      try {

        await API.put(
          `/admin/users/${id}`,
          {
            subscriptionActive:
              !current,
          },
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        fetchUsers();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <h1 className="text-5xl font-bold text-emerald-400 mb-10">
        User Management
      </h1>

      <div className="space-y-6">

        {users.map((u) => (

          <div
            key={u._id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
          >

            {editingId === u._id ? (

              <div className="space-y-4">

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name:
                        e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 p-4 rounded-xl"
                />

                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email:
                        e.target.value,
                    })
                  }
                  className="w-full bg-slate-800 p-4 rounded-xl"
                />

                <button
                  onClick={updateUser}
                  className="bg-emerald-500 px-6 py-3 rounded-xl"
                >
                  Save Changes
                </button>

              </div>

            ) : (

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                  <h2 className="text-3xl font-bold">
                    {u.name}
                  </h2>

                  <p className="text-slate-400">
                    {u.email}
                  </p>

                  <p className="text-slate-400 mt-2">
                    Subscription:
                    {" "}
                    {u.subscriptionActive
                      ? "Active"
                      : "Inactive"}
                  </p>

                </div>

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      editUser(u)
                    }
                    className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      toggleSubscription(
                        u._id,
                        u.subscriptionActive
                      )
                    }
                    className={`px-6 py-3 rounded-xl ${
                      u.subscriptionActive
                        ? "bg-red-500"
                        : "bg-emerald-500"
                    }`}
                  >

                    {u.subscriptionActive
                      ? "Disable"
                      : "Enable"}

                  </button>

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

    </AdminLayout>

  );

};

export default AdminUsers;