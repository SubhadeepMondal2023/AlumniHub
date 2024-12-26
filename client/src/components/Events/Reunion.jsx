import React from "react";
import { Card, Container } from "react-bootstrap";
import "../../css/reunion.css";

function Reunion() {
  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Reunion</h1>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Event Details</Card.Title>
          <Card.Text>
            <strong>Date:</strong> 25th December 2024
          </Card.Text>
          <Card.Text>
            <strong>Time:</strong> 6:00 PM to 10:00 PM
          </Card.Text>
          <Card.Text>
            <strong>Venue:</strong> Alumni Hall, University Campus
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Activities</Card.Title>
          <ul>
            <li>Welcome Speech</li>
            <li>Dinner and Networking</li>
            <li>Photo Booth</li>
            <li>Games and Entertainment</li>
            <li>Farewell Address</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Reunion;
