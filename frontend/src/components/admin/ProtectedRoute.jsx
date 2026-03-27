import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useSelector(store => store.auth);

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If role is provided, check role
    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;