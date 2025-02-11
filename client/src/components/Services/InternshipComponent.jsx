import React from 'react';
import '../../css/jobinternship.css';
import { Col, Container, Row } from "react-bootstrap";
import JobCard from './JobCard';

const contents = [
	{
		link: "#",
		location: "Remote",
		title: "Frontend Developer Intern",
		description: "Work with React.js, Redux, and Chakra UI to develop scalable frontend components.",
		duration: "3 Months",
	},
	{
		link: "#",
		location: "Hybrid - Bangalore",
		title: "Backend Developer Intern",
		description: "Build RESTful APIs using Node.js, Express, and MongoDB for efficient data handling.",
		duration: "6 Months",
	},
	{
		link: "#",
		location: "Onsite - Pune",
		title: "Machine Learning Intern",
		description: "Work on ML models, hyperparameter tuning, and deploying models using TensorFlow.",
		duration: "4 Months",
	},
];

const InternshipComponent = () => {
	return (
		<section className="ezy__careers7 light">
			<Container>
				<Row>
					<Col xs={12} md={5}>
						<h4 className="ezy__careers7-sub-heading mb-4">Kickstart Your Career</h4>
						<h1 className="ezy__careers7-heading mt-4 mb-3">Internship Opportunities</h1>
						<p className="opacity-75 mb-0 text-dark">
							Join our team and gain hands-on experience in cutting-edge technologies. Work with industry experts, build real-world applications, and grow your skills.
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

export default InternshipComponent;
