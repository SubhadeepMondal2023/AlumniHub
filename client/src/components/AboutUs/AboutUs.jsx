import React, { useState } from "react";
import { Col, Container, Row, Button, Collapse } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "../../css/aboutUs.css";


// About Us stories
const stories = [
  {
    title: "Connecting Alumni Across Generations",
    description:
      "Our platform was born from a vision to create lasting connections. By bringing alumni together, we foster opportunities for mentorship, collaboration, and career growth across generations. This journey started with a shared goal to build a space where alumni can reconnect and support each other.",
    image: "https://cdn.easyfrontend.com/pictures/featured/featured_13.png",
  },
  {
    title: "Empowering Success Through Networking",
    description:
      "At Alumni Hub, we believe in the power of community. Our platform connects alumni worldwide, enabling each member to benefit from collective experiences, knowledge, and insights. Our mission is to inspire meaningful connections that help alumni achieve their personal and professional goals.",
    image: "https://cdn.easyfrontend.com/pictures/about/about9.jpg",
  },
];

// FAQ data
const faqList = [
	{
		isActive: true,
		question: "What is Alumni Hub?",
		answer:
			"Alumni Hub is a networking platform designed to connect alumni, foster mentorship, and enable career opportunities through alumni engagement.",
	},
	{
		isActive: false,
		question: "Who can join Alumni Hub?",
		answer:
			"Alumni Hub is open to graduates, students, faculty, and staff of our institution who wish to engage with the alumni network.",
	},
	{
		isActive: false,
		question: "How can I find other alumni?",
		answer:
			"Using the search and filtering tools, you can connect with alumni based on industry, location, or interests.",
	},
	{
		isActive: false,
		question: "Can I mentor current students?",
		answer:
			"Yes, Alumni Hub offers a mentorship feature allowing experienced alumni to guide students and recent graduates in their career journey.",
	},
	{
		isActive: false,
		question: "Is there a fee to join Alumni Hub?",
		answer:
			"No, Alumni Hub is free to join and offers several resources and features at no cost to alumni members.",
	},
	{
		isActive: false,
		question: "Can I share job openings on Alumni Hub?",
		answer:
			"Yes, alumni can post job openings, internships, and volunteer opportunities to benefit other members of the community.",
	},
	{
		isActive: false,
		question: "How can I update my profile information?",
		answer:
			"You can update your profile by visiting the 'Profile' section and editing your details to reflect your current information.",
	},
	{
		isActive: false,
		question: "What should I do if I forget my login credentials?",
		answer:
			"If you forget your password, use the 'Forgot Password' feature on the login page to reset it.",
	},
	
];


const StoryItem = ({ item, index }) => {
  const { title, description, image } = item;
  return (
    <>
      <Col
        xs={12}
        md={5}
        className={index % 2 === 0 ? "order-2" : "order-2 order-md-1"}
      >
        <div
          className={`d-flex flex-column justify-content-center ezy__about6-content ${
            index % 2 === 0 ? "ps-md-5" : "pe-md-5"
          }`}
        >
          <h4 className="fw-bold mb-3">{title}</h4>
          <p className="mb-0" style={{ color: "black" }}>
            {description}
          </p>
        </div>
      </Col>
      <Col
        xs={12}
        md={5}
        className={`${
          index % 2 === 0 ? "order-1" : "order-1 order-md-2"
        } mb-4 mb-md-0`}
      >
        <div>
          <img src={image} alt={title} className="img-fluid" />
        </div>
      </Col>
    </>
  );
};

StoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(faq.isActive || false);

  const toggleFaq = () => setIsOpen(!isOpen);

  return (
    <div className="ezy__faq1-item mt-4">
      <Button
        variant=""
        className={classNames(
          "p-3 p-lg-4 w-100 text-start d-flex justify-content-between align-items-center ezy__faq1-btn-collapse",
          { active: isOpen }
        )}
        type="button"
        onClick={toggleFaq}
      >
        <span>{faq.question}</span>
        <FontAwesomeIcon icon={faChevronDown} />
      </Button>
      <Collapse in={isOpen}>
        <div>
          <div className="ezy__faq1-content px-3 px-lg-4 pb-lg-4">
            <p className="opacity-50 mb-0">{faq.answer}</p>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

FaqItem.propTypes = {
  faq: PropTypes.object.isRequired,
};

const AboutUs = () => {
  return (
    <section className="ezy__about6 light" id="ezy__about6">
      <Container>
        {/* About Us Section */}
        <Row className="justify-content-center text-center mb-5">
          <Col xs={12} md={8}>
            <h2 className="ezy__about6-heading fw-bold mb-4">Our Story</h2>
            <p
              className="ezy__about6-sub-heading"
              style={{ color: "black" }}
            >
              Alumni Hub is a platform that builds bridges between alumni,
              creating opportunities to connect, learn, and grow together. Our
              vision is to empower alumni worldwide by fostering meaningful
              connections that last a lifetime.
            </p>
          </Col>
        </Row>
        {stories.map((item, i) => (
          <Row
            className="align-items-center justify-content-center mt-5"
            key={i}
          >
            <StoryItem item={item} index={i + 1} />
          </Row>
        ))}

        {/* FAQ Section */}
        <Row className="justify-content-center mb-md-4 mt-5">
          <Col lg={8} xl={7} className="text-center">
            <h2 className="ezy__faq1-heading mb-3">Frequently Asked Questions</h2>
            <p className="ezy__faq1-sub-heading mb-0">
              Find answers to common questions about Alumni Hub!
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {faqList.slice(0, Math.floor(faqList.length / 2)).map((faq, i) => (
              <FaqItem faq={faq} key={i} />
            ))}
          </Col>
          <Col md={6}>
            {faqList.slice(Math.floor(faqList.length / 2), faqList.length).map(
              (faq, i) => <FaqItem faq={faq} key={i} />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
