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
  const [data,setData] = useState([]);
  const [filters, setFilters] = useState({
    designation: "",
    location: "",
    yoe: "",
    degree: "",
    currentCompany: "",
    searchByName: ""
  });

  const { data: alumniData, isLoading, isError } = useFetchAlumniQuery(filters);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  useEffect(() => {
    if (alumniData) {
      setData(alumniData.data);
    }
  }, [alumniData]);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const designations = data ? [...new Set(data.map((alumni) => alumni.designation))] : [];
  const locations = data ? [...new Set(data.map((alumni) => alumni.location))] : [];
  const yearsOfExperience = data ? [...new Set(data.map((alumni) => alumni.yoe))] : [];
  const degrees = data ? [...new Set(data.map((alumni) => alumni.degree))] : [];
  const currentCompanies = data ? [...new Set(data.map((alumni) => alumni.currentCompany))] : [];

  const totalPages = data ? Math.ceil(data.length / 5) : 1;
  const filteredAlumni = data
    ? data.filter((alumni) => {
        return (
          (filters.searchByName
            ? alumni.firstName.toLowerCase().includes(filters.searchByName.toLowerCase()) ||
              alumni.lastName.toLowerCase().includes(filters.searchByName.toLowerCase())
            : true) &&
          (filters.designation
            ? alumni.designation.toLowerCase().includes(filters.designation.toLowerCase())
            : true) &&
          (filters.location
            ? alumni.location.toLowerCase().includes(filters.location.toLowerCase())
            : true) &&
          (filters.yoe ? alumni.yoe.toString() === filters.yoe : true) &&
          (filters.degree
            ? alumni.degree.toLowerCase().includes(filters.degree.toLowerCase())
            : true) &&
          (filters.currentCompany
            ? alumni.currentCompany.toLowerCase().includes(filters.currentCompany.toLowerCase())
            : true)
        );
      })
    : [];

  const alumniToDisplay = filteredAlumni.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    isLoading ? (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ):
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
            options={yearsOfExperience}
            getOptionLabel={(option) => option.toString()}
            value={filters.yoe}
            onChange={(event, value) => handleFilterChange("yoe", value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Years of Exp" variant="outlined" />
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
            options={currentCompanies}
            getOptionLabel={(option) => option || ""}
            value={filters.currentCompany}
            onChange={(event, value) => handleFilterChange("currentCompany", value || "")}
            renderInput={(params) => (
              <TextField {...params} label="Company" variant="outlined" />
            )}
          />
        </Col>
        <Col xs={6} md={2}>
          <TextField
            size="small"
            label="Search by Name"
            variant="outlined"
            value={filters.searchByName}
            onChange={(e) => handleFilterChange("searchByName", e.target.value)}
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
            <Col xs={12} md={6} lg={4} key={alumni.alumniId}>
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
        disableNext={currentPage >= totalPages}
        disablePrev={currentPage <= 1}
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
