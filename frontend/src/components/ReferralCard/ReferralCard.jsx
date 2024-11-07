import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ReferralCard.module.css";

const ReferralCard = ({ referralId, alumId, jobId, companyId, userId }) => {
  const [userDetails, setUserDetails] = useState({});
  const [companyDetails, setCompanyDetails] = useState({});
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        // Fetch User Details
        const userResponse = await axios.get(`/api/users/${userId}`);
        setUserDetails(userResponse.data);

        // Fetch Company Details
        const companyResponse = await axios.get(`/api/companies/${companyId}`);
        setCompanyDetails(companyResponse.data);

        // Fetch Job Details
        const jobResponse = await axios.get(`/api/jobs/${jobId}`);
        setJobDetails(jobResponse.data);
      } catch (err) {
        setError("Failed to load some details.");
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [userId, companyId, jobId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      className={`card ${styles.cardContainer}`}
      style={{ margin: "10px", minWidth: "50vw" }}
    >
      <div className="card-body">
        <h5 className="card-title">Referral Request</h5>

        {/* Display User Details */}
        <p className="card-text">
          <strong>Student Name:</strong> {userDetails.name || "N/A"}
        </p>
        <p className="card-text">
          <strong>Student Email:</strong> {userDetails.email || "N/A"}
        </p>

        {/* Display Company Details */}
        <p className="card-text">
          <strong>Company Name:</strong> {companyDetails.name || "N/A"}
        </p>

        {/* Display Job Details */}
        <p className="card-text">
          <strong>Job Title:</strong> {jobDetails.title || "N/A"}
        </p>
        <p className="card-text">
          <strong>Job Position:</strong> {jobDetails.position || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ReferralCard;
