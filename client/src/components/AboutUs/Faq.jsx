import React, { useState } from "react";
import { Button, Col, Collapse, Container, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "../../css/faq.css";

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

const Faq1 = () => {
	return (
		<section className="ezy__faq1 light">
			<Container>
				<Row className="justify-content-center mb-md-4">
					<Col lg={8} xl={7} className="text-center">
						<h2 className="ezy__faq1-heading mb-3">Frequently Asked Questions</h2>
						<p className="ezy__faq1-sub-heading mb-0">
							It’s easier to reach your savings goals when you have the right
							savings account. Take a look and find the right one for you!
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
						{faqList.slice(Math.floor(faqList.length / 2), faqList.length).map((faq, i) => (
							<FaqItem faq={faq} key={i} />
						))}
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Faq1;
