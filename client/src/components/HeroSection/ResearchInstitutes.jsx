import React from 'react';
import '../../css/researchInstitutes.css';
import { Col, Container, Row, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { placeData } from '../../utils/Links.js';


const PlaceItem = ({ data }) => {
	return (
		<Card className="ezy__travel3-item border-0 rounded-0 mt-4">
			<div className="position-relative">
				<img src={data.img} alt="" className="img-fluid w-100" />
			</div>
			<Card.Body className="p-4">
				<h5 className="mb-1">{data.name}</h5>
			</Card.Body>
		</Card>
	);
};
PlaceItem.propTypes = {
	data: PropTypes.object.isRequired,
};

const ResearchInstitutes = () => {
	return (
		<section className="ezy__travel3 light">
			<Container>
				<Row className="justify-content-center mb-4 mb-md-5">
					<Col lg={6} className="text-center">
						<h2 className="ezy__travel3-heading mb-4">Our Alumni associated with these Research Institutes</h2>
						<p className=" text-dark ezy__travel3-sub-heading mb-0">
                            We are proud to partner with some of the best Educational Institutes in the world.
						</p>
					</Col>
				</Row>

				<Row>
					{placeData.map((data, i) => (
						<Col  md={6} lg={3} key={i}>
							<PlaceItem data={data} />
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};


export default ResearchInstitutes;