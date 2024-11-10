import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HeroPage from './components/HeroSection/HeroPage.jsx';
import Footer from './components/Footer/Footer.jsx';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HeroPage />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
