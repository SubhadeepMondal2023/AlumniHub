import React, { useEffect, useState } from "react";
import { useDeleteProfileMutation, useGetMyProfileQuery } from "../../redux/api/authSlice";
import { Button, Card, Spinner, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { PencilFill, HeartFill, BriefcaseFill, TabletFill, TabletLandscape } from "react-bootstrap-icons";
import Loader from "../../utils/Loader";
import "../../css/my-profile.css";
import TableData from "./TableData.jsx";
import { useFindAppliedJobsByUserIdQuery, useWithdrawApplicationMutation } from "../../redux/api/jobApiSlice.js";
import { useFetchDonationByIdQuery, useGetMyDonationsQuery } from "../../redux/api/donationApiSlice.js";

const MyProfile = () => {
  const { isLoading, isError, data } = useGetMyProfileQuery();
  
  const [deleteProfile, { isLoading: isDeleting, isError: isDeleteError, error: deleteError, isSuccess }] = useDeleteProfileMutation();
  const [userData, setUserData] = useState(null);
  const [jobTableData, setJobTableData] = useState([]);
  const [donationTableData, setDonationTableData] = useState([]); 
  const [withdrawApplication, { isLoading: isWithdrawLoading, isError: isWithdrawError, error: withdrawError, isSuccess: isWithdrawSuccess }] = useWithdrawApplicationMutation();
  const { isLoading: isDonationLoading, isError: isDonationError, data: donationData } = useGetMyDonationsQuery();
  const { isLoading: isJobLoading, isError: isJobError, data: jobData } = useFindAppliedJobsByUserIdQuery(data.data?.userId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [TableComponent, setTableComponent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setUserData(data.data);
    }
    if(donationData) {
      const demoData = donationData.data.map((donation) => ({
       "Donation ID": donation.donationId, 
       "Donation Date": donation.donationDate,
       "Amount": donation.amount,
       "Purpose": donation.purpose,
       "Transaction ID": donation.transactionId
      }))
      setDonationTableData(demoData);
    }
    if(jobData){    
      const demoData = jobData.data.map((job) => ({
        "Job ID": job.job.jobId,
        "Job Title": job.job.jobTitle,
        "Company": job.job.company,
        "Location": job.job.location,
        "Applied Date": job.applicationDate,
        "Status": job.applicationStatus,
        "Action" : <Button size="sm" variant="primary">Withdraw</Button>
      }))
      setJobTableData(demoData);
    }
  }, [ data,jobData, donationData]);

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
      });
    }
    if (isSuccess) {
      localStorage.removeItem("token");
      window.location.reload();
      navigate("/login");
    }
  }, [isDeleteError, deleteError, isSuccess, navigate]);


  const handleDeleteProfile = () => {
    deleteProfile();
    setShowDeleteModal(false);
    navigate("/");
  };

  const handleTableData = (component) => {
    if(TableComponent === component) setShowTable(false);
    else setShowTable(true);
    setTableComponent(component);
  }

  if (isJobLoading || isLoading) {
    return <Loader />;
  }

  if (isError || !userData) {
    return <div>Error loading profile data. Please try again later.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-light p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden">
        <Card.Body className="text-center">
          <div className="relative -mt-16">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-auqamarine rounded shadow-sm"
            />
          </div>
          <h2 className="text-2xl font-bold mt-4">{`${userData.firstName} ${userData.lastName}`}</h2>
          <p className="text-muted">{userData.bio}</p>

          <div className=" mt-4 text-left">
            <p className="text-dark"><strong>Degree:</strong> {userData.degree}</p>
            <p className="text-dark"><strong>Industry:</strong> {userData.industry}</p>
            <p className="text-dark"><strong>Graduation Year:</strong> {userData.yearOfGraduation}</p>
            <p className="text-dark"><strong>Email:</strong> {userData.email}</p>
          </div>

          <div className="mt-6 d-flex flex-wrap justify-content-between">
            <Button onClick={() => navigate("/edit-profile")} variant="outline-primary" className="d-flex align-items-center gap-2">
              <PencilFill /> Edit Profile
            </Button>
            <Button variant="outline-danger" className="d-flex align-items-center gap-2" onClick={() => setShowDeleteModal(true)}>
              Delete Profile
            </Button>
            <Button variant="outline-success" className="d-flex align-items-center gap-2"
             onClick={() => handleTableData(
              <TableData
                  theads={["Donation ID", "Donation Date", "Amount", "Purpose", "Transaction ID"]}
                  data={donationTableData}
              />
            )} >
              <HeartFill /> My Donations
            </Button>
            <Button  variant="outline-info" className="d-flex align-items-center gap-2" 
            onClick={() => handleTableData(
              <TableData
                  theads={["Job ID", "Job Title", "Company", "Refference","Applied Date", "Status", "Action"]}
                  data={jobTableData}
                  withdrawloading = {isWithdrawLoading}
                  onActionClick={(item) => {
                    withdrawApplication(item["Job ID"]).unwrap();
                  }}
              />
            )}
            >
              <BriefcaseFill /> Applications
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your profile? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProfile} disabled={isDeleting}>
            {isDeleting ? <Spinner as="span" animation="border" size="sm" /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>

      {showTable && (
          TableComponent
      )}
    </div>

  );
};

export default MyProfile;