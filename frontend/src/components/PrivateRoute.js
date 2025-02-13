import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <h2 className="text-center mt-5">Loading...</h2>; // ✅ Prevents white screen
  }

  return user ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
