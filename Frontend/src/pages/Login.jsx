import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const Login = () => {

const navigate = useNavigate();

const { login } = useAuth();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [loading, setLoading] =
useState(false);

const handleChange = (e) => {


setFormData({
  ...formData,
  [e.target.name]: e.target.value,
});


};

const handleSubmit = async (e) => {


e.preventDefault();

try {

  setLoading(true);

  const { data } = await API.post(
    "/auth/login",
    formData
  );

  login(data);

 if (data.role === "admin") {

navigate("/admin");

} else {

navigate("/dashboard");

}

} catch (error) {

  alert(
    error.response?.data?.message
  );

} finally {

  setLoading(false);

}


};

return ( <div className="min-h-screen flex items-center justify-center bg-slate-950">


  <form
    onSubmit={handleSubmit}
    className="bg-slate-900 p-8 rounded-2xl w-400px shadow-xl border border-slate-800"
  >

    <h1 className="text-3xl font-bold text-emerald-400 mb-6">
      Login
    </h1>

    <input
      type="email"
      name="email"
      placeholder="Email"
      onChange={handleChange}
      className="w-full p-3 rounded-lg mb-4 bg-slate-800 border border-slate-700 text-white"
    />

    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={handleChange}
      className="w-full p-3 rounded-lg mb-4 bg-slate-800 border border-slate-700 text-white"
    />

    <button
      type="submit"
      className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all p-3 rounded-lg font-semibold"
    >
      {loading ? "Loading..." : "Login"}
    </button>

  </form>

</div>


);

};

export default Login;
