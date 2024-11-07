import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import JobCard from "../../components/JobCard/JobCard";
import styles from "./Jobs.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { jobsEndPoint } from "../../api";

const Jobs = () => {
  const [jobData, setJobData] = useState([]); // State to store job data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${jobsEndPoint}`); // Replace with actual API endpoint
        setJobData(response.data);
        console.log(jobData) // Assuming response.data is an array of jobs
      } catch (err) {
        setError("Failed to load job data");
        console.error("Error fetching job data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-4">
        {loading && <p>Loading jobs...</p>}
        {error && <p>{error}</p>}
        <div className={`JobsContainer ${styles.JobsContainer}`}>
          {jobData.map((job, index) => (
            <JobCard
              key={job.jobId} // Assuming jobId is unique and acts as the key
              jobId={job.jobId}
              jobTitle={job.jobTitle}
              jobPosition={job.jobPosition}
              status={job.status}
              stipend={job.stipend}
              locationId={job.locationId}
              companyId={job.companyId}
              jobTypeId={job.jobTypeId}
              alumId={job.alumId}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobs;
// [
//   {
//     jobId: 1,
//     jobTitle: "Software Engineer",
//     jobPosition: "Developer",
//     status: "Open",
//     stipend: 5000,
//     locationId: 2,
//     companyId: 1,
//     jobTypeId: 1,
//     alumId: 3,
//   },
//   {
//     jobId: 2,
//     jobTitle: "Software Engineer",
//     jobPosition: "Developer",
//     status: "Open",
//     stipend: 12000,
//     locationId: 3,
//     companyId: 6,
//     jobTypeId: 1,
//     alumId: 11,
//   },
// ]
