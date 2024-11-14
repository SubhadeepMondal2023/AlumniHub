import React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "../../css/banner.css";


const Banner = () => {
    return (
        <section
            className="ezy__header29 dark"
            style={{
                backgroundImage:
                    "url(https://cdn.easyfrontend.com/pictures/hero/hero_30.png)",
            }}
        >
            <Button variant="outline-light" href="/login" className="position-absolute top-0 end-0 m-3">
                Login
            </Button>

            <Container>
                <Row className="justify-content-center text-center">
                    <Col xs={12} lg={9}>
                        <h1 className="ezy__header29-heading">
                            Connect, Network, and Grow with Our Alumni Hub
                        </h1>
                        <p className="ezy__header29-sub-heading">
                            Join a thriving community of alumni! Stay updated with events, connect with fellow graduates, share career opportunities, and support each other in every step of your journey.
                        </p>
                        <Row className="justify-content-center">
                            <Col xs={12} md={8} className="d-flex justify-content-center gap-3">
                                <Button variant="secondary" href="/register" size="lg">
                                    Join Our Community
                                </Button>
                                <Button variant="outline-secondary" href="/login" size="lg">
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        </section>
    );
};

export default Banner;
