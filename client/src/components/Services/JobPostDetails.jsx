import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplyToJobMutation, useFetchJobByIdQuery } from '../../redux/api/jobApiSlice';
import {
    Spinner,
    Alert,
    Container,
    Card,
    Row,
    Col,
    Button,
    Accordion, 
    Form,Modal,
    Badge
} from 'react-bootstrap';
import moment from 'moment';
import Loader from '../../utils/Loader.jsx';
import useToastNotification from '../../customHooks/Toast/useToastNotification.jsx';
import CustomToast from '../../customHooks/Toast/CustomToast.jsx';
function JobPostDetails() {
    const { jobId } = useParams();
    const { data: job, isLoading, isError, error } = useFetchJobByIdQuery(jobId);
    const [applyToJob, { isLoading: applyLoading, isError: applyError, error: applyErrorMessage, isSuccess }] = useApplyToJobMutation();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { toast, showToast } = useToastNotification(4000);
   
    
    useEffect(() => {
        if (isSuccess) {
            showToast('Success', 'success', 'Applied successfully');
            setShowModal(false);
            navigate('/services/job');
        }
        if (applyError) {
            showToast('Error', 'error', applyErrorMessage);
        }
    }, [isSuccess,applyErrorMessage]);

    const handleApplyToJob = () => {
        applyToJob(jobId).unwrap();
    }
   
    const jobData = job?.data;
    const lastDate = moment(jobData?.applicationDeadline).format('MMMM Do, YYYY');
    const postDate = moment(jobData?.postDate).format('MMMM Do, YYYY');
    if (isLoading) {
        return <Loader/>
    }
    return (
        <Container className="my-5">
            <CustomToast 
                show={toast.show}
                title={toast.title}
                variant={toast.variant}
                message={toast.message}
            />
            <Card className="p-4 shadow-sm">
                <Row className="mb-4">
                    <Col>
                        <h1 className="text-dark">{jobData.jobTitle}</h1>
                        <h4 className="text-secondary">{jobData.company}</h4>
                        <Badge bg="secondary" className="mt-2">{jobData.location}</Badge>
                    </Col>
                    <Col className="text-end display-flex flex-column">
                        <div className="mt-1">
                            <small>Posted by: <strong>{jobData.user.firstName + ' ' + jobData.user.lastName}</strong></small>
                        </div>
                        <div className="mt-1">
                            <small>Posted on: <strong>{postDate}</strong></small>
                        </div>

                        <div className="mt-1">
                            <small>Last Date to Apply: <strong>{lastDate}</strong></small>
                        </div>
                    </Col>
                </Row>

                <Col className="mb-4">

                    <Button variant="primary" className='m-1' onClick={() => setShowModal(true)} >Quick Apply</Button>
                    <Button variant="secondary" className='m-1'>Ask for Refferal</Button>

                </Col>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Job Description</Accordion.Header>
                        <Accordion.Body>
                            We are looking for an IT Analyst to design and implement functional and cost-efficient IT systems.

                            IT Analyst responsibilities include prioritizing user requirements, overseeing system upgrades and researching new tools. In this role, you should be highly analytical and able to understand business needs. Excellent communication skills and problem-solving abilities are essential. If you also have hands-on experience with technical projects, we’d like to meet you.

                            Your goal will be to leverage tech solutions to meet organizational needs.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Responsibilities</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>Design, implement, and manage digital learning modules.</li>
                                <li>Collaborate with educators to enhance curriculum through technology.</li>
                                <li>Monitor and optimize Learning Management Systems (LMS) performance.</li>
                                <li>Provide technical support and training to faculty and staff.</li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Preferred Skills</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>Proficiency in popular LMS platforms (e.g., Moodle, Blackboard).</li>
                                <li>Experience in digital curriculum development and instructional design.</li>
                                <li>Strong problem-solving and communication skills.</li>
                                <li>Knowledge of SCORM and xAPI standards.</li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Application Process</Accordion.Header>
                        <Accordion.Body>
                            <ol>
                                <li>Submit your resume and cover letter via the Apply button.</li>
                                <li>Shortlisted candidates will be contacted for an online interview.</li>
                                <li>Final selection will involve a practical assignment.</li>
                                <li>Offer letters will be sent to successful candidates.</li>
                            </ol>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>


                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Application For {jobData.jobTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Continue to Apply with the profile</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" disabled={applyLoading} onClick={handleApplyToJob}>
                            {applyLoading ? 'Applying...' : 'Apply'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </Container>
    );
}

export default JobPostDetails;
