import React from "react";
import "../../css/Job.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Job() {
  const jobs = [
    {
      title: "Software Engineer",
      company: "Tech Solutions Inc.",
      location: "New York, NY",
      description:
        "We are looking for a skilled software engineer with experience in full-stack development.",
    },
    {
      title: "Data Scientist",
      company: "Data Analytics Co.",
      location: "San Francisco, CA",
      description:
        "Seeking a data scientist to analyze and interpret complex data sets.",
    },
    {
      title: "Backend Engineer",
      company: "InfoTech Solutions Inc.",
      location: "Andheri, Mumbai",
      description:
        "We are looking for a highly skilled Backend Engineer to join our team. The ideal candidate will be responsible for developing and maintaining the server-side logic, databases, and overall system architecture that powers our web applications.",
    },
    {
      title: "Data Analyst",
      company: "Iconic Solutions Inc.",
      location: "Sector V, Kolkata",
      description:
        "We are seeking a talented Data Analyst for collecting, analyzing, and interpreting complex data sets to help drive strategic decision-making and optimize business performance.",
    },
  ];

  return (
    <div className="job-body">
      <header className="job-header">
        <h1> Job Portal</h1>
      </header>
      <main className="container mt-4 job-main">
        <section className="job-listing">
          <h2 className="job-listing-heading text-center mb-4">Available Jobs</h2>
          <div className="row">
            {jobs.map((job, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card h-100 job-item">
                  <div className="card-body">
                    <h3 className="card-title">{job.title}</h3>
                    <h4 className="card-subtitle mb-2 text-muted">
                      Company: {job.company}
                    </h4>
                    <h4 className="card-subtitle mb-2 text-muted">
                      Location: {job.location}
                    </h4>
                    <h6 className="card-text text-dark">
                      Description: {job.description}
                    </h6>
                    <button className="btn btn-primary job-button">Apply Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Job;
