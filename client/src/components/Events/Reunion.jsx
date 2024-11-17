import React from "react";
import { Card } from "react-bootstrap";

function Reunion() {
  return (
    <div className="p-4 mx-auto max-w-4xl">
      {" "}
      <h1 className="mb-4">Reunion</h1>{" "}
      <Card>
        {" "}
        <Card.Body>
          {" "}
          <Card.Title>Event Details</Card.Title>{" "}
          <Card.Text>Date: 25th December 2024</Card.Text>{" "}
          <Card.Text>Time: 6:00 PM to 10:00 PM</Card.Text>{" "}
          <Card.Text>Venue: Alumni Hall, University Campus</Card.Text>{" "}
        </Card.Body>{" "}
      </Card>{" "}
      <Card className="mt-4">
        {" "}
        <Card.Body>
          {" "}
          <Card.Title>Activities</Card.Title>{" "}
          <ul>
            {" "}
            <li>Welcome Speech</li> <li>Dinner and Networking</li>{" "}
            <li>Photo Booth</li> <li>Games and Entertainment</li>{" "}
            <li>Farewell Address</li>{" "}
          </ul>{" "}
        </Card.Body>{" "}
      </Card>{" "}
    </div>
  );
}

export default Reunion ;


