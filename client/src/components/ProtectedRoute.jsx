import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = document.cookie.includes('uid');
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;