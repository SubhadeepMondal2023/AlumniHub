import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const SocialLoginButton = () => (
	<Fragment>
		<Button
			variant="primary"
			className="ezy__signin1-btn w-100 d-flex align-items-center mb-3"
		>
			<span className="text-white fs-4 lh-1">
				<FontAwesomeIcon icon={faFacebook} />
			</span>
			<span className="w-100 text-center text-white">
				Continue with Facebook
			</span>
		</Button>
		<Button
			variant="danger"
			className="ezy__signin1-btn w-100 d-flex align-items-center"
		>
			<span className="text-white fs-4 lh-1">
				<FontAwesomeIcon icon={faGoogle} />
			</span>
			<span className="w-100 text-center text-white">Continue with Google</span>
		</Button>
	</Fragment>
);

export default SocialLoginButton;