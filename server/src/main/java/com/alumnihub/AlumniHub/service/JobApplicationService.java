package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.JobApplication;
import com.alumnihub.AlumniHub.model.JobPost;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.JobApplicationRepository;
import com.alumnihub.AlumniHub.repository.JobPostRepository;
import com.alumnihub.AlumniHub.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<JobApplication> getJobApplicationById(Long applicationId) {
        return jobApplicationRepository.findById(applicationId);
    }

    public JobApplication createJobApplication(JobApplication jobApplication) {
        // Validate input
        if (jobApplication == null || jobApplication.getJob() == null || jobApplication.getJob().getJobId() == null
                || jobApplication.getUser() == null || jobApplication.getUser().getUserId() == null) {
            throw new IllegalArgumentException("Invalid job application data provided");
        }

        // Retrieve job post and user
        JobPost job = jobPostRepository.findById(jobApplication.getJob().getJobId())
                .orElseThrow(() -> new NotFoundException("Job post not found"));
        User user = userRepository.findById(jobApplication.getUser().getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Link the validated job post and user to the job application entity
        jobApplication.setJob(job);
        jobApplication.setUser(user);

        // Save and return the new job application
        return jobApplicationRepository.save(jobApplication);
    }

    public List<JobApplication> getAllJobApplications(Long jobId, Long userId) {
        List<JobApplication> results;
        if (jobId == null && userId == null) {
            results = jobApplicationRepository.findAll();
            log.info("Fetching all job applications without filters. Found {} records", results.size());
        } else if (jobId != null && userId == null) {
            results = jobApplicationRepository.findByJob_JobId(jobId);
            log.info("Fetching job applications for job with ID: {}. Found {} records", jobId, results.size());
        } else if (jobId == null && userId != null) {
            results = jobApplicationRepository.findByUser_UserId(userId);
            log.info("Fetching job applications for user with ID: {}. Found {} records", userId, results.size());
        } else {
            results = jobApplicationRepository.findByJob_JobIdAndUser_UserId(jobId, userId);
            log.info("Fetching job applications for job with ID: {} and user with ID: {}. Found {} records", jobId, userId, results.size());
        }
        return results;
    }

    public boolean deleteJobApplication(Long applicationId) {
        if (!jobApplicationRepository.existsById(applicationId)) {
            return false;
        }
        jobApplicationRepository.deleteById(applicationId);
        return true;
    }

    public Optional<JobApplication> updateJobApplicationStatus(Long applicationId, JobApplication updatedApplication) {
        return jobApplicationRepository.findById(applicationId)
                .map(application -> {
                    application.setApplicationStatus(updatedApplication.getApplicationStatus());
                    return jobApplicationRepository.save(application);
                });
    }
}