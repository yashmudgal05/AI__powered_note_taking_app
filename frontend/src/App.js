import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import NoteDetail from "./components/NoteDetail"; // Component for viewing a note in detail
// import Register from "./components/Register"; // User registration page
// import Login from "./components/Login"; // User login page
import AuthPage from "./components/AuthPage";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
              <Route path="/auth" element={<AuthPage />} />
          <Route path="/create" element={<PrivateRoute><NoteForm /></PrivateRoute>} />
          <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
          <Route path="/notes/:id" element={<PrivateRoute><NoteDetail /></PrivateRoute>} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
