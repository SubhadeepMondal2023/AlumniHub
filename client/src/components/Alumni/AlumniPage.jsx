import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import AlumniCard from "../Alumni/AlumniCard";
import Pagination from "../common/Pagination";
import { useFetchAlumniQuery } from "../../redux/api/alumniApiSlice";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const AlumniPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ designation: "", location: "" });

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { data, isLoading, isError } = useFetchAlumniQuery(filters);

  
  const designations = data ? [...new Set(data.map((alumni) => alumni.Designation))] : [];
  const locations = data ? [...new Set(data.map((alumni) => alumni.Location))] : [];

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
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <Autocomplete
            options={designations}
            getOptionLabel={(option) => option || ""}
            value={filters.designation}
            onChange={(event, value) => handleFilterChange("designation", value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Filter by Designation" variant="outlined" />
            )}
          />
        </Col>
        <Col xs={12} md={6}>
          <Autocomplete
            options={locations}
            getOptionLabel={(option) => option || ""}
            value={filters.location}
            onChange={(event, value) => handleFilterChange("location", value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Filter by Location" variant="outlined" />
            )}
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
