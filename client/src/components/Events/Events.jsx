import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const clientLogos = [
	{
		logo: "https://images.squarespace-cdn.com/content/v1/570d1ec427d4bdd488f35d26/6d5cdcae-31fd-4c8a-8cf4-b0d5e7fa2ef9/6-6-EP-Fest24-flyer.jpg?format=1500w",
		alt: "",
	},
	{
		logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ_t-Y8hbBLXI04l8MSNnRYircdbKdQAIj84FW-74nSFaYhEjBZZJa0HWFn3vVSxBZfl8&usqp=CAU",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-3.png",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-4.png",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-5.png",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-6.png",
		alt: "",
	},
	{
		logo: "data:image/jpeg;base64,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",
		alt: "",
	},
	{
		logo: "https://cdn.easyfrontend.com/pictures/logos/color-logo-8.png",
		alt: "",
	},
];

const Events = () => {
	return (
		<section className="ezy__clients8 light">
			<Container>
				<Row className="justify-content-center mb-4 mb-md-5">
					<Col lg={6} className="text-center">
						<h1 className="ezy__clients8-heading mb-4" style={{ color: "#000000" }}>
							 Events
						</h1>
						<h2 className="ezy__clients8-sub-heading mb-0" style={{ color: "#000000" }}> 
							Upcoming Events
						</h2>
					</Col>
				</Row>
				<Row className="justify-content-center text-center">
					{clientLogos.map((client, i) => (
						<Col sm={6} md={4} xl={3} className="mt-3 mt-sm-4" key={i}>
							<div className="ezy__clients8-item p-3 p-lg-5">
								<img
									src={client.logo}
									alt={client.alt}
									className="ezy__clients8-img img-fluid"
								/>
							</div>
						</Col>
					))}
				</Row>
        <Row className="justify-content-center mb-4 mb-md-5">
					<Col lg={6} className="text-center">
						<h2 className="ezy__clients8-sub-heading mb-0" style={{ color: "#000000" }}> 
							Past Events
						</h2>
					</Col>
				</Row>
			</Container>
      <Row className="justify-content-center text-center">
					{clientLogos.map((client, i) => (
						<Col sm={6} md={4} xl={3} className="mt-3 mt-sm-4" key={i}>
							<div className="ezy__clients8-item p-3 p-lg-5">
								<img
									src={client.logo}
									alt={client.alt}
									className="ezy__clients8-img img-fluid"
								/>
							</div>
						</Col>
					))}
				</Row>
		</section>
	);
}

export default Events;

