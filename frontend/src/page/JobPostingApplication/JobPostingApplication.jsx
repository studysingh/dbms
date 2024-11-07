import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import styles from "./JobPostingApplication.module.css";
import {
  alumniEndPoint,
  companiesEndPoint,
  jobdetailsEndPoint,
  jobsEndPoint,
  locationsEndPoint,
  typesofjobsEndPoint,
} from "../../api";
import axios from "axios";
import { authentication } from "../../api/authentication";
import { useNavigate } from "react-router";

const JobPostingApplication = () => {
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [stipend, setStipend] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [allJobTypes, setAllJobTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // loading job types
  useEffect(() => {
    // Replace with your API endpoint
    const fetchJobTypes = async () => {
      try {
        const response = await axios.get(`${typesofjobsEndPoint}`); // API endpoint to get departments
        setAllJobTypes(response.data); // Set departments in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setLoading(false);
        console.log(err); // Set loading to false in case of error
      }
    };

    fetchJobTypes(); // Call the function to fetch departments
  }, []);
  // Submit common fields
  const handleSubmitController = async () => {
    // get location id
    const locationData = { city, country, address };
    let res = await axios.post(
      `${locationsEndPoint}/getId`, // URL
      locationData, // Data to be sent in the body
      {
        headers: {
          "Content-Type": "application/json", // Set Content-Type to JSON
        },
      }
    );
    const locationId = res.data;
    console.log(res);
    // get company id
    const companyData = { companyName: company };
    res = await axios.post(
      `${companiesEndPoint}/getId`, // URL
      companyData, // Data to be sent in the body
      {
        headers: {
          "Content-Type": "application/json", // Set Content-Type to JSON
        },
      }
    );
    const companyId = res.data;
    // alumId
    const userId = authentication();
    if (userId === 0) {
      navigate("/");
      return;
    }

    const alumniData = { userId: userId };
    res = await axios.post(
      `${alumniEndPoint}/getAlum`, // URL
      alumniData, // Data to be sent in the body
      {
        headers: {
          "Content-Type": "application/json", // Set Content-Type to JSON
        },
      }
    );
    const resData = res.data;
    const alumId = resData.alumId;
    console.log(resData);
    console.log(alumId);
    // final submission
    const jobData = {
      jobTitle: title,
      jobPosition: position,
      status,
      stipend,
      locationId,
      companyId,
      jobTypeId: jobType,
      alumId,
    };

    try {
      // Send primary data to the backend using Axios
      let response = await axios.post(
        jobsEndPoint, // URL
        jobData, // Data to be sent in the body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
          },
        }
      );

      const jobId = response.data;
      console.log("jobid ", response);
      // sending data for company details
      const jobDetailsData = { jobId, jobDescription: description, jobLink };
      response = await axios.post(
        jobdetailsEndPoint, // URL
        jobDetailsData, // Data to be sent in the body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
          },
        }
      );
      console.log("common ", response);

      // Navigate after successful submission
      // navigate("/user-details");
    } catch (error) {
      console.error("Primary submission error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitController();
  };

  return (
    <>
      <Header />
      <h3 style={{ textAlign: "center", margin: "2%" }}>Post Job Here...</h3>

      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div
            className={`row gx-lg-5 align-items-center mb-5 ${styles.mainContainer}`}
          >
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={handleSubmit}>
                    {/* Basic Info: First and Last Name */}
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        {/* title */}
                        <div className="form-outline">
                          <input
                            type="text"
                            id="title"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter Job Title"
                          />
                          <label className="form-label" htmlFor="title">
                            Title
                          </label>
                        </div>
                        {/* position */}
                        <div className="form-outline">
                          <input
                            type="text"
                            id="position"
                            className="form-control"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                            placeholder="Enter Position"
                          />
                          <label className="form-label" htmlFor="position">
                            Position
                          </label>
                        </div>
                        {/* status */}
                        <div className="form-outline mb-4">
                          <select
                            id="status"
                            className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                          </select>
                          <label className="form-label" htmlFor="status">
                            Status
                          </label>
                        </div>
                        {/* JobType */}
                        {/* JobType - updated */}
                        <div className="form-outline mb-4">
                          <select
                            id="jobType"
                            className="form-control"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            required
                          >
                            <option value="">Select Job Type</option>
                            {loading ? (
                              <option value="">Loading...</option> // Placeholder during loading
                            ) : (
                              allJobTypes.map((job) => (
                                <option key={job.typeId} value={job.typeId}>
                                  {job.jobType}
                                </option>
                              ))
                            )}
                          </select>
                          <label className="form-label" htmlFor="jobType">
                            Job Type
                          </label>
                        </div>
                        {/* stipend */}
                        <div className="form-outline">
                          <input
                            type="number"
                            id="stipend"
                            className="form-control"
                            value={stipend}
                            onChange={(e) => setStipend(e.target.value)}
                            required
                            placeholder="Enter Stipend Amount"
                          />
                          <label className="form-label" htmlFor="stipend">
                            Stipend
                          </label>
                        </div>
                        {/* city */}
                        <div className="form-outline">
                          <input
                            type="text"
                            id="city"
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder="Enter City"
                          />
                          <label className="form-label" htmlFor="city">
                            City
                          </label>
                        </div>
                        {/* country */}
                        <div className="form-outline">
                          <input
                            type="text"
                            id="country"
                            className="form-control"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder="Enter Country"
                          />
                          <label className="form-label" htmlFor="country">
                            Country
                          </label>
                        </div>
                        {/* address */}
                        <div className="form-outline">
                          <input
                            type="text"
                            id="address"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Enter Job Address"
                          />
                          <label className="form-label" htmlFor="address">
                            Address
                          </label>
                        </div>
                        {/* company */}
                        <div className="form-outline">
                          <input
                            type="text"
                            id="company"
                            className="form-control"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            placeholder="Enter Company Name"
                          />
                          <label className="form-label" htmlFor="company">
                            Company
                          </label>
                        </div>{" "}
                        {/* Job Link */}
                        <div className="form-outline">
                          <input
                            type="text"
                            id="jobLink"
                            className="form-control"
                            value={jobLink}
                            onChange={(e) => setJobLink(e.target.value)}
                            required
                            placeholder="Enter Job Link"
                          />
                          <label className="form-label" htmlFor="jobLink">
                            Job Link
                          </label>
                        </div>
                        {/* description */}
                        <div className="form-outline">
                          <input
                            type="text"
                            id="description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Enter Job Description"
                          />
                          <label className="form-label" htmlFor="description">
                            Description
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block">
                      Post Job
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default JobPostingApplication;
