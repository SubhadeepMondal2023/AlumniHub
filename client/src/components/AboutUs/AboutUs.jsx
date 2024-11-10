import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../css/aboutUs.css";

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
					<p className="mb-0">{description}</p>
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

const AboutUs = () => {
	return (
		<section className="ezy__about6 light" id="ezy__about6">
			<Container>
				<Row className="justify-content-center text-center mb-5">
					<Col xs={12} md={8}>
						<h2 className="ezy__about6-heading fw-bold mb-4">Our Story</h2>
						<p className="ezy__about6-sub-heading">
							Alumni Hub is a platform that builds bridges between alumni, creating
							opportunities to connect, learn, and grow together. Our vision is to
							empower alumni worldwide by fostering meaningful connections that 
							last a lifetime.
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

				<Row className="justify-content-center mt-5">
					<Col xs="auto">
						<Button className="faq-button" href="/faqs">
							View FAQs
						</Button>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default AboutUs;
