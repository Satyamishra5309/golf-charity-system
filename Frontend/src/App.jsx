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

// ADMIN PAGES
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminCharities from "./pages/admin/AdminCharities";
// import AdminDraws from "./pages/admin/AdminDraws";
// import AdminWinners from "./pages/admin/AdminWinners";
// import AdminUsers from "./pages/admin/AdminUsers";
// import AdminScores from "./pages/admin/AdminScores";

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





  </Routes>

</BrowserRouter>


);
}

export default App;
