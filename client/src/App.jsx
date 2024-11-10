import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './components/HeroSection/HeroPage.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx'; // Import AboutUs component
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/about" element={<AboutUs />} /> {/* New AboutUs route */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
