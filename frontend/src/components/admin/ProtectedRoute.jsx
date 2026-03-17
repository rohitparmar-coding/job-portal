import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Not recruiter
    if (user.role !== "recruiter") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;