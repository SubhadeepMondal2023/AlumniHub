import React from 'react';
import '../../css/jobinternship.css';
import { Col, Container, Row } from "react-bootstrap";
import JobCard from './JobCard';

const contents = [
	{
		link: "#",
		location: "Remote",
		title: "Software Engineer",
		description: "Develop and optimize scalable web applications using modern tech stacks.",
		duration: "Full Time",
	},
	{
		link: "#",
		location: "Hybrid - Bangalore",
		title: "UI/UX Designer",
		description: "Design intuitive and user-friendly interfaces with Figma and Adobe XD.",
		duration: "Full Time",
	},
	{
		link: "#",
		location: "Onsite - Pune",
		title: "React Developer",
		description: "Build high-performance frontend applications using React.js and Redux.",
		duration: "Full Time",
	},
];

const JobComponent = () => {
	return (
		<section className="ezy__careers7 light">
			<Container>
				<Row>
					<Col xs={12} md={5}>
						<h4 className="ezy__careers7-sub-heading mb-4">Grow with Us</h4>
						<h1 className="ezy__careers7-heading mt-4 mb-3">Current Job Openings</h1>
						<p className="opacity-75 mb-0 text-dark">
							We are looking for talented professionals to join our team. Explore exciting roles and shape the future with us.
						</p>
					</Col>
					<Row className="mt-5">
						{contents.map((content, i) => (
							<Col xs={12} md={6} lg={4} key={i}>
								<JobCard content={content} />
							</Col>
						))}
					</Row>
				</Row>
			</Container>
		</section>
	);
};

export default JobComponent;
