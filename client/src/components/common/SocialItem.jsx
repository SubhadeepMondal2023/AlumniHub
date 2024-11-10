
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialItem = ({ social }) => (
	<li>
		<a
			href={social.href}
			className="border d-flex justify-content-center align-items-center rounded-circle"
		>
			<FontAwesomeIcon icon={social.icon} />
		</a>
	</li>
);

export default SocialItem