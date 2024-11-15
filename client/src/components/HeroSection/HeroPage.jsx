import React, { useState } from 'react'
import Banner from './Banner.jsx'
import HomeBanner from './HomeBanner.jsx';
import AlumniFeature from './AlumniFeature.jsx'
import AlumniImagesCarousel from './AlumniList.jsx'

const HeroPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div>
      {isAuthenticated ? <HomeBanner/> :<Banner/>}
      <AlumniFeature/>
      <AlumniImagesCarousel/>
    </div>
  )
}

export default HeroPage