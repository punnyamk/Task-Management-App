import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Task from "./Pages/Task/Task";
import NotFound from "./Pages/NotFound";
import { IsAuthenticatedGuard } from "./guards/IsAuthenticated";
import { AuthGuard } from "./guards/AuthGuard";
import { useAuth } from "./contexts/Auth.context";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <IsAuthenticatedGuard>
            <Login />
          </IsAuthenticatedGuard>
        }
      />
      <Route
        path="/register"
        element={
          <IsAuthenticatedGuard>
            <Register />
          </IsAuthenticatedGuard>
        }
      />

      {/* Protected route */}
      <Route
        path="/task"
        element={
          <AuthGuard>
            <Task />
          </AuthGuard>
        }
      />

      {/* Catch-all redirects */}
      <Route path="/login/*" element={<Navigate to="/login" replace />} />
      <Route path="/register/*" element={<Navigate to="/register" replace />} />
      <Route
        path="*"
        element={user ? <NotFound /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
