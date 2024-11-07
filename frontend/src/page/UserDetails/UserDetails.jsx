import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./UserDetails.module.css";

const fetchUserDetails = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId: 1,
        fname: "Sandeep",
        lname: "Singh",
        email: "sandeep@example.com",
        role: "alumni",
        yOPassing: 2018,
        occupation: "Software Engineer",
        company: "TechCorp",
        address: "123 Street, City, Country",
        college: "IIT BHU Varanasi",
        course: "B.Tech",
        department: "Computer Science",
      });
    }, 1000);
  });
};

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch the user details when the component mounts
    fetchUserDetails().then((data) => setUserDetails(data));
  }, []);

  if (!userDetails) {
    return <p>Loading user details...</p>;
  }

  return (
    <>
      <Header />
      <div className={`${styles.container} card`}>
        <div className="card-body">
          <p>
            <strong>First Name:</strong> {userDetails.fname}
          </p>
          <p>
            <strong>Last Name:</strong> {userDetails.lname}
          </p>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>Role:</strong>{" "}
            {userDetails.role === "student" ? "Student" : "Alumni"}
          </p>

          {/* Conditional rendering for Student */}
          {userDetails.role === "student" && (
            <>
              <p>
                <strong>Year of Starting:</strong> {userDetails.yOStarting}
              </p>
              <p>
                <strong>Year of Ending:</strong> {userDetails.yOEnding}
              </p>
              <p>
                <strong>Course:</strong> {userDetails.course}
              </p>
              <p>
                <strong>Department:</strong> {userDetails.department}
              </p>
              <p>
                <strong>College:</strong> {userDetails.college}
              </p>
            </>
          )}

          {/* Conditional rendering for Alumni */}
          {userDetails.role === "alumni" && (
            <>
              <p>
                <strong>Year of Passing:</strong> {userDetails.yOPassing}
              </p>
              <p>
                <strong>Occupation:</strong> {userDetails.occupation}
              </p>
              <p>
                <strong>Company:</strong> {userDetails.company}
              </p>
              <p>
                <strong>Address:</strong> {userDetails.address}
              </p>
              <p>
                <strong>College:</strong> {userDetails.college}
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDetails;
