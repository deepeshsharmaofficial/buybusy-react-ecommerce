import { Navigate } from "react-router-dom";

// Context API
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { isAdmin } = useAuth();
    const { loading, currentUser } = useAuth();

  if (loading) {
    return <span>....</span>;
  }

  if(isAdmin) {
    console.log('currentUser: ', currentUser);
    return children;
  }

  return <Navigate to="/login" />;
};

export default AdminRoute;