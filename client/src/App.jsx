import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './components/HeroSection/HeroPage.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx'; 
import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import Donation from './components/Donation/Donation.jsx';
import NotificationList from './components/Notification/NotificationList.jsx'; 
import AlumniPage from './components/Alumni/AlumniPage.jsx'; 
import TheTeam from './components/The Team/TheTeam.jsx';
import DonationPayment from './components/Donation/DonationPayment.jsx';
import Events from './components/Events/events.jsx';
import Reunion from './components/Events/reunion.jsx';
import MyProfile from './components/Profile/MyProfile.jsx';
import VerifyOTP from './components/Auth/VerifyOTP.jsx';
import EditProfile from './components/Profile/EditProfile.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import { useGetMyProfileQuery } from './redux/api/authSlice.js';
import Loader from './utils/Loader.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';
import { InternshipComponent, JobComponent } from './components/Services/Services.jsx';
import JobPostDetails from './components/Services/JobPostDetails.jsx';

function App() {
  const { isLoading, isError, data: userData } = useGetMyProfileQuery();
  
  return (
    isLoading ? <Loader /> :
    <Router>
      {userData?.success && <Navbar />}
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={userData?.success ? <HeroPage /> : <Login />} />
        <Route path="/register" element={userData?.success ? <HeroPage /> : <Register />} />
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/myprofile" element={<ProtectedRoute element={MyProfile} />} />
        <Route path="/verify-otp" element={<VerifyOTP/>} />
        <Route path="/edit-profile" element={<ProtectedRoute element={EditProfile} />} />
        <Route path="/donation" element={<ProtectedRoute element={Donation} />} />
        <Route path="/donation-payment" element={<ProtectedRoute element={DonationPayment} />} />
        <Route path="/notifications" element={<ProtectedRoute element={NotificationList} />} />
        <Route path="/alumni" element={<ProtectedRoute element={AlumniPage} />} />
        <Route path="/team" element={<TheTeam />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reunion" element={<Reunion />} />
        <Route path="/services/job" element={<ProtectedRoute element={JobComponent} />} />
        <Route path='/services/internship' element={<ProtectedRoute element={InternshipComponent} />}/>
        <Route path='/job/:jobId' element={<ProtectedRoute element={JobPostDetails} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
