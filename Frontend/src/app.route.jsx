 


import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./features/auth/pages/login.jsx";
import Register from "./features/auth/pages/register.jsx";
import Home from "./features/interview/pages/Home.jsx";
import Interview from "./features/interview/pages/interview.jsx";
import ProtectedRoute from "./features/auth/components/protected.jsx";

// Optional: default redirect route handler
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },

  {
    path: "/interview/:interviewId",
    element: (
      <ProtectedRoute>
        <Interview />
      </ProtectedRoute>
    ),
  },

  // fallback route (bad URL handling)
  {
    path: "*",
    element: <Navigate to="/home" replace />,
  },
]);

export { router };