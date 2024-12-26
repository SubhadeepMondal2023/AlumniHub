import { useState } from 'react';
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
import GroupPage from './components/Group/GroupPage.jsx';
import { useGetMyProfileQuery } from './redux/api/authSlice.js';
import { Spinner } from 'react-bootstrap';
import Events from './components/Events/events.jsx';
import Reunion from './components/Events/reunion.jsx';
import Loader from './utils/Loader.jsx';
import MyProfile from './components/Profile/MyProfile.jsx';
import VerifyOTP from './components/Auth/VerifyOTP.jsx';
import EditProfile from './components/Profile/EditProfile.jsx';


function App() {
  const {isLoading, isError, data:userData} = useGetMyProfileQuery();
  const [userRole, setUserRole] = useState('admin'); 
  const isAdmin = userData && userData.success && userRole === 'admin';

  return (
      isLoading ? <Loader/> :
      <Router>
      {userData?.success && <Navbar />}
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/login" element={userData?.success ? <HeroPage /> : <Login />} />
        <Route path="/register" element={userData?.success ? <HeroPage /> : <Register />} />
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/myprofile" element={<MyProfile />} /> 
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path='/edit-profile' element={<EditProfile />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/donation-payment" element={<DonationPayment />} />
        <Route path="/notifications" element={<NotificationList  />} />
        <Route path="/alumni" element={<AlumniPage />} /> 
        <Route path="/team" element={<TheTeam />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/reunion" element={<Reunion />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
