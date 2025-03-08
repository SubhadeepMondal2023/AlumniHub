import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import AlumniCard from "../Alumni/AlumniCard";
import Pagination from "../common/Pagination";
import { useFetchAlumniQuery } from "../../redux/api/alumniApiSlice";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Loader from "../../utils/Loader";
import { applyFilters, getUniqueFilterOptions } from "../../utils/customFilter";

const AlumniPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showContactActions, setShowContactActions] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    designation: "",
    location: "",
    yoe: "",
    degree: "",
    currentCompany: "",
    searchByName: "",
  });

  const { data: alumniData, isLoading, isError } = useFetchAlumniQuery(filters);

  useEffect(() => {
    if (alumniData) {
      setData(alumniData.data);
    }
  }, [alumniData]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filterKeys = ["designation", "location", "degree", "currentCompany"];
  const filterOptions = getUniqueFilterOptions(data, filterKeys);
  const filteredAlumni = applyFilters(data, filters);

  const totalPages = Math.ceil(filteredAlumni.length / 5);
  const alumniToDisplay = filteredAlumni.slice((currentPage - 1) * 5, currentPage * 5);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <h1 className="text-center my-5" style={{ color: "black" }}>
        Alumni Details
      </h1>

      <Row className="mb-4 d-flex align-items-center">
        {filterKeys.map((key) => (
          <Col xs={6} md={2} key={key}>
            <Autocomplete
              size="small"
              options={filterOptions[key]}
              getOptionLabel={(option) => option || ""}
              value={filters[key]}
              onChange={(event, value) => handleFilterChange(key, value || "")}
              renderInput={(params) => <TextField {...params} label={key.charAt(0).toUpperCase() + key.slice(1)} variant="outlined" />}
            />
          </Col>
        ))}
        <Col xs={6} md={2}>
          <TextField
            size="small"
            type="number"
            label="Years of Exp"
            variant="outlined"
            value={filters.yoe}
            onChange={(e) => handleFilterChange("yoe", e.target.value)}
            fullWidth
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        disableNext={currentPage >= totalPages}
        disablePrev={currentPage <= 1}
      />

      <div className="text-center mt-4">
        <Button variant="info" onClick={() => setShowContactActions(!showContactActions)}>
          {showContactActions ? "Hide Contact Details" : "Contact Alumni"}
        </Button>
      </div>
    </Container>
  );
};

export default AlumniPage;
