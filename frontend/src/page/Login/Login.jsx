import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import styles from "./Login.module.css"; // Add your CSS file here
import axios from "axios";
import { usersEndPoint } from "../../api";

const Login = () => {
  // State to manage email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usersData = { email, password, role };
    setError(""); // Reset error state

    // Validate form fields
    if (!email || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Make API call to verify user
      let res = await axios.post(
        `${usersEndPoint}/verify`, // URL to verify user
        usersData, // Data to be sent in the body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
          },
        }
      );

      const userId = res.data; // Assume userId is returned in the response body

      // Handle different response statuses
      if (userId === 0) {
        setError("Invalid user credentials.");
        return;
      } else if (userId < 0) {
        setError("Server error. Please try again later.");
        return;
      }

      // Store user info in localStorage (if needed)
      // Preferably, store only user ID or authentication token, not sensitive data like password.
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("password", password);

      console.log("Logging in with", { email, password, role });

      // Navigate to the user details page
      navigate("/user-details");
    } catch (error) {
      // Handle any errors during the request
      console.error("Login failed", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "rgb(0,100,20)" }}
            >
              Connect with Alumni <br />
              <span style={{ color: "rgb(0,200,100)" }}>
                and Grow Your Network
              </span>
            </h1>
            <p
              className="mb-4 opacity-70"
              style={{ color: "rgb(100,200,150)" }}
            >
              Join our platform to engage with alumni who have ventured into
              various fields. Seek mentorship, explore career opportunities, and
              build valuable relationships that can shape your future.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>
                  {/* Role selection */}
                  <div className="form-outline mb-4">
                    <select
                      id="role"
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="student">Student</option>
                      <option value="alumni">Alumni</option>
                    </select>
                    <label className="form-label" htmlFor="role">
                      Role
                    </label>
                  </div>
                  {/* Error message */}
                  {error && <div className="text-danger mb-3">{error}</div>}

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Log in
                  </button>

                  {/* Register button */}
                  <div className="text-center">
                    <p>
                      Don't have an account?{" "}
                      <a href="/signup" className="text-primary">
                        Register here
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
