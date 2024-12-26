import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import { useGetMyProfileQuery, useUpdateUserMutation } from '../../redux/api/authSlice';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const { isLoading, error, data } = useGetMyProfileQuery();
    const [updateProfile, { isLoading: updateLoading, error: updateError, data: updateData }] = useUpdateUserMutation();


    const [formData, setFormData] = useState({});
    useEffect(() => {
        if (data) {
            setFormData({
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                email: data.data.email,
                gender: data.data.gender,
                dateOfBirth: data.data.dateOfBirth,
                yearOfGraduation: data.data.yearOfGraduation,
                degree: data.data.degree,
                industry: data.data.industry,
                bio: data.data.bio,
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Profile Data:', formData);
        //updateProfile(formData).unwrap();
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (updateData) {
            navigate('/myprofile');
        }
    }, [updateData]);
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4 text-black">Edit Profile</h1>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                onChange={handleChange}
                                placeholder="Enter your email"
                                readOnly
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formYearOfGraduation">
                            <Form.Label>Year of Graduation</Form.Label>
                            <Form.Control
                                type="number"
                                name="yearOfGraduation"
                                value={formData.yearOfGraduation}
                                onChange={handleChange}
                                placeholder="Enter your graduation year"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formDegree">
                            <Form.Label>Degree</Form.Label>
                            <Form.Control
                                type="text"
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                                placeholder="Enter your degree"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formIndustry">
                            <Form.Label>Industry</Form.Label>
                            <Form.Control
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                placeholder="Enter your industry"
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Write a short bio"
                        rows={4}
                    />
                </Form.Group>
                <div className="text-center">
                    <Button size='md' onClick={handleSubmit} disabled={isLoading}>
                        {updateLoading ? (
                            <>
                                <Spinner animation="border" size="sm" />
                            </>
                        ) : (
                            'Update Profile'
                        )}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EditProfile;
