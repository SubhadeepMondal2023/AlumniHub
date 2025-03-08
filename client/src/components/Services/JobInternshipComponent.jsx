import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import JobCard from "./JobCard.jsx";
import "../../css/jobinternship.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { applyFilters, getUniqueFilterOptions } from "../../utils/customFilter.js";

const JobInternshipComponent = ({ title, subtitle, description, contents }) => {
  const filterKeys = ["jobTitle", "company", "location"];
  const [filters, setFilters] = useState({ jobTitle: "", company: "", location: "" });
  const [filteredPosts, setFilteredPosts] = useState(contents);

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    setFilteredPosts(applyFilters(contents, updatedFilters));
  };

  const filterOptions = getUniqueFilterOptions(contents, filterKeys);

  return (
    <section className="ezy__careers7 light">
      <Container>
        <Row>
          <Col xs={12} md={6} className="m-2 p-2">
            <h4 className="ezy__careers7-sub-heading mb-4">{subtitle}</h4>
            <h1 className="ezy__careers7-heading mt-4 mb-3">{title}</h1>
            <p className="opacity-75 mb-0 text-dark">{description}</p>
          </Col>
          <Col xs={10} md={5} className="m-2 p-2">
            {filterKeys.map((key, idx) => (
              <Autocomplete
                className="m-2"
                key={idx}
                size="small"
                options={filterOptions[key]}
                getOptionLabel={(option) => option || ""}
                value={filters[key]}
                onChange={(event, value) => handleFilterChange(key, value || "")}
                renderInput={(params) => <TextField {...params} label={key.charAt(0).toUpperCase() + key.slice(1)} variant="outlined" />}
              />
            ))}
          </Col>
        </Row>
        <Row className="mt-5">
          {filteredPosts.map((content, i) => (
            <Col xs={12} md={6} lg={4} id={i} key={i}>
              <JobCard job={content} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default JobInternshipComponent;
