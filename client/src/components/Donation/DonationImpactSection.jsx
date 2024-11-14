import React, { useState } from "react";
import { Button, Col, Collapse, Container, Row } from "react-bootstrap";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import '../../css/donationImpact.css';
// Sample data for the impact of alumni donations
const impactList = [
	{
		isActive: true,
		title: "Scholarships and Financial Aid",
		description:
			"Alumni donations help fund scholarships, allowing students from diverse backgrounds to access quality education. Last year, over 200 scholarships were awarded due to alumni support.",
	},
	{
		isActive: false,
		title: "Research and Innovation",
		description:
			"Donations fuel research projects that drive innovation in fields such as biotechnology and renewable energy, advancing the university’s reputation in research excellence.",
	},
	{
		isActive: false,
		title: "Campus Infrastructure",
		description:
			"Alumni contributions have enabled the construction of libraries, laboratories, and study spaces, improving student experience and attracting top-tier faculty.",
	},
	{
		isActive: false,
		title: "Student Success Programs",
		description:
			"Funding from alumni supports career services, mental health resources, and leadership programs that prepare students for successful careers.",
	},
	{
		isActive: false,
		title: "Community and Global Outreach",
		description:
			"Alumni donations allow the university to engage in outreach programs that serve local and global communities, including international exchange programs and sustainable projects.",
	},
];

// Component for individual impact items
const ImpactItem = ({ impact }) => {
	const [isOpen, setIsOpen] = useState(impact.isActive || false);

	const toggleImpact = () => setIsOpen(!isOpen);

	return (
		<div className="donation-impact-item">
			<Button
				variant=""
				className={classNames(
					"px-0 py-3 w-100 text-start d-flex justify-content-between align-items-center donation-impact-btn-collapse border-0",
					{ active: isOpen }
				)}
				type="button"
				onClick={toggleImpact}
			>
				<span>{impact.title}</span>
				<FontAwesomeIcon icon={faChevronDown} />
			</Button>
			<Collapse in={isOpen}>
				<div className="border-start border-3 border-info mb-3">
					<div className="donation-impact-content px-4">
						<p className="opacity-75 mb-0">{impact.description}</p>
					</div>
				</div>
			</Collapse>
		</div>
	);
};

// Main DonationImpactSection component
const DonationImpactSection = () => {
	return (
		<section className="donation-impact-section">
			<Container>
				<Row className="justify-content-center">
					<Col md={15}>
						<div className="donation-impact-list p-4">
							{impactList.map((impact, i) => (
								<ImpactItem impact={impact} key={i} />
							))}

							<Button variant="outline-info" className="my-4 px-4">
								Learn More About Alumni Contributions
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default DonationImpactSection;
