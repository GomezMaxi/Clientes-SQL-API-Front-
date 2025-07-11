import { Link } from "wouter"; 
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/" className="navbar-logo-link">
          <img src="/IMG/Home.png" alt="Logo K" className="navbar-logo-img" />
          <span className="navbar-logo-text">liant</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;


