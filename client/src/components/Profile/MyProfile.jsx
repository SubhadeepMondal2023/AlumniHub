import React, { useEffect, useState } from 'react';
import { useDeleteProfileMutation, useGetMyProfileQuery } from '../../redux/api/authSlice';
import '../../css/my-profile.css';
import Loader from '../../utils/Loader';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';

const MyProfile = () => {
    const { isLoading, isError, data } = useGetMyProfileQuery();
    const [deleteProfile, { isLoading: isDeleting, isError: isDeleteError, error: deleteError,isSuccess }] = useDeleteProfileMutation();
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
    useEffect(() => {
        if (isDeleteError) {
            toast.error(deleteError?.data?.message, {
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
        }
        if(isSuccess){
            localStorage.removeItem('token');
            window.location.reload();
            navigate('/login');
        }

    }, [isDeleteError, deleteError, isSuccess]);
    const navigate = useNavigate();
    return (
        <div className="profile-container">
            <ToastContainer />
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
            <div className=' d-flex justify-content-center gap-5'>
                <Button variant="primary" className="edit-profile-button mt-3" onClick={() => navigate('/edit-profile')}>Edit/Complete Profile</Button>
                <Button variant="danger" className="delete-profile-button mt-3" onClick={()=>{
                    if(window.confirm('Are you sure you want to delete your profile?')){
                        deleteProfile()
                    }
                }}>
                    {isDeleting ? (
                            <>
                                <Spinner animation="border" size="sm" />
                            </>
                        ) : (
                            'Delete Profile'
                        )}
                </Button>
            </div>

        </div>
    );
};

export default MyProfile;
