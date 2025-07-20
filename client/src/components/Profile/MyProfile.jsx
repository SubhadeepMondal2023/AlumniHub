import React, { useEffect, useState } from "react";
import { useDeleteProfileMutation, useGetMyProfileQuery } from "../../redux/api/authSlice";
import { Button, Card, Spinner, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PencilFill, HeartFill, BriefcaseFill, CalendarEvent } from "react-bootstrap-icons";
import Loader from "../../utils/Loader";
import "../../css/my-profile.css";
import TableData from "./TableData.jsx";
import { useFindAppliedJobsByUserIdQuery, useWithdrawApplicationMutation } from "../../redux/api/jobApiSlice.js";
import { useGetMyDonationsQuery } from "../../redux/api/donationApiSlice.js";
import { useGetMyEventsQuery, useGetAttendingEventsQuery } from "../../redux/api/eventApiSlice";

const MyProfile = () => {
  const { isLoading, isError, data } = useGetMyProfileQuery();

  const [deleteProfile, { isLoading: isDeleting, isError: isDeleteError, error: deleteError, isSuccess }] = useDeleteProfileMutation();
  const [userData, setUserData] = useState(null);
  const [jobTableData, setJobTableData] = useState([]);
  const [donationTableData, setDonationTableData] = useState([]);
  const [eventTableData, setEventTableData] = useState([]);
  const [withdrawApplication, { isLoading: isWithdrawLoading }] = useWithdrawApplicationMutation();
  const { isLoading: isDonationLoading, data: donationData } = useGetMyDonationsQuery();
  const { isLoading: isJobLoading, data: jobData } = useFindAppliedJobsByUserIdQuery(data?.data?.userId);
  const { isLoading: isMyEventsLoading, data: myEventsData } = useGetMyEventsQuery();
  const { isLoading: isAttendingLoading, data: attendingEventsData } = useGetAttendingEventsQuery();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [TableComponent, setTableComponent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setUserData(data.data);
    if (donationData) {
      setDonationTableData(donationData.data.map(donation => ({
        "Donation ID": donation.donationId,
        "Donation Date": donation.donationDate,
        "Amount": donation.amount,
        "Purpose": donation.purpose,
        "Transaction ID": donation.transactionId
      })));
    }
    if (jobData) {
      setJobTableData(jobData.data.map(job => ({
        "Application ID": job.applicationId,
        "Job ID": job.job.jobId,
        "Job Title": job.job.jobTitle,
        "Company": job.job.company,
        "Location": job.job.location,
        "Applied Date": job.applicationDate,
        "Status": job.applicationStatus,
        "Action": <Button size="sm" variant="primary" onClick={() => withdrawApplication(job.applicationId).unwrap()}>
          {isWithdrawLoading ? <Spinner animation="border" size="sm" /> : "Withdraw"}
        </Button>
      })));
    }
    if (myEventsData || attendingEventsData) {
      const myEvents = myEventsData?.data || [];
      const attendingEvents = attendingEventsData?.data || [];

      // Combine both arrays and remove duplicates based on event ID
      const allEvents = [...myEvents, ...attendingEvents];
      const uniqueEvents = Array.from(new Set(allEvents.map(event => event.id)))
        .map(id => allEvents.find(event => event.id === id));

      setEventTableData(uniqueEvents.map(event => ({
        "Event ID": event.id,
        "Event Name": event.eventName,
        "Date": new Date(event.eventDateAndTime).toLocaleDateString(),
        "Location": event.venue,
        "Status": event.eventStatus,
        "Type": myEvents.some(e => e.id === event.id) ? "Created" : "Attending"
      })));
    }
  }, [data, jobData, donationData, myEventsData, attendingEventsData]);

  useEffect(() => {
    if (isDeleteError) toast.error(deleteError?.data?.message);
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
    setShowTable(TableComponent !== component);
    setTableComponent(component);
  };

  if (isJobLoading || isLoading || isMyEventsLoading || isAttendingLoading || isDonationLoading) return <Loader />;
  if (isError || !userData) return <div>Error loading profile data. Please try again later.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-light p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden">
        <Card.Body className="text-center">
          <div className="relative -mt-16">
            <img src={userData.profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-aquamarine shadow-sm" />
          </div>
          <h2 className="text-2xl font-bold mt-4">{`${userData.firstName} ${userData.lastName}`}</h2>
          <p className="text-muted">{userData.role}</p>
          <p className="text-muted">{userData.bio}</p>

          <div className="mt-4 text-left">
            <p className="text-dark"><strong>Degree:</strong> {userData.degree}</p>
            <p className="text-dark"><strong>Industry:</strong> {userData.industry}</p>
            <p className="text-dark"><strong>Graduation Year:</strong> {userData.yearOfGraduation}</p>
            <p className="text-dark"><strong>Email:</strong> {userData.email}</p>
          </div>

          <div className="mt-6 d-flex flex-wrap justify-content-between">
            <Button onClick={() => navigate("/edit-profile")} variant="outline-primary">
              <PencilFill /> Edit Profile
            </Button>
            <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
              Delete Profile
            </Button>
            <Button variant="outline-success" onClick={() => handleTableData(
              <TableData theads={["Donation ID", "Donation Date", "Amount", "Purpose", "Transaction ID"]} data={donationTableData} />
            )}>
              <HeartFill /> My Donations
            </Button>
            <Button variant="outline-info" onClick={() => handleTableData(
              <TableData theads={["Application ID", "Job ID", "Job Title", "Company", "Location", "Applied Date", "Status", "Action"]} data={jobTableData} />
            )}>
              <BriefcaseFill /> Applications
            </Button>
            <Button variant="outline-warning" onClick={() => handleTableData(
              <TableData theads={["Event ID", "Event Name", "Date", "Location", "Status", "Type"]} data={eventTableData} />
            )}>
              <CalendarEvent /> My Events
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
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteProfile} disabled={isDeleting}>
            {isDeleting ? <Spinner as="span" animation="border" size="sm" /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>

      {showTable && TableComponent}
    </div>
  );
};

export default MyProfile;
