import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    const location =
        useLocation();

    if (!token) {

        return <Navigate to="/" />;
    }

    if (
        role === "EMPLOYEE" &&
        (
            location.pathname === "/dashboard" ||
            location.pathname === "/employees"
        )
    ) {

        return <Navigate to="/apply-leave" />;
    }

    return children;
}

export default ProtectedRoute;