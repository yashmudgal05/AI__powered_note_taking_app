// import { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkLogin = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const res = await axios.get("http://localhost:5000/api/auth/user", {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUser(res.data);
//         } catch (error) {
//           console.log("Session expired");
//           logout();
//         }
//       }
//     };
//     checkLogin();
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     setUser(userData);
//     navigate("/notes");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


// ---

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/users/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data); // ✅ Properly set user details
      } catch (error) {
        console.log("Session expired, logging out...");
        logout();
      }
    };

    checkLogin();
  }, []);

  const login = async (userId, token) => {
    localStorage.setItem("token", token);

    try {
      const res = await axios.get("http://localhost:5000/api/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data); // ✅ Fetch user details
      navigate("/"); // ✅ Redirect after successful login
    } catch (error) {
      console.error("Error fetching user details:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
