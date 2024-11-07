import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Navbar.module.css"; // Import your CSS module

const Navbar = () => {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbar}`}
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              {" "}
              {/* Link to home (Login) */}
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/jobs">
              {" "}
              {/* Link to Jobs page */}
              Jobs
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/job-application">
              {" "}
              {/* Link to Job Application page */}
              Application
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/user-details">
              {" "}
              {/* Link to User Details page */}
              Profile
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/referral-application">
              {" "}
              {/* Link to Referral Application page */}
              Referral
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
