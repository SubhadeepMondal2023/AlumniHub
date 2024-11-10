import React from "react";
import { Button, Card } from "react-bootstrap";
import "../../css/alumniList.css";

const AlumniCard = ({ alumni }) => {
  return (
    <Card className="alumni-card mt-4 mt-lg-0">
      <Card.Header className="position-relative p-0">
        <img  src={alumni.img} alt={`${alumni.name}'s photo`} />
      </Card.Header>
      
      <Card.Body style={{
        textAlign: "center"

      }}>
        <Card.Title>{alumni.name}</Card.Title>
        <Card.Text>{alumni.bio}</Card.Text>
        <Card.Title>{alumni.department}</Card.Title>
        
        <Card.Title>{alumni.job}</Card.Title>
          <Card.Title>{alumni.skills}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default AlumniCard;
