import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import '../../css/companyTag.css';
import { clientLogos } from "../../utils/Links.js";



const CompanyTag = () => {
	return (
		<section className="ezy__clients2 light">
			<Container>
				<Row className="justify-content-center mb-5">
					<Col lg={8} xl={7} xxl={6} className="text-center">
						<h2 className="ezy__clients2-heading mb-4">
							Our Alumni works with these companies
						</h2>
						<p className="ezy__clients2-sub-heading mb-4">
                            We are proud to partner with some of the best companies in the
                            world.
						</p>
					</Col>
				</Row>
				<div className="d-flex flex-wrap justify-content-center align-items-center text-center">
					{clientLogos.map((client, i) => (
						<img
							src={client.logo}
							alt={client.alt}
							className="ezy__clients2-img img-fluid px-5 my-4"
							key={i}
						/>
					))}
				</div>
			</Container>
		</section>
	);
};

export default CompanyTag;
