import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import {
	faTwitter,
	faDribbble,
	faBehance,
    faLinkedin,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import "../../css/alumni.css";

const socialLinks = [
	{ icon: faTwitter, href: "twitter.com" },
	{ icon: faLinkedin, href: "linkedin.com" },
	{ icon: faFacebook, href: "facebook.com" },
];

const infoList = [
    { label: "Institution", value: "University of Calcutta" },
    { label: "Department", value: "Information Technology" },
    { label: "Location", value: "Kolkata, India" },
    { label: "Email", value: "email@example.com" }, 
    { label: "Phone", value: "123-456-7890" },

];

const ProfileKeyInfo = ({ data }) => (
	<div>
		{infoList.map((info, i) => (
			<p className="fs-4 mb-1" key={i}>
				<span className="opacity-50 me-2 text-dark">{info.label}</span>
				<strong className="text-dark">{info.value}</strong>
			</p>
		))}
	</div>
);

ProfileKeyInfo.propTypes = {
	data: PropTypes.array.isRequired,
};

const SocialLinks = ({ links }) => (
	<Nav className="ezy__header8-social d-inline-flex mt-4">
		{links.map((link, i) => (
			<li key={i}>
				<a href={link.href}>
					<FontAwesomeIcon icon={link.icon} />
				</a>
			</li>
		))}
	</Nav>
);

SocialLinks.propTypes = {
	links: PropTypes.array.isRequired,
};

const TeamCard = ({ image, subHeading, imageName, description }) => {
	return (
		<section className="ezy__header8 light">
			<Container  className="position-relative">
				<Row className="align-items-center justify-content-between">
					<Col
						lg={5}
						xl={4}
						className="order-lg-2 mb-4 mb-lg-0 text-center text-lg-start"
					>
						<img
							src={image}
							alt=""
							className="img-fluid ezy__header8-img"
						/>
					</Col>
					<Col lg={7} className="ps-lg-4 ps-xl-5">
						<p className="ezy__header8-sub-heading mb-2 opacity-50">
                            {subHeading}
						</p>
						<h2 className="ezy__header8-heading mb-4">{imageName}</h2>
						<p className="ezy__header8-sub-heading opacity-75">
							{description}
						</p>

						<div className="mt-5 ms-lg-5 p-3 px-md-5 py-lg-4 text-dark border-start border-secondary ezy__header8-meta">
							<ProfileKeyInfo data={infoList} />
							<SocialLinks links={socialLinks} />
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default TeamCard;