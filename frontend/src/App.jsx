import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Jobs from "./page/Jobs/Jobs";
import AlumniDetails from "./page/UserDetails/UserDetails";
import ReferralApplication from "./page/ReferralApplication/ReferralApplication";
import UserDetails from "./page/UserDetails/UserDetails";
import axios from "axios";
import { usersEndPoint, alumniEndPoint } from "./api/index";
import JobPostingApplication from "./page/JobPostingApplication/JobPostingApplication";

function App() {
  // this is not end

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(usersEndPoint);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
  //this is end

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* referral application  */}
        <Route path="/referral-application" element={<ReferralApplication />} />
        {/* show user details  */}
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post-job" element={<JobPostingApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
