import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../../css/alumniList.css";
import AlumniCard from "../Alumni/AlumniCard.jsx";
import { alumniList } from "../../utils/Links.js";


const AlumniList = () => {
	return (
		<section className="alumni-list-section light">
			<Container>
				<h1 className="alumni-heading mb-5 text-center">Our Distinguished Alumni</h1>
				<Row>
					{alumniList.map((alumni, i) => (
						<Col xs={12} md={6} lg={4} className="mb-4" key={i}>
							<AlumniCard alumni={alumni} />
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default AlumniList;
