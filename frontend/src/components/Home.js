// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Home = () => {
//   return (
//     <div className="container text-center mt-5">
//       <h1 className="display-4 fw-bold">Welcome to AI-Powered Notes! 🚀</h1>
//       <p className="lead mt-3">Upload text, images, or audio to generate smart notes.</p>
//       <Link to="/create" className="btn btn-primary btn-lg mt-4">
//         Start Now
//       </Link>
//     </div>
//   );
// };

// export default Home;

// ---

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/create"); // Redirect to create note if logged in
    }
  }, [user, navigate]);

  return (
    <div className="container text-center mt-5">
        <h1 className="display-4 fw-bold">Welcome to AI-Powered Notes! 🚀</h1>
        <p className="lead mt-3">Upload text, images, or audio to generate smart notes.</p>
      <button className="btn btn-primary btn-lg mt-4" onClick={() => navigate("/auth")}>
        Start Now
      </button>
    </div>
  );
};

export default Home;

