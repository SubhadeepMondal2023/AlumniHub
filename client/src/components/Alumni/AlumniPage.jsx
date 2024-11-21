import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import AlumniCard from "../Alumni/AlumniCard";
import AlumniList from "../HeroSection/AlumniList";
import Pagination from "../common/Pagination";
import { useFetchAlumniQuery } from "../../redux/api/alumniApiSlice";

const AlumniPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ designation: "", location: "" });

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data, isLoading, isError } = useFetchAlumniQuery(filters);

  const totalPages = data ? Math.ceil(data.length / 5) : 1;
  const filteredAlumni = data
    ? data.filter((alumni) => {
        return (
          (filters.designation
            ? alumni.Designation.toLowerCase().includes(filters.designation.toLowerCase())
            : true) &&
          (filters.location
            ? alumni.Location.toLowerCase().includes(filters.location.toLowerCase())
            : true)
        );
      })
    : [];

  const alumniToDisplay = filteredAlumni.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <Container>
      <h1 className="text-center my-5">Alumni Details</h1>

      {/* Filter Options */}
      <Form>
        <Row className="mb-4">
          <Col xs={12} md={6}>
            <Form.Group controlId="designationFilter">
              <Form.Label>Filter by Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter designation"
                name="designation"
                value={filters.designation}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="locationFilter">
              <Form.Label>Filter by Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Alumni List */}
      <Row>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching data.</p>
        ) : (
          alumniToDisplay.map((alumni) => (
            <Col xs={12} md={6} lg={4} key={alumni.AlumniID}>
              <AlumniCard alumni={alumni} />
            </Col>
          ))
        )}
      </Row>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default AlumniPage;
