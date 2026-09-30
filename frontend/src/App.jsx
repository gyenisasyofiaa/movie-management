import { 
  BrowserRouter, 
  Routes, 
  Route,
  Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Genre from "./pages/Genre";
import CreateGenre from "./pages/CreateGenre";
import EditGenre from "./pages/EditGenre";
import Film from "./pages/Film";
import CreateFilm from "./pages/CreateFilm";
import EditFilm from "./pages/EditFilm";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute> 
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Route Genre */}
        <Route 
          path="/genres" 
          element={
            <ProtectedRoute> 
              <Genre />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/genres/create" 
          element={
            <ProtectedRoute> 
              <CreateGenre />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/genres/:id/edit" 
          element={
            <ProtectedRoute> 
              <EditGenre />
            </ProtectedRoute>
          }
        />

        {/* Route Film */}
        <Route 
          path="/films" 
          element={
            <ProtectedRoute> 
              <Film />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/films/create" 
          element={
            <ProtectedRoute> 
              <CreateFilm />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/films/:id/edit" 
          element={
            <ProtectedRoute> 
              <EditFilm />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>  
    </BrowserRouter>
  );
};

export default App;