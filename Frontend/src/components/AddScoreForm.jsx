import { useState } from "react";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const AddScoreForm = ({ fetchScores }) => {

const { user } = useAuth();

const [formData, setFormData] = useState({
score: "",
playedAt: "",
});

const handleChange = (e) => {


setFormData({
  ...formData,
  [e.target.name]: e.target.value,
});


};

const handleSubmit = async (e) => {


e.preventDefault();

try {

  await API.post(
    "/scores",
    formData,
    {
      headers: {
        Authorization:
          `Bearer ${user.token}`,
      },
    }
  );

  fetchScores();

  setFormData({
    score: "",
    playedAt: "",
  });

} catch (error) {

  alert(
    error.response?.data?.message
  );

}


};

return ( <form
   onSubmit={handleSubmit}
   className="bg-slate-900 p-6 rounded-2xl border border-slate-800"
 >


  <h2 className="text-2xl font-bold mb-4">
    Add Score
  </h2>

  <input
    type="number"
    name="score"
    placeholder="Score"
    value={formData.score}
    onChange={handleChange}
    className="w-full p-3 rounded-lg mb-4 bg-slate-800 border border-slate-700"
  />

  <input
    type="date"
    name="playedAt"
    value={formData.playedAt}
    onChange={handleChange}
    className="w-full p-3 rounded-lg mb-4 bg-slate-800 border border-slate-700"
  />

  <button
    className="w-full bg-emerald-500 py-3 rounded-lg"
  >
    Add Score
  </button>

</form>


);

};

export default AddScoreForm;
