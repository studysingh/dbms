import React from "react";
import styles from "./Footer.module.css"; // Import any custom CSS for styling

const Footer = () => {
  return (
    <div className={`container ${styles.footerContainer}`}>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <svg className="bi" width="30" height="24">
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>
          <span className="text-muted">
            &copy; {new Date().getFullYear()} Alumni Connect
          </span>
        </div>

        <div className="col-md-4 d-flex flex-column align-items-center">
          <span className="text-muted">
            Contact Us: support@alumniconnect.com
          </span>
          <span className="text-muted">Phone: +1 (123) 456-7890</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-muted" href="https://twitter.com/AlumniConnect">
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#twitter" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-muted"
              href="https://instagram.com/AlumniConnect"
            >
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#instagram" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://facebook.com/AlumniConnect">
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#facebook" />
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
