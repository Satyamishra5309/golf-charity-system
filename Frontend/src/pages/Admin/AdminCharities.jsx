import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import API from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

const AdminCharities = () => {

  const { user } = useAuth();

  const [charities, setCharities] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      image: "",
      website: "",
    });

  // FETCH
  const fetchCharities =
    async () => {

      try {

        const { data } =
          await API.get(
            "/charities"
          );

        setCharities(data);

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchCharities();

  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (editingId) {

          await API.put(
            `/admin/charities/${editingId}`,
            formData,
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        } else {

          await API.post(
            "/charities",
            formData,
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        }

        setFormData({
          name: "",
          description: "",
          image: "",
          website: "",
        });

        setEditingId(null);

        fetchCharities();

      } catch (error) {

        console.log(error);

      }

    };

  // DELETE
  const deleteCharity =
    async (id) => {

      try {

        await API.delete(
          `/admin/charities/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        fetchCharities();

      } catch (error) {

        console.log(error);

      }

    };

  // EDIT
  const editCharity =
    (charity) => {

      setEditingId(
        charity._id
      );

      setFormData({
        name: charity.name,
        description:
          charity.description,
        image: charity.image,
        website:
          charity.website,
      });

    };

  return (

    <AdminLayout>

      <h1 className="text-5xl font-bold text-emerald-400 mb-10">
        Manage Charities
      </h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
        >

          <h2 className="text-4xl font-bold mb-8">

            {editingId
              ? "Edit Charity"
              : "Add Charity"}

          </h2>

          <div className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Charity Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-800 p-4 rounded-2xl"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
              className="w-full bg-slate-800 p-4 rounded-2xl h-32"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-slate-800 p-4 rounded-2xl"
            />

            <input
              type="text"
              name="website"
              placeholder="Website"
              value={
                formData.website
              }
              onChange={handleChange}
              className="w-full bg-slate-800 p-4 rounded-2xl"
            />

            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition py-4 rounded-2xl text-xl font-bold"
            >

              {editingId
                ? "Update Charity"
                : "Add Charity"}

            </button>

          </div>

        </form>

        {/* LIST */}
        <div className="space-y-6">

          {charities.map(
            (charity) => (

              <div
                key={charity._id}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden"
              >

                {/* IMAGE */}
                <img
                  src={
                    charity.image
                  }
                  alt={
                    charity.name
                  }
                  className="w-full h-52 object-cover"
                />

                {/* CONTENT */}
                <div className="p-6">

                  <h2 className="text-3xl font-bold mb-3">
                    {
                      charity.name
                    }
                  </h2>

                  <p className="text-slate-400 mb-6">
                    {
                      charity.description
                    }
                  </p>

                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        editCharity(
                          charity
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteCharity(
                          charity._id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminCharities;
