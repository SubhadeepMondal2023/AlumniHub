import React from "react";
import { Card } from "react-bootstrap";
import "../../css/alumniList.css";

const AlumniCard = ({ alumni }) => {
  return (
    <Card className="alumni-card mt-4 mt-lg-0">
      <Card.Header className="position-relative p-0">
        <img src={alumni.img} alt={`${alumni.name || alumni.Designation}'s photo`} />
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
      </Card.Body>
    </Card>
  );
};

export default AlumniCard;
