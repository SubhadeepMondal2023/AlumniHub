import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js'; 
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('admin'); 
  const isAdmin = isAuthenticated && userRole === 'admin';

  return (
    <Provider store={store}>
      <Router>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/donation" element={<Donation />} />
          <Route path="/notifications" element={<NotificationList isAdmin={isAdmin} />} />
          <Route path="/alumni" element={<AlumniPage />} /> 
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
