import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ReferralCard from "../../components/ReferralCard/ReferralCard";
import styles from "./ReferralApplication.module.css";
import { referralsEndPoint } from "../../api";

const ReferralApplication = () => {
  const [referralData, setReferralData] = useState([]); // State to store referral data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(referralsEndPoint); // Fetch data from API
        setReferralData(response.data); // Assuming response.data is an array of referrals
        console.log(response.data); // Log data for debugging
      } catch (err) {
        setError("Failed to load referral data");
        console.error("Error fetching referral data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReferralData();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        {loading && <p>Loading referrals...</p>}
        {error && <p>{error}</p>}
        {referralData.map((referral) => (
          <ReferralCard
            key={referral.referralId} // Use referralId as unique key
            referralId={referral.referralId}
            alumId={referral.alumId}
            jobId={referral.jobId}
            companyId={referral.companyId}
            userId={referral.userId}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ReferralApplication;
