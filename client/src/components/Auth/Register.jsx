import React, { useEffect, useState } from 'react';
import Input from "../../components/common/Input.jsx";
import { Button, Spinner } from 'react-bootstrap';
import '../../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import SocialLoginButton from '../common/SocialLoginButton.jsx';
import { useRegisterUserSendOtpMutation } from '../../redux/api/authSlice.js';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        yearOfGraduation: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }
        if (!formData.yearOfGraduation.trim()) {
            newErrors.yearOfGraduation = "Year of graduation is required.";
        } else if (!/^\d{4}$/.test(formData.yearOfGraduation)) {
            newErrors.yearOfGraduation = "Enter a valid 4-digit year.";
        }
        if (!formData.password.trim()) newErrors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const [registerUserSendOtp, { isLoading, error, data }] =  useRegisterUserSendOtpMutation();
    useEffect(() => {
        if (error) {
           console.log(error);
           
        }
        if(data) {
            console.log(data);
            
            navigate('/verify-otp');
            localStorage.setItem('email', formData.email);
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            registerUserSendOtp(formData).unwrap();
        } 
    };

    return (
        <div className="page register-page">
            <div className="register-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Input
                        type="text"
                        name="firstName"
                        placeholder=""
                        FieldName="First Name"
                        onChange={handleChange}
                        required
                    />
                    {errors.firstName && <p className="error-text text-warning p-0">{errors.firstName}</p>}

                    <Input
                        type="text"
                        name="lastName"
                        placeholder=""
                        FieldName="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    {errors.lastName && <p className="error-text text-warning p-0">{errors.lastName}</p>}

                    <Input
                        type="text"
                        name="email"
                        placeholder=""
                        FieldName="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error-text text-warning p-0">{errors.email}</p>}

                    <Input
                        type="number"
                        name="yearOfGraduation"
                        placeholder=""
                        FieldName="Year Of Graduation"
                        value={formData.yearOfGraduation}
                        onChange={handleChange}
                        required
                    />
                    {errors.yearOfGraduation && <p className="error-text text-warning p-0">{errors.yearOfGraduation}</p>}

                    <Input
                        type="password"
                        name="password"
                        placeholder=""
                        FieldName="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error-text text-warning p-0">{errors.password}</p>}

                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder=""
                        FieldName="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <p className="error-text text-warning p-0">{errors.confirmPassword}</p>}

                    <Button disabled={isLoading} variant="primary" type="submit">
                        {isLoading ? (
							<>
								<Spinner animation="border" size="sm" />
							</>
						) : (
							'Register'
						)}
                    </Button>
                </form>

                <div className="or-divider">
                    <hr />
                    <span className="or-text">or</span>
                    <hr />
                </div>

                <SocialLoginButton />

                <p>
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        onMouseOver={(e) => {
                            e.target.style.textDecorationLine = 'underline';
                            e.target.style.color = 'blue';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.textDecorationLine = 'none';
                            e.target.style.color = 'white';
                        }}
                        style={{ textDecorationLine: 'none', color: 'white' }}
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
