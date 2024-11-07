import React, { useEffect, useState } from "react";
import "./Signup.module.css";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  usersEndPoint,
  studentsEndPoint,
  alumniEndPoint,
  collegesEndPoint,
  occupationsEndPoint,
  companiesEndPoint,
  departmentsEndPoint,
} from "../../api";

const Signup = () => {
  const navigate = useNavigate();

  // common attribute
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("select");

  const [yOStarting, setYOStarting] = useState();
  const [yOEnding, setYOEnding] = useState();
  const [yOPassing, setYOPassing] = useState();
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [college, setCollege] = useState("");
  const [allDepartments, setAllDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // getting all departments
  useEffect(() => {
    // Replace with your API endpoint
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${departmentsEndPoint}`); // API endpoint to get departments
        setAllDepartments(response.data); // Set departments in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchDepartments(); // Call the function to fetch departments
  }, []);

  // Submit common fields
  const handlePrimarySubmit = async () => {
    const commonData = {
      fname: firstName,
      lname: lastName,
      email,
      password,
      role,
    };

    try {
      // Send primary data to the backend using Axios
      const response = await axios.post(
        usersEndPoint, // URL
        commonData, // Data to be sent in the body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
          },
        }
      );

      console.log("common ", response);
      // Based on the role, call role-specific submit
      handleRoleSpecificSubmit();

      // Navigate after successful submission
      // navigate("/user-details");
    } catch (error) {
      console.error("Primary submission error:", error);
    }
  };

  // Submit role-specific fields
  const handleRoleSpecificSubmit = async () => {
    try {
      if (role === "student") {
        // getting collegeid
        let response = await axios.post(
          `${collegesEndPoint}/getId`, // URL
          { collegeName: college }, // Data to be sent in the body
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
            },
          }
        );
        const collegeId = response.data;
        // geting user id
        response = await axios.post(
          `${usersEndPoint}/getId`, // URL
          { email: email }, // Data to be sent in the body
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
            },
          }
        );
        const userId = response.data;

        const studentData = {
          userId: parseInt(userId),
          yostarting: parseInt(yOStarting),
          yoending: parseInt(yOEnding),
          depId: parseInt(departmentId),
          collegeId: parseInt(collegeId),
        };
        // final submission
        response = await axios.post(
          studentsEndPoint, // URL
          studentData, // Data to be sent in the body
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
            },
          }
        );
        console.log("student point ", response);
      } else if (role === "alumni") {
        // get collegeId
        const collegeData = { collegeName: college };
        let res = await axios.post(
          `${collegesEndPoint}/getId`, // URL
          collegeData, // Data to be sent in the body
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
            },
          }
        );
        const collegeId = res.data;
        //get occupation id
        res = await axios.post(
          `${occupationsEndPoint}/getId`, // URL
          { occupationName: occupation }, // Data to be sent in the body
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
            },
          }
        );
        const occupationId = res.data;
        // company id
        res = await axios.post(
          `${companiesEndPoint}/getId`, // URL
          { companyName: company }, // Data to be sent in the body
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
            },
          }
        );
        const companyId = res.data;
        // geting user id
        res = await axios.post(
          `${usersEndPoint}/getId`, // URL
          { email: email }, // Data to be sent in the body
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
            },
          }
        );
        const userId = res.data;
        const alumniData = {
          userId: parseInt(userId),
          collegeId: parseInt(collegeId),
          yearOfPassing: parseInt(yOPassing),
          currentOccupationId: parseInt(occupationId),
          companyId: parseInt(companyId),
          address,
        };
        const response = await axios.post(
          alumniEndPoint, // URL
          alumniData, // Data to be sent in the body
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to JSON
            },
          }
        );
        console.log("alum ", response);
      } else {
        // handle role error here
        setRole("student");
      }
    } catch (error) {
      const response = await axios.delete(`usersEndPoint/${userId}`, {
        headers: {
          "Content-Type": "application/json", // Set Content-Type to JSON
        },
      });
      console.error("Role-specific submission error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePrimarySubmit();
  };
  // handle college
  const handleCollegeName = async () => {
    const collegeData = {
      collegecollegeName: college,
    };

    try {
      // Send primary data to the backend using Axios
      const response = await axios.post(
        collegesEndPoint, // URL
        collegeData, // Data to be sent in the body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
          },
        }
      );
      console.log("common ", response);
      // Based on the role, call role-specific submit
      await handleRoleSpecificSubmit();

      // Navigate after successful submission
      // navigate("/user-details");
    } catch (error) {
      console.error("Primary submission error:", error);
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
            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleSubmit}>
                  {/* Basic Info: First and Last Name */}
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="firstName">
                          First name
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="lastName">
                          Last name
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="password">
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

                  {/* Profile Details */}
                  <div>
                    {/* Common fields */}

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="college"
                        className="form-control"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        required
                      />
                      <label className="form-label" htmlFor="college">
                        College
                      </label>
                    </div>

                    {role === "student" && (
                      <>
                        {/* Year of Starting and Ending */}
                        <div className="form-outline mb-4">
                          <select
                            id="department"
                            className="form-control"
                            value={department}
                            onChange={(e) => {
                              setDepartmentId(e.target.value);
                              setDepartment(e.target.key);
                            }} // Update state with selected department
                            required
                          >
                            <option value="">Select</option>
                            {/* Map through allDepartments to generate options */}
                            {allDepartments.map((dep) => (
                              <option key={dep.depId} value={dep.depId}>
                                {dep.depName}
                              </option>
                            ))}
                          </select>
                          <label className="form-label" htmlFor="department">
                            Department
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="number"
                            id="yOStarting"
                            className="form-control"
                            value={yOStarting}
                            onChange={(e) => setYOStarting(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="yOStarting">
                            Year of Starting
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="number"
                            id="yOEnding"
                            className="form-control"
                            value={yOEnding}
                            onChange={(e) => setYOEnding(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="yOEnding">
                            Year of Ending
                          </label>
                        </div>
                      </>
                    )}

                    {role === "alumni" && (
                      <>
                        {/* Alumni-specific fields */}
                        <div className="form-outline mb-4">
                          <input
                            type="number"
                            id="yOPassing"
                            className="form-control"
                            value={yOPassing}
                            onChange={(e) => setYOPassing(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="yOPassing">
                            Year of Passing
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="occupation"
                            className="form-control"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="occupation">
                            Occupation
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="company"
                            className="form-control"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="company">
                            Company
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <textarea
                            id="address"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="address">
                            Address
                          </label>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Submit button */}
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
