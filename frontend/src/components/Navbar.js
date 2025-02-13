// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { FiLogOut } from "react-icons/fi"; // Logout icon
// import { FiLogIn } from "react-icons/fi"; // Login icon

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container">
//         {/* Home Button (Always Visible) */}
//         <Link className="navbar-brand fw-bold" to="/">AI Notes</Link>

//         <div className="collapse navbar-collapse justify-content-end">
//           <ul className="navbar-nav">
//             {/* If user is logged in, show "My Notes" & Logout */}
//             {user ? (
//               <>
//               <li>
//               <Link className="nav-link fw-bold" to="/">Home</Link>
//               </li>
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
//               // If user is NOT logged in, show Login button
//               <li className="nav-item">
//                 <Link className="btn btn-outline-primary ms-3" to="/auth">
//                   <FiLogIn size={24} /> {/* Login Icon */}
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut, FiLogIn, FiSun, FiMoon } from "react-icons/fi"; // Icons

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // Check localStorage for theme preference
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("navbarTheme") === "dark"
  );

  // Save theme preference in localStorage
  useEffect(() => {
    localStorage.setItem("navbarTheme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container">
        {/* Home Button (Always Visible) */}
        <Link className="navbar-brand fw-bold" to="/">AI Notes</Link>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-bold" to="/create">My Notes</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-3" onClick={logout}>
                    <FiLogOut size={24} /> {/* Logout Icon */}
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary ms-3" to="/auth">
                  <FiLogIn size={24} /> {/* Login Icon */}
                </Link>
              </li>
            )}

            {/* Theme Toggle Button */}
            <li className="nav-item">
              <button className="btn btn-outline-secondary ms-3" onClick={() => setDarkMode(!darkMode)}>
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
