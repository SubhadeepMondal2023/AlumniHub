import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../css/alumniList.css";

const AlumniCard = ({ alumni, showContactActions }) => {
  return (
    <Card className="alumni-card mt-4 mt-lg-0">
      <Card.Header className="position-relative p-0">
        <img
          src={alumni.img}
          alt={`${alumni.name || alumni.Designation}'s photo`}
          className="w-100"
        />
      </Card.Header>
      <Card.Body>
        {alumni &&
          Object.keys(alumni)
            .filter((key) => key !== "img" && key !== "AlumniID")
            .map((key, index) => (
              <Card.Title key={index}>
                <strong>{key}:</strong> {alumni[key]}
              </Card.Title>
            ))}

        {showContactActions && (
          <div className="contact-actions mt-3">
            <p>
              <strong>Phone:</strong> {alumni.Phone || "N/A"}
            </p>
            <Button variant="primary" className="me-2">
              Email Me
            </Button>
            <Button variant="success">Refer</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default AlumniCard;
