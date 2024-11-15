import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import "../../css/homeBanner.css";
import TypeAnimationComponent from "../common/TypeAnimationComponent";



const HeroHeaderShape1 = () => (
    <svg
        className="position-absolute start-0 top-0"
        width="168"
        height="213"
        viewBox="0 0 168 213"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="62" cy="106.602" r="106" fill="#DAF3F3" fillOpacity="0.14" />
    </svg>
);

const HeroHeaderShape2 = () => (
    <svg
        className="position-absolute end-0 bottom-0"
        width="385"
        height="539"
        viewBox="0 0 385 539"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M56 538.602C81.3333 435.923 192.8 230.774 436 231.604"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="2"
        />
        <path
            d="M45 492.602C70.3333 389.923 181.8 184.774 425 185.604"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="2"
        />
        <path
            d="M34 446.602C59.3333 343.923 170.8 138.774 414 139.604"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="2"
        />
        <path
            d="M23 400.602C48.3333 297.923 159.8 92.7743 403 93.6041"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="2"
        />
        <path
            d="M12 354.602C37.3333 251.923 148.8 46.7743 392 47.6041"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="2"
        />
        <path
            d="M1 308.602C26.3333 205.923 137.8 0.774349 381 1.60407"
            stroke="white"
            strokeOpacity="0.7"
            strokeWidth="2"
        />
    </svg>
);


const HomeBanner = () => {

    return (
        <section className="ezy__header12 light">
            <div>
                <HeroHeaderShape1 />
                <HeroHeaderShape2 />

                <Container className="position-relative mb-5">
                    <Row className="align-items-end">
                        <Col
                            background-url="https://thumbs.dreamstime.com/b/biggest-american-technology-companies-big-tech-277318424.jpg"
                            className="pe-xl-5 text-center text-xl-start ezy__header12-content"
                        >
                            <h2 className="ezy__header12-heading mb-3">
                                <TypeAnimationComponent />
                            </h2>
                            <p className="ezy__header12-sub-heading">
                                Platform that connects startups with business and tech operators from Big TechsStart up Incubators
                                as a Company+ 6,000 vetted expertsand Scaleups. Explore Opportunities, Share Success, and Shape the Future!
                            </p>
                            <Button
                                variant="light"

                                className="ezy__header12-btn  fs-5 mt-4 mt-md-5"
                            >
                                Join Us <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                            </Button>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        </section>
    );
};

export default HomeBanner;