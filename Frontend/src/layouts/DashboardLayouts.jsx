// layouts/DashboardLayout.jsx

import { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({
  children,
}) => {

  const { logout } =
    useAuth();

  const [open, setOpen] =
    useState(false);

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">

        <h1 className="text-2xl font-bold text-emerald-400">
          Golf Charity
        </h1>

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="text-3xl"
        >
          ☰
        </button>

      </div>

      <div className="flex">

        {/* SIDEBAR */}
        <aside
          className={`
            fixed md:static top-0 left-0 z-50
            h-screen w-64 bg-slate-900 border-r border-slate-800 p-6
            transform transition-transform duration-300 ease-in-out
            ${
              open
                ? "translate-x-0"
                : "-translate-x-full"
            }
            md:translate-x-0
          `}
        >

          {/* MOBILE CLOSE */}
          <div className="flex items-center justify-between mb-10 md:hidden">

            <h1 className="text-2xl font-bold text-emerald-400">
              Menu
            </h1>

            <button
              onClick={() =>
                setOpen(false)
              }
              className="text-3xl"
            >
              ✕
            </button>

          </div>

          {/* DESKTOP TITLE */}
          <h1 className="hidden md:block text-3xl font-bold text-emerald-400 mb-10">
            Golf Charity
          </h1>

          {/* NAVIGATION */}
          <nav className="flex flex-col gap-5 text-lg">

            <Link
              to="/dashboard"
              className="hover:text-emerald-400 transition"
              onClick={() =>
                setOpen(false)
              }
            >
              Dashboard
            </Link>

            <Link
              to="/scores"
              className="hover:text-emerald-400 transition"
              onClick={() =>
                setOpen(false)
              }
            >
              Scores
            </Link>

            <Link
              to="/charities"
              className="hover:text-emerald-400 transition"
              onClick={() =>
                setOpen(false)
              }
            >
              Charities
            </Link>

            <Link
              to="/draws"
              className="hover:text-emerald-400 transition"
              onClick={() =>
                setOpen(false)
              }
            >
              Draws
            </Link>

            <Link
              to="/tickets"
              className="hover:text-emerald-400 transition"
              onClick={() =>
                setOpen(false)
              }
            >
              Tickets
            </Link>

            <Link
              to="/my-winnings"
              className="hover:text-emerald-400 transition"
              onClick={() =>
                setOpen(false)
              }
            >
              Winnings
            </Link>

            <Link
              to="/subscription"
              className="hover:text-emerald-400 transition"
              onClick={() =>
                setOpen(false)
              }
            >
              Subscription
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 mt-8 py-3 rounded-xl transition font-semibold"
            >
              Logout
            </button>

          </nav>

        </aside>

        {/* MOBILE OVERLAY */}
        {open && (

          <div
            onClick={() =>
              setOpen(false)
            }
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />

        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">

          {children}

        </main>

      </div>

    </div>

  );

};

export default DashboardLayout;