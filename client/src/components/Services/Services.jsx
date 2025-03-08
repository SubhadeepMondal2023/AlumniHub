import React, { useEffect } from 'react';
import '../../css/jobinternship.css';
import JobInternshipComponent from './JobInternshipComponent.jsx';
import { useFetchAllJobsQuery, useFetchJobByIdQuery } from '../../redux/api/jobApiSlice.js';
import Loader from '../../utils/Loader.jsx';

const InternshipComponent = () => {
    const contents = [
        {
            link: "#",
            location: "Remote",
            title: "Frontend Developer Intern",
            description: "Work with React.js, Redux, and Chakra UI to develop scalable frontend components.",
            duration: "3 Months",
        },{
            link: "#",
            location: "Hybrid - Bangalore",
            title: "Backend Developer Intern",
            description: "Build RESTful APIs using Node.js, Express, and MongoDB for efficient data handling.",
            duration: "6 Months",
        },{
            link: "#",
            location: "Onsite - Pune",
            title: "Machine Learning Intern",
            description: "Work on ML models, hyperparameter tuning, and deploying models using TensorFlow.",
            duration: "4 Months",
        },
    ];
    return (
        <JobInternshipComponent
            title="Internship Opportunities"
            subtitle="Kickstart Your Career"
            description="Join our team and gain hands-on experience..."
            contents={contents}
        />
    );
};

const JobComponent = () => {

    const { data: allJobs, isLoading: alljobsLoading, isError, error} = useFetchAllJobsQuery();
    if(alljobsLoading) return <Loader/>;
    return (
        <JobInternshipComponent
            title="Current Job Openings"
            subtitle="Grow with Us"
            description="We are looking for talented professionals..."
            contents={allJobs.data}
        />
    );
};


export { InternshipComponent, JobComponent }; 