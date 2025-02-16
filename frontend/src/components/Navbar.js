// import { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { FiLogOut, FiLogIn, FiSun, FiMoon, FaUserCircle } from "react-icons/fi"; // Icons

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   // Check localStorage for theme preference
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("navbarTheme") === "dark"
//   );

//   // Save theme preference in localStorage
//   useEffect(() => {
//     localStorage.setItem("navbarTheme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   return (
//     <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
//       <div className="container">
//         {/* Home Button (Always Visible) */}
//         <Link className="navbar-brand fw-bold" to="/">AI Notes</Link>

//         <div className="collapse navbar-collapse justify-content-end">
//           <ul className="navbar-nav">
//             {user ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link fw-bold" to="/">Home</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link fw-bold" to="/create">My Notes</Link>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-outline-danger ms-3" onClick={logout}>
//                     <FiLogOut size={24} /> {/* Logout Icon */}
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item">
//                 <Link className="btn btn-outline-primary ms-3" to="/auth">
//                   <FiLogIn size={24} /> {/* Login Icon */}
//                 </Link>
//               </li>
//             )}

//             {/* Theme Toggle Button */}
//             <li className="nav-item">
//               <button className="btn btn-outline-secondary ms-3" onClick={() => setDarkMode(!darkMode)}>
//                 {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut, FiLogIn, FiSun, FiMoon } from "react-icons/fi"; // Icons
import { FaUserCircle } from "react-icons/fa"; // Profile Icon

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check localStorage for theme preference
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("navbarTheme") === "dark"
  );

  // Save theme preference in localStorage
  useEffect(() => {
    localStorage.setItem("navbarTheme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container">
        {/* Home Button (Always Visible) */}
        <Link className="navbar-brand fw-bold" to="/">
          AI Notes
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" to="/create">
                    My Notes
                  </Link>
                </li>

                {/* Profile Icon (Only visible when logged in) */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary ms-3"
                    onClick={() => navigate("/profile")}
                  >
                    <FaUserCircle size={24} />
                  </button>
                </li>

                {/* Logout Button */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger ms-3"
                    onClick={logout}
                  >
                    <FiLogOut size={24} />
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary ms-3" to="/auth">
                  <FiLogIn size={24} />
                </Link>
              </li>
            )}

            {/* Theme Toggle Button */}
            <li className="nav-item">
              <button
                className="btn btn-outline-secondary ms-3"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
