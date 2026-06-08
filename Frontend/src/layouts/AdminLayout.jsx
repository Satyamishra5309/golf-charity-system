import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const AdminLayout = ({ children }) => {

const { logout } = useAuth();

return ( <div className="min-h-screen bg-slate-950 text-white flex">

  {/* SIDEBAR */}
  <aside className="w-260px bg-slate-900 border-r border-slate-800 p-6">

    <h1 className="text-3xl font-bold text-emerald-400 mb-12">
      Admin Panel
    </h1>

    <nav className="flex flex-col gap-6">

      <Link
        to="/admin"
        className="hover:text-emerald-400"
      >
        Dashboard
      </Link>

      <Link
        to="/admin/users"
        className="hover:text-emerald-400"
      >
        Manage Users
      </Link>

       <Link to="/admin/scores">
  Manage User Scores
</Link>

      <Link
        to="/admin/charities"
        className="hover:text-emerald-400"
      >
        Manage Charities
      </Link>

      <Link
        to="/admin/draws"
        className="hover:text-emerald-400"
      >
        Manage Draws
      </Link>

      <Link
        to="/admin/winners"
        className="hover:text-emerald-400"
      >
        Verify Winners
      </Link>

      <button
        onClick={logout}
        className="bg-red-500 py-3 rounded-xl mt-8"
      >
        Logout
      </button>

    </nav>

  </aside>

  {/* MAIN */}
  <main className="flex-1 p-8 overflow-y-auto">
    {children}
  </main>

</div>


);

};

export default AdminLayout;
