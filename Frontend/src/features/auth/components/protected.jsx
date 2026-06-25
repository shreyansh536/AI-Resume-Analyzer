 
// import { useAuth } from "../hooks/useAuth";

// const ProtectedRoute = ({ children }) => {
//   const { loading, user } = useAuth();

//   console.log("loading:", loading);
//   console.log("user:", user);

//   if (loading) {
//     return <h1>Loading...</h1>;
//   }

//   if (!user) {
//     return <h1>No User Found</h1>;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;