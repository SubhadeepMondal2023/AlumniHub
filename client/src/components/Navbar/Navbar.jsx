import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import "../../css/navbar.css";
import Dropdown from "../common/Dropdown";

function Navbar() {
  const navref = useRef();

  const showNavbar = () => {
    navref.current.classList.toggle("responsive_nav");
  };

  return (
    <React.Fragment>
      <header>
        <div className="company-name">
          <h2>
            <Link className="company-name-link" to="/">AlumniHub</Link>
          </h2>
        </div>
        <div className="company-navbar">
          <nav ref={navref}>
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to="/groups">Groups</Link>
            <Dropdown navlink={'Events'} childlinks={['reunion', 'workshop', 'Ted Talk', 'upcoming events', 'past events']} />
            <Link className="nav-link" to="/alumni">Alumni</Link>
            <Dropdown navlink={'Services'} childlinks={['job', 'internship', 'referral']} />
            <Link className="nav-link" to="/donation">Donation</Link>
            <Link className="nav-link" to="/about">About Us</Link>
            <Link className="nav-link" to="/notifications">Notifications</Link>
            <Link className="nav-link" to="/team">The Team</Link>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Navbar;