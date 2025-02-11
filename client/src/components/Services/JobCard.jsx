import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";


const JobCard = ({ content }) => {
	const { link, location, title, duration, description } = content;
	return (
		<a href={link}>
			<Card className="ezy__careers7-card mt-4">
				<Card.Body className="p-3 p-md-4">
					<h5 className="fw-bold mb-3 ">{title}</h5>
					<p className="opacity-75 text-dark">{description}</p>
					<div className="d-flex mt-5">
						<div className="ezy__careers7-location d-flex align-items-center me-2 me-sm-4">
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								className="ezy__careers7-icon me-2"
							/>
							<p className="ezy__careers7-details mb-0">{location}</p>
						</div>
						<div className="ezy__careers7-time d-flex align-items-center me-2 me-sm-4">
							<FontAwesomeIcon
								icon={faClock}
								className="ezy__careers7-icon me-2"
							/>
							<p className="ezy__careers7-details mb-0">{duration}</p>
						</div>
					</div>
				</Card.Body>
			</Card>
		</a>
	);
};

export default JobCard;