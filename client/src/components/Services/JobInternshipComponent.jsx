import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import JobCard from './JobCard.jsx';
import '../../css/jobinternship.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const JobInternshipComponent = ({ title, subtitle, description, contents }) => {
    const filters = {
        jobTitles: ["Software Engineer", "UI/UX Designer", "React Developer"],
        companies: ["Google", "Microsoft", "Amazon"],
        locations: ["Remote", "Hybrid - Bangalore", "Onsite - Pune"],
    };


    return (
        <section className="ezy__careers7 light">
            <Container>
                <Row>
                    <Col xs={12} md={6} className='m-2 p-2'>
                        <h4 className="ezy__careers7-sub-heading mb-4">{subtitle}</h4>
                        <h1 className="ezy__careers7-heading mt-4 mb-3">{title}</h1>
                        <p className="opacity-75 mb-0 text-dark">{description}</p>
                    </Col>
                    <Col xs={10} md={5} className='m-2 p-2'>
                        {Object.keys(filters).map((key, idx) => {
                            return (
                                <Autocomplete
                                    className='m-2'
                                    key={idx}
                                    size="small"
                                    options={filters[key]}
                                    //getOptionLabel={(option) => option || ""}
                                    //value={filters}
                                    //onChange={(event, value) => handleFilterChange("designation", value || "")}
                                    renderInput={(params) => <TextField {...params} label={`${key.at(0).toUpperCase()+key.slice(1).toLowerCase()}`} variant="outlined" />}
                                />
                            )
                        })

                        }
                    </Col>
                </Row>
                <Row className="mt-5">
                    {contents?.map((content, i) => (
                        <Col xs={12} md={6} lg={4} key={i}>
                            <JobCard job={content} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default JobInternshipComponent;