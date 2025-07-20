import React, { useEffect, useState } from 'react';
import Input from "../../components/common/Input.jsx";
import { Button, Spinner } from 'react-bootstrap';
import '../../css/login.css';
import '../../css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import SocialLoginButton from '../common/SocialLoginButton.jsx';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useLoginUserMutation } from '../../redux/api/authSlice.js';

const Login = () => {
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [loginUser, { isLoading, error, data }] = useLoginUserMutation();
	const navigate = useNavigate();
	
	const handleLogin = () => {
		const newErrors = {};
		if(Email.length === 0) newErrors.email = "Email is required";
		if(Password.length === 0) newErrors.password = "Password is required";
		
		if(Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		
		loginUser({ email: Email, password: Password }).unwrap();
	};

	useEffect(() => {
		if (error) {
			setErrors({ submit: error?.error });
			
		} else if(data){
			navigate("/");
		}
	}, [error,data]);

	return (
		<div className="login-page">
			<ToastContainer />
			<div className="login-container">
				<h1>Login</h1>
				<div>
					<Input 
						type="text"
						placeholder="" 
						FieldName="Email"
						onChange={(e) => {
							setEmail(e.target.value);
							setErrors(prev => ({...prev, email: ''}));
						}} 
						name="Email" />
					{errors.email && <p className="error-message">{errors.email}</p>}
					
					<Input
						type="password"
						placeholder=""
						FieldName="Password"
						name="Password"
						onChange={(e) => {
							setPassword(e.target.value);
							setErrors(prev => ({...prev, password: ''}));
						}}
						Component={
							<Link to="/forgot-password" 
							onMouseOver={(e) => {
								e.target.style.textDecorationLine = 'underline';
								e.target.style.color = 'blue';
							}}
							onMouseOut={(e) => {
								e.target.style.textDecorationLine = 'none';
								e.target.style.color = 'white';
							}}
							style={{ textDecorationLine: 'none', color: 'white' }}>
								Forgot Password?
							</Link>
						}
					/>
					{errors.password && <p className="error-message">{errors.password}</p>}
					{errors.submit && <p className="error-message">{errors.submit}</p>}

					<div className="login-links"></div>
					<Button size='md' onClick={handleLogin} disabled={isLoading}>
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
					<Link to="/register" 
					onMouseOver={(e) => {
						e.target.style.textDecorationLine = 'underline';
						e.target.style.color = 'blue';
					}}
					onMouseOut={(e) => {
						e.target.style.textDecorationLine = 'none';
						e.target.style.color = 'white';
					}}
					style={{ textDecorationLine: 'none', color: 'white' }}>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
