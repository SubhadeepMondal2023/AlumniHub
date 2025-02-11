import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/pageNotFound.css";

const TopLeftSvg = () => {
	return (
		<svg
			className="position-absolute bottom-0 start-0"
			width="850"
			height="621"
			viewBox="0 0 850 621"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M557.671 394.507C642.476 480.048 827.513 471.973 850 621H-4C-4 484.826 -2.00116 182.951 -2.00116 58.5887C255.348 -80.3641 481.216 58.5887 481.216 158.287C481.216 270.839 481.216 317.388 557.671 394.507Z"
				fill="currentColor"
			/>
		</svg>
	);
};

const CharacterSvg = () => {
	return (
		<img
			className="position-absolute bottom-0 start-0 d-none d-md-block"
			src="https://cdn.easyfrontend.com/pictures/httpcodes/six-character.svg"
			alt=""
		/>
	);
};

const PageNotFound = () => {
	return (
		<section className="ezy__httpcodes6 light">
			<TopLeftSvg />

			<CharacterSvg />

			<Container>
				<Row className="justify-content-end align-items-center">
					<Col xs={12} lg={6} xl={5} className="text-center text-lg-start">
						<h2 className="ezy__httpcodes6-heading mb-4">404</h2>
						<p className="ezy__httpcodes6-sub-heading">Page not Available!</p>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default PageNotFound;

