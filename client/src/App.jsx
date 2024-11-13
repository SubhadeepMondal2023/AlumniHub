import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './components/HeroSection/HeroPage.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx'; 
import Footer from './components/Footer/Footer.jsx';
import Faq from './components/AboutUs/Faq.jsx';
import  Navbar from './components/Navbar/Navbar.jsx';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/about" element={<AboutUs />} /> {/* New AboutUs route */}
          <Route path="/faqs" element={<Faq />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
