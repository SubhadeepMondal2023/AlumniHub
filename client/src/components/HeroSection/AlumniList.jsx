import React, { useEffect } from "react";
import { useFetchAlumniQuery } from "../../redux/api/alumniApiSlice";
import { Col, Container, Row } from "react-bootstrap";
import AlumniCard from "../Alumni/AlumniCard";
import Loader from "../../utils/Loader";

const AlumniList = () => {
  const { data: alumniData, isLoading, isError } = useFetchAlumniQuery();

  if (isLoading) return   <Loader/>;
  if (isError) return <p>Failed to load alumni data.</p>;
  
  
  return (
    <section className="alumni-list-section light">
      <Container>
        <h1 className="alumni-heading mb-5 text-center">Our Distinguished Alumni</h1>
        <Row>
          {alumniData?.data?.slice(0,6).map((alumni) => (
            <Col xs={12} md={6} lg={4} className="mb-4" key={alumni.alumniId}>
              <AlumniCard alumni={alumni} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AlumniList;
