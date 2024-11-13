import React,{ useRef,useState,useEffect} from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../css/navbar.css";
import Dropdown from "../common/Dropdown";

function Navbar() {
  const navref=useRef();
  const showNavbar =()=>{
    navref.current.classList.toggle("responsive_nav");
  }
  const customDownLine = {
    height:"30px",
    width:"30px",
  }
  return (
      <React.Fragment>
        <header>
          <div className="company-name">
            <h2><a className="company-name-link" href="/"> AlumniHub</a></h2>
          </div>
          <div className="company-navbar">

            <nav ref={navref}>
              <a href="/home" >Home</a>
              <a href="/groups" >Groups</a>
              <a><Dropdown navlink={'Events'} childlinks={['reunion','workshop', 'Ted Talk','upcoming events','past events']}/></a>
              <a href="/alumni" >Alumni</a>
              <a><Dropdown navlink={'services'} childlinks={['job','internship','referal']}/></a>
              <a href="/donation" >Donation </a>
              <a href="/about" >About Us</a>
              <a href="/notifications">Notifications</a>
              <a href="team">The Team</a>
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes/>
              </button>
            </nav>
          <button className="nav-btn" onClick={showNavbar}>
              <FaBars/>
          </button>
        </div>
        </header>
      </React.Fragment>
    );
}

export default Navbar;