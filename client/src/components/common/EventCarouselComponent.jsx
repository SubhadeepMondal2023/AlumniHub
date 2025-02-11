import React, { useState } from "react";
import { Button, Col, Container, Row, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../../css/eventCarousel.css";

const carouselData = [
	{
		heading: "Stay Connected with Alumni Events",
		subHeading:
			"Join engaging alumni meetups, webinars, and reunions. Network with fellow alumni, share experiences, and relive college memories.",
	},
	{
		heading: "Career and Networking Opportunities",
		subHeading:
			"Enhance your career with alumni networking sessions, mentorship programs, and industry-specific workshops designed to help you grow.",
	},
	{
		heading: "Give Back to Your Alma Mater",
		subHeading:
			"Support your institution through fundraising events, guest lectures, and mentorship programs. Make a lasting impact on the next generation.",
	},
];


const EventCarouselComponent = () => {
	const [index, setIndex] = useState(0);

	const handleControl = (type) => {
		if (type === "prev") {
			setIndex(index === 0 ? carouselData.length - 1 : index - 1);
		} else {
			setIndex(index === carouselData.length - 1 ? 0 : index + 1);
		}
	};

	return (
		<section
			className="ezy__header35 light"
			style={{
				backgroundImage:
					"url(https://www.ctuniversity.in/images/events/all-events-bg.jpg)",
			}}
		>
			<Container>
				<Row>
					<Col xs={12}>
						<Carousel
							id="ezy__header35-controls"
							activeIndex={index}
							controls={false}
							indicators={false}
						>
							{carouselData.map((item, i) => (
								<Carousel.Item item={item} key={i}>
									<Row className="justify-content-center">
										<Col xs={12} lg={10} xl={8} className="text-center">
											<h2
												className="ezy__header35-heading mb-4"
												style={{
													textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)", 
												}}
											>
												{item.heading}
											</h2>
											<Row className="justify-content-center">
												<Col xs={12} lg={11} xl={9}>
													<p
														className="ezy__header35-sub-heading"
														style={{
															textShadow: "1.5px 1.5px 4.5px rgba(0, 0, 0, 0.6)", 
														}}
													>
														{item.subHeading}
													</p>
												</Col>
											</Row>
										</Col>
									</Row>
								</Carousel.Item>
							))}

							<div className="ezy__header35-arrows d-flex align-items-center">
								<Button
									variant=""
									className="carousel-control-prev ezy__header35-arrow-left me-4"
									onClick={() => handleControl("prev")}
								>
									<FontAwesomeIcon icon={faArrowLeft} />
								</Button>
								<Button
									variant=""
									className="carousel-control-next ezy__header35-arrow-right"
									onClick={() => handleControl("next")}
								>
									<FontAwesomeIcon icon={faArrowRight} />
								</Button>
							</div>
						</Carousel>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default EventCarouselComponent;
