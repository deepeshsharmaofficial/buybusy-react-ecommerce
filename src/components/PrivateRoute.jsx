import { Navigate } from "react-router-dom";

// Context API
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { loading, currentUser } = useAuth();

  if (loading) {
    return <span>....</span>;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;