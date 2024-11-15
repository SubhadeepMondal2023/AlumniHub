import React from 'react';
import Input from "../../components/common/Input.jsx";
import { Button } from 'react-bootstrap';
import '../../css/login.css';
import { Link } from 'react-router-dom';
import SocialLoginButton from '../common/SocialLoginButton.jsx';

const Register = () => {
    return (
        <div className="page register-page">
            <div className="register-container">
                <h1>Register</h1>
                <div style={{ width: '100%' }}>
                    <Input type="text" name="Email" placeholder="Enter your email" required />
                    <Input type="password" name="Password" placeholder="Enter your password" required />
                    <Input type="password" name="ConfirmPassword" placeholder="Confirm your password" required />
                    <Button variant="primary">Register</Button>
                </div>
                <div className="or-divider">
                    <hr />
                    <span className="or-text">or</span>
                    <hr />
                </div>

                <SocialLoginButton />

                <p>
                    Already have an account?{' '}
                    <Link to="/login" style={{ textDecorationLine: 'none', color: 'white' }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
