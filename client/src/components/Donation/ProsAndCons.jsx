import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
import "../../css/donation.css";

const prosList = [
    "Direct support for ongoing alumni association initiatives.",
    "Flexible allocation to meet urgent needs.",
    "Helps fund scholarships, events, and community programs.",
    "Creates lasting impact across multiple initiatives.",
    "Strengthens alumni network and community reach."
];

const consList = [
    "Less control over specific fund allocation.",
    "May have limited visibility into exact fund usage.",
    "Not eligible for tax benefits in some regions.",
    "Doesn’t focus on specific alumni projects.",
    "General funds may take longer to show impact."
];

const ProsAndCons = () => {
    return (
        <div className="pros-cons-container">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Pros and Cons of Donation</h2>
            <Row>
                {/* Pros Section */}
                <Col xs={12} md={6}>
                    <Card className="pros-cons-card">
                        <Card.Header className="pros-cons-header">Pros</Card.Header>
                        <Card.Body>
                            <ul className="pros-cons-list">
                                {prosList.map((pro, index) => (
                                    <li key={index} className="pros-item">
                                        <FaCheckCircle className="icon-pro" /> {pro}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                
                {/* Cons Section */}
                <Col xs={12} md={6}>
                    <Card className="pros-cons-card">
                        <Card.Header className="pros-cons-header">Cons</Card.Header>
                        <Card.Body>
                            <ul className="pros-cons-list">
                                {consList.map((con, index) => (
                                    <li key={index} className="cons-item">
                                        <FaTimesCircle className="icon-con" /> {con}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProsAndCons;
