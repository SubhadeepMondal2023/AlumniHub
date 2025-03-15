import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../css/alumniList.css";
import { BsGeoAltFill, BsBuilding, BsBriefcaseFill, BsMortarboardFill, BsCalendar3, BsClockFill, BsGlobe } from "react-icons/bs";



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
            <Card.Title className="text-primary fw-bold fs-5">
              {alumni.user?.firstName} {alumni.user?.lastName}
            </Card.Title>

            <Card.Text className="mb-2">
              <BsGeoAltFill className="text-danger me-2" />
              <strong>Location:</strong> <span className="text-muted">{alumni.location}</span>
            </Card.Text>

            <Card.Text className="mb-2">
              <BsBuilding className="text-info me-2" />
              <strong>Current Company:</strong> <span className="text-muted">{alumni.currentCompany}</span>
            </Card.Text>

            <Card.Text className="mb-2">
            <BsBriefcaseFill className="text-success me-2" />
            <strong>Designation:</strong> <span className="text-muted">{alumni.designation}</span>
            </Card.Text>

            <Card.Text className="mb-2">
              <BsMortarboardFill className="text-warning me-2" />
              <strong>Degree:</strong> <span className="text-muted">{alumni.user?.degree}</span>
            </Card.Text>

            <Card.Text className="mb-2">
              <BsCalendar3 className="text-primary me-2" />
              <strong>Year of Graduation:</strong> <span className="text-muted">{alumni.user?.yearOfGraduation}</span>
            </Card.Text>

            <Card.Text className="mb-2">
              <BsClockFill className="text-secondary me-2" />
              <strong>Years of Experience:</strong> <span className="text-muted">{alumni.yoe}+ years</span>
            </Card.Text>
            <Card.Text className="mb-2">
              <BsGlobe className="text-dark me-2" />
              <strong>Industry:</strong> <span className="text-muted">{alumni.user?.industry}</span>
            </Card.Text>
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
