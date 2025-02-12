import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
      login(res.data.user, res.data.token);
    } else {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      login(res.data.user, res.data.token);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <div className="btn-group mb-4">
        <button className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setIsLogin(true)}>Login</button>
        <button className={`btn ${!isLogin ? "btn-success" : "btn-outline-success"}`} onClick={() => setIsLogin(false)}>Register</button>
      </div>

      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        {!isLogin && (
          <input type="text" name="name" placeholder="Name" className="form-control my-2" onChange={handleChange} />
        )}
        <input type="email" name="email" placeholder="Email" className="form-control my-2" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="form-control my-2" onChange={handleChange} />
        <button type="submit" className="btn btn-primary">{isLogin ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

export default AuthPage;
