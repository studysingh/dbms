import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import styles from "./JobCard.module.css"; // Import your CSS module
import {
  companiesEndPoint,
  jobdetailsEndPoint,
  locationsEndPoint,
  typesofjobsEndPoint,
  alumniEndPoint,
  referralsEndPoint,
} from "../../api"; // Ensure these endpoints are correctly imported
import { authentication } from "../../api/authentication";

const JobCard = ({
  jobId,
  jobTitle,
  jobPosition,
  status,
  stipend,
  locationId,
  companyId,
  jobTypeId,
  alumId,
}) => {
  // State variables to store fetched data
  const [locationData, setLocationData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [jobTypeData, setJobTypeData] = useState({});
  const [alumniData, setAlumniData] = useState({});
  const [jobDetailsData, setJobDetailsData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [error, setError] = useState(""); // Error handling state

  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error state before starting new fetch

        // Fetch location data
        let res = await axios.get(`${locationsEndPoint}/${locationId}`);
        setLocationData(res.data);

        // Fetch company data
        res = await axios.get(`${companiesEndPoint}/${companyId}`);
        setCompanyData(res.data);

        // Fetch job type data
        res = await axios.get(`${typesofjobsEndPoint}/${jobTypeId}`);
        setJobTypeData(res.data);

        // Fetch job details
        res = await axios.get(`${jobdetailsEndPoint}/${jobId}`);
        setJobDetailsData(res.data);
      } catch (err) {
        setError("Failed to load job data. Please try again later.");
        console.error("Error fetching job data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [locationId, companyId, jobTypeId, jobId, navigate]);

  // If still loading, display a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleApplyForReferral = async () => {
    // alumid userid jobid companyid
    const userId = authentication();
    if (userId === 0) {
      navigate("/");
      return;
    }

    const data = { alumId, jobId, companyId, userId };

    try {
      // Make API call to verify user
      let res = await axios.post(
        `${referralsEndPoint}`, // URL to verify user
        data, // Data to be sent in the body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to JSON
          },
        }
      );

      console.log("referral ", res);
      // Navigate to the user details page
      // navigate("/user-details");
    } catch (error) {
      // Handle any errors during the request
      console.error("Error", error);
    }
  };
  // If there's an error, display an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className={`card ${styles.card}`}
      style={{ width: "18rem", margin: "4px" }}
    >
      <div className="card-body">
        <h5 className="card-title">{jobTitle}</h5>
        <p>
          <strong>Status : </strong> {status}
        </p>
        <p>
          <strong>Job Position:</strong> {jobPosition}
        </p>
        <p>
          <strong>Job Description:</strong>{" "}
          {jobDetailsData.jobDescription || "No description available"}
        </p>
        <p>
          <strong>Stipend:</strong> ${stipend}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {locationData.address || "Address not available"}
        </p>
        <p>
          <strong>Company:</strong>{" "}
          {companyData.companyName || "Company not available"}
        </p>
        <p>
          <strong>Job Type:</strong>{" "}
          {jobTypeData.jobType || "Job type not available"}
        </p>
        <p>
          <strong>Alumni ID:</strong> {alumId}
        </p>
      </div>
      <div className="card-body">
        <a
          href={jobDetailsData.jobLink || "#"}
          className="card-link"
          style={{ textDecoration: "none" }} // Inline style to remove underline
        >
          View Job Details
        </a>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => handleApplyForReferral()}
      >
        Apply For Referral
      </button>
    </div>
  );
};

export default JobCard;
