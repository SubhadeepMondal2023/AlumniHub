import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../redux/api/authSlice';
import '../../css/my-profile.css';
import Loader from '../../utils/Loader';

const MyProfile = () => {
    const { isLoading, isError, data } = useGetMyProfileQuery();
    const [userData, setUserData] = useState(data);
    useEffect(() => {
        if (data) {

            setUserData(data.data);

        }
    }, [data]);
    const { firstName, lastName, email, role, gender, dateOfBirth, degree, industry, yearOfGraduation, bio, userId, profileImage } = userData;

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !userData) {
        return <div>Error loading profile data. Please try again later.</div>;
    }


    return (
        <div className="profile-container">
            <h1 className="text-center">My Profile</h1>
            <div className="profile-card">
                <div className="profile-image">
                    {profileImage ? (
                        <img src={profileImage} alt={`${firstName} ${lastName}`} />
                    ) : (
                        <div className="placeholder-image">No Image</div>
                    )}
                </div>
                <div className="profile-details">
                    <h2>
                        {firstName} {lastName}
                    </h2>
                    <p className="profile-role">{role}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Gender:</strong> {gender}</p>
                    <p><strong>Date of Birth:</strong> {new Date(dateOfBirth).toLocaleDateString()}</p>
                    <p><strong>Degree:</strong> {degree}</p>
                    <p><strong>Industry:</strong> {industry}</p>
                    <p><strong>Year of Graduation:</strong> {yearOfGraduation}</p>
                    <p><strong>Bio:</strong> {bio || 'No bio provided'}</p>
                    <p><strong>User ID:</strong> {userId}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
