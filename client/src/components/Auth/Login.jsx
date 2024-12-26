import React, { useEffect, useState } from 'react';
import Input from "../../components/common/Input.jsx";
import { Button, Spinner } from 'react-bootstrap';
import '../../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import SocialLoginButton from '../common/SocialLoginButton.jsx';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { useLoginUserMutation } from '../../redux/api/authSlice.js';

const Login = () => {
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const [loginUser, { isLoading, error, data }] = useLoginUserMutation();
	const navigate = useNavigate();
	const handleLogin = () => {
		if(Email.length == 0 || Password.length == 0){
			toast.error('Please enter email and password', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Bounce,
				});
			return;
		}
		
		loginUser({ email: Email, password: Password }).unwrap();

	};
	useEffect(() => {
		if (error) {
			toast.error(error?.data?.message, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Bounce,
			});
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
					<Input type="text" placeholder="" onChange={(e) => setEmail(e.target.value)} name="Email" />
					<Input
						type="password"
						placeholder=""
						name="Password"
						onChange={(e) => setPassword(e.target.value)}
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
