import React from 'react';
import Input from "../../components/common/Input.jsx";
import { Button, Spinner } from 'react-bootstrap';
import '../../css/login.css';
import { Link } from 'react-router-dom';
import SocialLoginButton from '../common/SocialLoginButton.jsx';
import { useLoginUserMutation } from '../../redux/api/authSlice.js';

const Login = () => {
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const [loginUser, { isLoading, error }] = useLoginUserMutation();
	const handleLogin = () => {
		//validate email and password and login user
		if(Email.length == 0 && Password.length == 0){
			
		}
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<h1>Login</h1>
				<div>
					<Input type="text" placeholder="" name="Email" />
					<Input
						type="password"
						placeholder=""
						name="Password"
						Component={
							<Link to="/forgot-password" style={{ textDecorationLine: 'none', color: 'white' }}>
								Forgot Password?
							</Link>
						}
					/>

					<div className="login-links"></div>
					<Button onClick={handleLogin} disabled={isLoading}>
						{isLoading ? (
							<>
								<Spinner animation="border" size="sm" />
							</>
						) : (
							'Login'
						)}
					</Button>
				</div>

				<div className="or-divider">
					<hr />
					<span className="or-text">or</span>
					<hr />
				</div>

				<SocialLoginButton />
				<p>
					Don't have an account?{' '}
					<Link to="/register" style={{ textDecorationLine: 'none' }}>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
