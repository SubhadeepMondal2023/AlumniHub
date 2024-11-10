import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../css/alumniStats.css';

const CountUp = ({ end, duration, startCounting }) => {
   const [count, setCount] = useState(0);

   useEffect(() => {
      if (!startCounting) return;

      let start = 0;
      const increment = end / (duration * 1000 / 10);
      const interval = setInterval(() => {
         start += increment;
         if (start >= end) {
            clearInterval(interval);
            setCount(end);
         } else {
            setCount(Math.ceil(start));
         }
      }, 10);

      return () => clearInterval(interval);
   }, [end, duration, startCounting]);

   return <h3 className="count-number">{count.toLocaleString()}+</h3>;
};

const AlumniFeature = () => {
   const [startCounting, setStartCounting] = useState(false);
   const statsRef = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setStartCounting(true);
               observer.disconnect(); 
            }
         },
         { threshold: 0.5 } 
      );

      if (statsRef.current) {
         observer.observe(statsRef.current);
      }

      return () => observer.disconnect();
   }, []);

   return (
      <section className="alumni-stats py-5" ref={statsRef}>
         <Container>
            <Row className="text-center">
               <Col xs={6} md={3}>
                  <CountUp end={10000} duration={2} startCounting={startCounting} />
                  <p>Alumni Members</p>
               </Col>
               <Col xs={6} md={3}>
                  <CountUp end={50} duration={2} startCounting={startCounting} />
                  <p>Countries Represented</p>
               </Col>
               <Col xs={6} md={3}>
                  <CountUp end={1000} duration={2} startCounting={startCounting} />
                  <p>Career Opportunities Shared</p>
               </Col>
               <Col xs={6} md={3}>
                  <CountUp end={500} duration={2} startCounting={startCounting} />
                  <p>Events Organized</p>
               </Col>
            </Row>
         </Container>
      </section>
   );
};

export default AlumniFeature;
