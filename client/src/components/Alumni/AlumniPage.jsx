import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AlumniCard from "../Alumni/AlumniCard";
import Pagination from "../common/Pagination";
import { useFetchAlumniQuery } from "../../redux/api/alumniApiSlice";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const AlumniPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showContactActions, setShowContactActions] = useState(false);
  const [filters, setFilters] = useState({
    designation: "",
    location: "",
    yearOfGraduation: "",
    degree: "",
    department: "",
    name: "",
  });

  const { data, isLoading, isError } = useFetchAlumniQuery(filters);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const designations = data ? [...new Set(data.map((alumni) => alumni.Designation))] : [];
  const locations = data ? [...new Set(data.map((alumni) => alumni.Location))] : [];
  const yearsOfGraduation = data
    ? [...new Set(data.map((alumni) => alumni.YearOfGraduation))]
    : [];
  const degrees = data ? [...new Set(data.map((alumni) => alumni.Degree))] : [];
  const departments = data ? [...new Set(data.map((alumni) => alumni.Department))] : [];

  const totalPages = data ? Math.ceil(data.length / 5) : 1;
  const filteredAlumni = data
    ? data.filter((alumni) => {
        return (
          (filters.name
            ? alumni.Name.toLowerCase().includes(filters.name.toLowerCase())
            : true) &&
          (filters.designation
            ? alumni.Designation.toLowerCase().includes(filters.designation.toLowerCase())
            : true) &&
          (filters.location
            ? alumni.Location.toLowerCase().includes(filters.location.toLowerCase())
            : true) &&
          (filters.yearOfGraduation
            ? alumni.YearOfGraduation === filters.yearOfGraduation
            : true) &&
          (filters.degree
            ? alumni.Degree.toLowerCase().includes(filters.degree.toLowerCase())
            : true) &&
          (filters.department
            ? alumni.Department.toLowerCase().includes(filters.department.toLowerCase())
            : true)
        );
      })
    : [];

  const alumniToDisplay = filteredAlumni.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <Container>
      <h1 className="text-center my-5" style={{ color: "black" }}>
        Alumni Details
      </h1>

      {/* Filter Options */}
      <Row className="mb-4 d-flex align-items-center">
        <Col xs={6} md={2}>
          <Autocomplete
            size="small"
            options={designations}
            getOptionLabel={(option) => option || ""}
            value={filters.designation}
            onChange={(event, value) => handleFilterChange("designation", value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Designation" variant="outlined" />
            )}
          />
        </Col>
        <Col xs={6} md={2}>
          <Autocomplete
            size="small"
            options={locations}
            getOptionLabel={(option) => option || ""}
            value={filters.location}
            onChange={(event, value) => handleFilterChange("location", value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Location" variant="outlined" />
            )}
          />
        </Col>
        <Col xs={6} md={2}>
          <Autocomplete
            size="small"
            options={yearsOfGraduation}
            getOptionLabel={(option) => option.toString()}
            value={filters.yearOfGraduation}
            onChange={(event, value) =>
              handleFilterChange("yearOfGraduation", value || "")
            }
            renderInput={(params) => (
              <TextField {...params} label="Year" variant="outlined" />
            )}
          />
        </Col>
        <Col xs={6} md={2}>
          <Autocomplete
            size="small"
            options={degrees}
            getOptionLabel={(option) => option || ""}
            value={filters.degree}
            onChange={(event, value) => handleFilterChange("degree", value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Degree" variant="outlined" />
            )}
          />
        </Col>
        <Col xs={6} md={2}>
          <Autocomplete
            size="small"
            options={departments}
            getOptionLabel={(option) => option || ""}
            value={filters.department}
            onChange={(event, value) => handleFilterChange("department", value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Department" variant="outlined" />
            )}
          />
        </Col>
        <Col xs={6} md={2}>
          <TextField
            size="small"
            label="Search by Name"
            variant="outlined"
            value={filters.name}
            onChange={(e) => handleFilterChange("name", e.target.value)}
            fullWidth
          />
        </Col>
      </Row>

      {/* Alumni List */}
      <Row>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching data.</p>
        ) : (
          alumniToDisplay.map((alumni) => (
            <Col xs={12} md={6} lg={4} key={alumni.AlumniID}>
              <AlumniCard
                alumni={alumni}
                showContactActions={showContactActions}
              />
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

      {/* Contact Alumni Button */}
      <div className="text-center mt-4">
        <Button
          variant="info"
          onClick={() => setShowContactActions(!showContactActions)}
        >
          {showContactActions ? "Hide Contact Details" : "Contact Alumni"}
        </Button>
      </div>
    </Container>
  );
};

export default AlumniPage;
