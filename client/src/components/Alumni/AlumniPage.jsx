import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AlumniCard from "../Alumni/AlumniCard";
import Pagination from "../common/Pagination";
import { useFetchAlumniQuery } from "../../redux/api/alumniApiSlice";
import Loader from "../../utils/Loader.jsx";
import { BsGeoAltFill, BsBuilding, BsBriefcaseFill, BsMortarboardFill, BsCalendar3, BsClockFill, BsGlobe } from "react-icons/bs";

import { getUniqueFilterOptions, applyFilters } from "../../utils/customFilter.js";


const filterKeys = ["designation", "location", "currentCompany", "yoe"];

const AlumniPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showContactActions, setShowContactActions] = useState(false);
  const [filters, setFilters] = useState({
    designation: "",
    location: "",
    degree: "",
    currentCompany: "",
    yoe: "",
    searchByName: "",
  });

  const { data: alumniData, isLoading, isError } = useFetchAlumniQuery(filters);
  
  const data = useMemo(() => alumniData?.data || [], [alumniData]);

  const handleFilterChange = useCallback((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const filterOptions = useMemo(() => getUniqueFilterOptions(data, filterKeys), [data]);
  const filteredAlumni = useMemo(() => applyFilters(data, filters), [data, filters]);
  const totalPages = Math.ceil(filteredAlumni.length / 6);
  const alumniToDisplay = useMemo(() => filteredAlumni.slice((currentPage - 1) * 6, currentPage * 6), [filteredAlumni, currentPage]);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <h1 className="text-center my-5 text-dark">Alumni Details</h1>

      {/* Filter Section */}
      <Row className="mb-4 d-flex justify-content-center align-items-center">
        {filterKeys.map((key) => (
          <Col xs={6} md={2} key={key}>
            <FilterInput
              label={key}
              value={filters[key]}
              options={filterOptions[key]}
              onChange={(value) => handleFilterChange(key, value)}
            />
          </Col>
        ))}
      </Row>

      {/* Alumni Cards */}
      <Row>
        {isError ? (
          <p>Error fetching data.</p>
        ) : (
          alumniToDisplay.map((alumni) => (
            <Col xs={12} md={6} lg={4} key={alumni.alumniId}>
              <AlumniCard alumni={alumni} showContactActions={showContactActions} />
            </Col>
          ))
        )}
      </Row>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        disableNext={currentPage >= totalPages}
        disablePrev={currentPage <= 1}
      />

      {/* Contact Alumni Button */}
      <div className="text-center mt-4">
        <Button variant="info" onClick={() => setShowContactActions(!showContactActions)}>
          {showContactActions ? "Hide Contact Details" : "Contact Alumni"}
        </Button>
      </div>
    </Container>
  );
};

const FilterInput = ({ label, value, options, onChange }) => {
  return (
    <Form.Group controlId={`filter-${label}`}>
      <Form.Label className="fw-bold">
        {label === "designation" && <BsBriefcaseFill className="text-primary me-2" />}
        {label === "location" && <BsGeoAltFill className="text-danger me-2" />}
        {label === "degree" && <BsMortarboardFill className="text-warning me-2" />}
        {label === "currentCompany" && <BsBuilding className="text-info me-2" />}
        {label === "yoe" && <BsClockFill className="text-secondary me-2" />}
        {label === "searchByName" && <Search className="text-dark me-2" />}
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </Form.Label>
      {label === "yoe" || label === "searchByName" ? (
        <Form.Control type={label === "yoe" ? "number" : "text"} placeholder={`Enter ${label}`} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Form.Control as="select" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">All</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </Form.Control>
      )}
    </Form.Group>
  );
};



export default AlumniPage;
