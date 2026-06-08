import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {

const { user } = useAuth();

// NOT LOGGED IN
if (!user) {
return <Navigate to="/login" />;
}

// NOT ADMIN
if (user.role !== "admin") {
return <Navigate to="/dashboard" />;
}

return children;
};

export default AdminRoute;
