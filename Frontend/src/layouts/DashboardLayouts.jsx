import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {

const { logout } = useAuth();

return ( <div className="min-h-screen bg-slate-950 text-white flex">

  
  <aside className="w-250px bg-slate-900 border-r border-slate-800 p-6">

    <h1 className="text-2xl font-bold text-emerald-400 mb-10">
      Golf Charity
    </h1>

    <nav className="flex flex-col gap-4">

      <Link
        to="/dashboard"
        className="hover:text-emerald-400"
      >
        Dashboard
      </Link>

      <Link
        to="/scores"
        className="hover:text-emerald-400"
      >
        Scores
      </Link>

      <Link
        to="/charities"
        className="hover:text-emerald-400"
      >
        Charities
      </Link>

      <Link
        to="/draws"
        className="hover:text-emerald-400"
      >
        Draws
      </Link>

      <Link to="/tickets">
  Tickets
</Link>


<Link
        to="/my-winnings"
        className="hover:text-emerald-400"
      >
        Winnings
      </Link>

      <button
        onClick={logout}
        className="bg-red-500 mt-6 py-2 rounded-lg"
      >
        Logout
      </button>

    </nav>

  </aside>


  <main className="flex-1 p-8">
    {children}
  </main>

</div>


);

};

export default DashboardLayout;
