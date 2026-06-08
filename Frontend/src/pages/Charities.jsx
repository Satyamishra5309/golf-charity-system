import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayouts";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Charities = () => {

const { user } = useAuth();

const [charities, setCharities] = useState([]);

const [loading, setLoading] = useState(true);

const fetchCharities = async () => {
try {

  const { data } = await API.get(
    "/charities"
  );

  setCharities(data);

} catch (error) {

  console.log(error);

} finally {

  setLoading(false);

}


};

const selectCharity = async (id) => {

try {

  await API.put(
    "/charities/select",
    {
      charityId: id,
      charityPercentage: 20,
    },
    {
      headers: {
        Authorization:
          `Bearer ${user.token}`,
      },
    }
  );

  alert("Charity Selected");

} catch (error) {

  alert(
    error.response?.data?.message
  );

}


};

useEffect(() => {


fetchCharities();


}, []);

return ( <DashboardLayout>


  <h1 className="text-4xl font-bold text-emerald-400 mb-8">
    Charities
  </h1>

  {loading ? (

    <p>Loading...</p>

  ) : (

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {charities.map((charity) => (

        <div
          key={charity._id}
          className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all"
        >

          <img
            src={
              charity.image ||
              "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6"
            }
            alt={charity.name}
            className="w-full h-220px object-cover"
          />

          <div className="p-6">

            <h2 className="text-2xl font-bold mb-3">
              {charity.name}
            </h2>

            <p className="text-slate-400 mb-6">
              {charity.description}
            </p>

            <button
              onClick={() =>
                selectCharity(charity._id)
              }
              className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl font-semibold transition-all"
            >
              Select Charity
            </button>

          </div>

        </div>

      ))}

    </div>

  )}

</DashboardLayout>


);
};

export default Charities;
