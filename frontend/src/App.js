import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import NoteDetail from "./components/NoteDetail";
import AuthPage from "./components/AuthPage";
import NotesDashboard from "./components/NotesDashboard"; // New component
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import ProfilePage from "./components/ProfilePage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<PrivateRoute><NotesDashboard /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><NoteForm /></PrivateRoute>} />
            <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
            <Route path="/notes/:id" element={<PrivateRoute><NoteDetail /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
