import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { quickLinks, sociaIcons, jobInfo, contactUs, socialMedia, navigations } from "../../utils/Links.js";
import '../../css/footer.css'

import PropTypes from "prop-types";
import SocialItem from "../common/SocialItem";


const LinkMapping = ({ item }) => (
	<li>
		<a href={item.href}>{item.value}</a>
	</li>
);


const Footer = () => {
	return (
		<section className="ezy__footer2 light">
			<Container>
				<Row className="text-center text-sm-start">
					<Col lg={3}>
						<h2 className="fw-bold">AlumniHub</h2>
					</Col>
					<Col sm={6} lg={2} className="mt-4 mt-lg-0">
						<h5>Quick Links</h5>
						<Nav className="flex-column ezy__footer2-quick-links">
							{quickLinks.map((qLink, i) => (
								<LinkMapping item={qLink} key={i} />
							))}
						</Nav>
					</Col>
					<Col sm={6} lg={2} className="mt-4 mt-lg-0">
						<h5>Social Media</h5>
						<Nav className="flex-column ezy__footer2-quick-links">
							{socialMedia.map((media, i) => (
								<LinkMapping item={media} key={i} />
							))}
						</Nav>
					</Col>
					<Col sm={6} lg={2} className="mt-4 mt-lg-0">
						<h5>Job Info</h5>
						<Nav className="flex-column ezy__footer2-quick-links">
							{jobInfo.map((job, i) => (
								<LinkMapping item={job} key={i} />
							))}
						</Nav>
					</Col>
					<Col sm={6} lg={2} className="mt-4 mt-lg-0">
						<h5>Contact Us</h5>
						<Nav className="flex-column ezy__footer2-quick-links">
							{contactUs.map((contact, i) => (
								<LinkMapping item={contact} key={i} />
							))}
						</Nav>
					</Col>
				</Row>
				<hr />
				<Row className="d-flex justify-content-between align-items-center text-center text-lg-start">
					<Col lg={4}>
						<p className="mb-0 mt-1">
							Copyright &copy; {new Date().getFullYear()} All rights reserved
						</p>
					</Col>
					
					<Col
						lg={4}
						className="d-flex justify-content-center justify-content-lg-end text-center text-lg-end mt-1"
					>
						<Nav className="ezy__footer2-social">
							{sociaIcons.map((social, i) => (
								<SocialItem social={social} key={i} />
							))}
						</Nav>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default Footer;