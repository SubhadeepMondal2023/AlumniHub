import React, { useState } from "react";
import { Button, Col, Collapse, Container, Nav, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../../css/donationSubscription.css";
import { pricingList } from "../../utils/Links";



const pricingTab = {
    monthly: "monthly",
    yearly: "yearly",
};

const PricingItem = ({ pricing }) => (
    <div
        className={classNames("ezy__pricing1-item p-3 p-lg-5", {
            active: pricing.isActive,
        })}
    >
        <h3 className="fw-bold mb-2 ezy__pricing1-title">{pricing.planTitle}</h3>
        <div className="ezy__pricing1-price mb-3">
            <span className="fs-3 fw-bold">{pricing.price}</span>
            <span className="ms-2 opacity-50">{pricing.timeline}</span>
        </div>
        <p className="opacity-50 mb-4 ezy__pricing1-note">{pricing.description}</p>
        <Nav className="flex-column ezy-pricing1-features">
            {pricing.features.map((feature, i) => (
                <li
                    className={classNames({
                        "mb-3": pricing.features.length - 1 > i,
                    })}
                    key={i}
                >
                    <FontAwesomeIcon icon={faCheck} className="text-primary me-2" />
                    <span className="opacity-50">{feature.label}</span>
                </li>
            ))}
        </Nav>

        <Button
            variant={pricing.isActive ? "primary" : "outline"}
            className="w-100 mt-4 ezy__pricing1-btn"
        >
            Choose plan
        </Button>
    </div>
);


const DonationSubscription = () => {
    const [activeTimeline, setActiveTimeline] = useState(pricingTab.monthly);

    const switchActiveTimeline = (tab) => setActiveTimeline(tab);

    return (
        <section className="ezy__pricing1 light">
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col lg={6} xl={5} className="text-center">
                        <h2 className="ezy__pricing1-heading mb-3">
                            Support Our University
                        </h2>
                        <p className="ezy__pricing1-sub-heading mb-0">
                            Choose a plan to help us foster education and research excellence.
                        </p>
                    </Col>
                </Row>
                <div className="text-center mb-4">
                    <Button
                        variant={
                            pricingTab.monthly === activeTimeline ? "primary" : "outline"
                        }
                        className="border-0 ezy__pricing1-btn me-1"
                        onClick={() => switchActiveTimeline(pricingTab.monthly)}
                    >
                        MONTHLY
                    </Button>
                    <Button
                        variant={
                            pricingTab.yearly === activeTimeline ? "primary" : "outline"
                        }
                        className="border-0 ezy__pricing1-btn"
                        onClick={() => switchActiveTimeline(pricingTab.yearly)}
                    >
                        YEARLY
                    </Button>
                </div>
                <Collapse in={activeTimeline === pricingTab.monthly}>
                    <Row>
                        {pricingList.monthlyPricings.map((pricing, i) => (
                            <Col md={6} xl={3} className="mt-4" key={i}>
                                <PricingItem pricing={pricing} />
                            </Col>
                        ))}
                    </Row>
                </Collapse>
                <Collapse in={activeTimeline === pricingTab.yearly}>
                    <Row>
                        {pricingList.yearlyPricings.map((pricing, i) => (
                            <Col md={6} xl={3} className="mt-4" key={i}>
                                <PricingItem pricing={pricing} />
                            </Col>
                        ))}
                    </Row>
                </Collapse>
            </Container>

        </section>
    );
};

export default DonationSubscription;