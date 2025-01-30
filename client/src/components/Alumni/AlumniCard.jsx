import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../css/alumniList.css";

const AlumniCard = ({ alumni, showContactActions }) => {
  return (
    <Card className="alumni-card mt-4 mt-lg-0">
      <Card.Header className="position-relative p-0">
        <img
          src={alumni?.user.profileImage || "default-profile.png"} // Default image if profileImage is null
          alt={`${alumni?.user?.firstName || "User"}'s photo`}
          className="w-100"
        />
      </Card.Header>
      <Card.Body>
        {alumni && (
          <>
            <Card.Title>
              <strong>Name:</strong> {alumni.user?.firstName} {alumni.user?.lastName}
            </Card.Title>
            <Card.Title>
              <strong>Location:</strong> {alumni.location}
            </Card.Title>
            <Card.Title>
              <strong>Current Company:</strong> {alumni.currentCompany}
            </Card.Title>
            <Card.Title>
              <strong>Designation:</strong> {alumni.designation}
            </Card.Title>
            <Card.Title>
              <strong>Degree:</strong> {alumni.user?.degree}
            </Card.Title>
            <Card.Title>
              <strong>Year of Graduation:</strong> {alumni.user?.yearOfGraduation}
            </Card.Title>
            <Card.Title>
              <strong>Years of Experience:</strong> {alumni.yoe}+ years
            </Card.Title>
            <Card.Title>
              <strong>Industry:</strong> {alumni.user?.industry}
            </Card.Title>
            
          </>
        )}

        {showContactActions && (
          <div className="contact-actions mt-3">
            <p>
              <strong>Phone:</strong> {alumni.phone || "N/A"}
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
