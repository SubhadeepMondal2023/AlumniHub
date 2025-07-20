import React, { useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../css/navbar.css";
import Dropdown from "../common/Dropdown";
import { useGetMyProfileQuery, useLogoutUserMutation } from "../../redux/api/authSlice.js";

function Navbar() {
  const navref = useRef();

  const showNavbar = () => {
    navref.current.classList.toggle("responsive_nav");
  };
  const { isLoading, isError, data: userData } = useGetMyProfileQuery();
  const [logoutUser, { isSuccess, error }] = useLogoutUserMutation();
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('token');
      window.location.reload();
      window.location.href = '/';
    }
    if (error) {
      console.log(error);
    }
  }, [isError, isSuccess]);
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
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/events">Events</Link>
            <Link className="nav-link" to="/alumni">Alumni</Link>
            <Dropdown navlink={'Services'} childlinks={['Job']} />
            <Link className="nav-link" to="/donation">Donation</Link>
            <Link className="nav-link" to="/about">About Us</Link>
            <Link className="nav-link" to="/notifications">Notifications</Link>
            <Link className="nav-link" to="/team">The Team</Link>
            <Link className="nav-link" to="/myprofile">Hi, {userData.data.firstName}</Link>
            <Link className="nav-link" onClick={() => {
              logoutUser().unwrap();

            }}>Logout</Link>
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