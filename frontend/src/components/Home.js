// import { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Home = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     if (user) {
//       navigate("/create"); // Redirect to create note if logged in
//     }
//   }, [user, navigate]);

//   return (
//     <div className="container text-center mt-5">
//         <h1 className="display-4 fw-bold">Welcome to AI-Powered Notes! 🚀</h1>
//         <p className="lead mt-3">Upload text, images, or audio to generate smart notes.</p>
//       <button className="btn btn-primary btn-lg mt-4" onClick={() => navigate("/auth")}>
//         Start Now
//       </button>
//     </div>
//   );
// };

// export default Home;


// ---

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="container text-center mt-5">
      {/* Main Heading and Description */}
      <h1 className="display-4 fw-bold">Welcome to AI-Powered Notes! 🚀</h1>
      <p className="lead mt-3">Upload text, images, or audio to generate smart notes.</p>

      {/* Before Login: Show 'Start Now' button */}
      {!user && (
        <button className="btn btn-primary btn-lg mt-4" onClick={() => navigate("/auth")}>
          Start Now
        </button>
      )}

      {/* After Login: Show Two Interactive Cards */}
      {user && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-5">
            <div className="card text-center shadow-lg p-3 mb-4 bg-white rounded" onClick={() => navigate("/create")}>
              <div className="card-body">
                <h3 className="card-title">Create New Note</h3>
                <p className="card-text">Click here to create a new note.</p>
                <button className="btn btn-primary">Go to Form</button>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card text-center shadow-lg p-3 mb-4 bg-white rounded" onClick={() => navigate("/notes")}>
              <div className="card-body">
                <h3 className="card-title">My Notes</h3>
                <p className="card-text">View and manage all your notes.</p>
                <button className="btn btn-success">View Notes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

