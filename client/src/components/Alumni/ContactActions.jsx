import React from "react";
import { Button } from "react-bootstrap";

const ContactActions = ({ phone, email }) => {
  return (
    <div className="contact-actions mt-3">
      <p>
        <strong>Phone:</strong> {phone}
      </p>
      <Button variant="primary" className="me-2">
        Email Me
      </Button>
      <Button variant="success">Refer</Button>
    </div>
  );
};

export default ContactActions;
