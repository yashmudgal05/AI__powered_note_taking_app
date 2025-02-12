import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <h1 className="navbar-brand">AI Notes</h1>
      <div>
        <Link to="/" className="btn btn-outline-light mx-2">Home</Link>
        <Link to="/notes" className="btn btn-outline-light mx-2">My Notes</Link>
      </div>
    </nav>
  );
};

export default Navbar;
