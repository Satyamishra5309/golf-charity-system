import {
BrowserRouter,
Routes,
Route,
} from "react-router-dom";

// PUBLIC PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subscription from "./pages/Subscription";

// USER PAGES
import Dashboard from "./pages/Dashboard";
import Scores from "./pages/Scores";
import Charities from "./pages/Charities";
import Draws from "./pages/Draws";
import Ticket from "./pages/Ticket";
import MyWinnings from "./pages/MyWinnings";

/* ADMIN IMPORTS */
import AdminDashboard from "./admin/AdminDashboard";
import AdminCharities from "./admin/AdminCharities";
import AdminDraws from "./admin/AdminDraws";
import AdminUsers from "./admin/AdminUsers";
import AdminWinners from "./admin/AdminWinners";
import AdminScores from "./admin/AdminScores";

// ROUTE PROTECTION
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminRoute from "./routes/AdminRoutes";
import SubscriptionGaurd from "./routes/SubscriptionGaurd";

function App() {
return ( <BrowserRouter>


  <Routes>

    {/* PUBLIC ROUTES */}

    <Route
      path="/"
      element={<Home />}
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/subscription"
      element={<Subscription/>}
    />

    {/* USER ROUTES */}

    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />

<Route
  path="/tickets"
  element={
    <ProtectedRoute>

      <SubscriptionGaurd>
        <Ticket />
      </SubscriptionGaurd>

    </ProtectedRoute>
  }
/>

<Route
  path="/my-winnings"
  element={
    <ProtectedRoute>

      <SubscriptionGaurd>
        <MyWinnings />
      </SubscriptionGaurd>

    </ProtectedRoute>
  }
/>

    <Route
      path="/scores"
      element={
        <ProtectedRoute>
          <Scores />
        </ProtectedRoute>
      }
    />

    <Route
      path="/charities"
      element={
        <ProtectedRoute>
          <Charities />
        </ProtectedRoute>
      }
    />

    <Route
      path="/draws"
      element={
        <ProtectedRoute>
          <Draws />
        </ProtectedRoute>
      }
    />

            {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/charities"
          element={<AdminCharities />}
        />

        <Route
          path="/admin/draws"
          element={<AdminDraws />}
        />

        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />

        <Route
          path="/admin/winners"
          element={<AdminWinners />}
        />

        <Route
          path="/admin/scores"
          element={<AdminScores />}
        />

  </Routes>

</BrowserRouter>


);
}

export default App;
