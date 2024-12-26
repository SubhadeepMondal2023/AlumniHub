import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import '../../css/verify-otp.css';
import { useRegisterUserSendOtpMutation, useRegisterUserVerifyOtpMutation } from '../../redux/api/authSlice';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [error, setError] = useState('');

    const handleChange = (element, index) => {
        const value = element.value;
        if (!/^\d$/.test(value) && value !== '') return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Automatically focus next input
        if (value !== '' && element.nextSibling) {
            element.nextSibling.focus();
        }

        if (error) setError('');
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && e.target.previousSibling) {
            e.target.previousSibling.focus(); // Focus previous input on backspace
        }
    };

    const validate = () => {
        if (otp.some((digit) => digit.trim() === '')) {
            setError('OTP is required in all boxes.');
            return false;
        }
        return true;
    };
    const [registerUserVerifyOtp, { isLoading, error: sendOtpError, data: sendOtpData }] = useRegisterUserVerifyOtpMutation();

    const navigate = useNavigate();
    useEffect(() => {
        if (sendOtpError) {
            setError(sendOtpError.data.message);
        }    
        if (sendOtpData) {
            navigate("/");
            localStorage.removeItem('email');
        }
    }, [sendOtpError, sendOtpData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const enteredOtp = otp.join('');
            registerUserVerifyOtp({
                email: localStorage.getItem('email'),
                otp: enteredOtp,
            }).unwrap();

        }
    };

    return (
        <div className="page verify-otp-page">
            <div className="verify-otp-container">
                <h1 className="text-center text-dark">Verify OTP</h1>
                <p>Please enter the 6-digit OTP sent to your email or phone.</p>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div className="otp-inputs">
                        {otp.map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={otp[index]}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="otp-box"
                                required
                            />
                        ))}
                    </div>
                    {error && <p className="error-text text-warning">{error}</p>}
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
                <p className="resend-otp">
                    Didn't receive the OTP?{' '}
                    <span
                        onClick={() => console.log('Resend OTP logic here')}
                        style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            color: 'blue',
                        }}
                    >
                        Resend OTP
                    </span>
                </p>
            </div>
        </div>
    );
};

export default VerifyOTP;
