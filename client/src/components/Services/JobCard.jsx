import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import "../../css/jobinternship.css";

const JobCard = ({ job }) => {
    const {
        jobTitle,
        company,
        location,
        jobDescription,
        applicationDeadline,
        postDate,
    } = job;

    const formattedPostDate = new Date(postDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Card className="ezy__careers7-card mt-4">
            <Card.Body className="p-3 p-md-4">
                <h5 className="fw-bold mb-2 text-dark">{jobTitle}</h5>
                <div className="d-flex align-items-center mb-2">
                    <p className="mb-0 fw-semibold text-dark">{company}</p>
                </div>
                <div className="d-flex flex-column mt-4">
                    <div className="d-flex align-items-center me-3">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="ezy__careers7-icon me-2 text-secondary" />
                        <p className="mb-0 text-dark">{location}</p>
                    </div>
                    <div className="d-flex align-items-center me-3">
                        <FontAwesomeIcon icon={faClock} className="ezy__careers7-icon me-2 text-secondary" />
                        <p className="mb-0 text-dark">Deadline: {applicationDeadline}</p>
                    </div>
                </div>
                <p className="text-muted mt-3 small text-dark"><span className="fw-semibold">Posted on:</span> {formattedPostDate}</p>  
                <button className="btn-primary ">Apply</button>

            </Card.Body>
        </Card>
    );
};

export default JobCard;
