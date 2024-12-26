package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.ApplicationStatus;
import com.alumnihub.AlumniHub.model.JobApplication;
import com.alumnihub.AlumniHub.model.JobPost;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.JobApplicationRepository;
import com.alumnihub.AlumniHub.repository.JobPostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobPostRepository jobPostRepository;

    public Optional<JobApplication> getJobApplicationById(Long applicationId) {
        return jobApplicationRepository.findById(applicationId);
    }

    public JobApplication createJobApplication(Long jobId, User user, JobApplication jobApplication) {
        // Check if job exists
        JobPost job = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new NotFoundException("Job not found"));

        // Set user and job to the job application
        jobApplication.setUser(user);
        jobApplication.setJob(job);
        jobApplication.setApplicationDate(LocalDate.now());
        jobApplication.setApplicationStatus(ApplicationStatus.APPLIED); // Set default status

        // Save the application
        return jobApplicationRepository.save(jobApplication);
    }

    // Optional: Check if a user has already applied for a job
    public boolean hasApplied(Long jobId, Long userId) {
        return jobApplicationRepository.findByJob_JobIdAndUser_UserId(jobId, userId).isPresent();
    }

    public Optional<JobApplication> getApplicationByJobAndUser(Long jobId, Long userId) {
        return jobApplicationRepository.findByJob_JobIdAndUser_UserId(jobId, userId);
    }

    public void deleteJobApplication(Long applicationId) {
        jobApplicationRepository.deleteById(applicationId);
    }

    public Optional<JobApplication> updateJobApplicationStatus(Long applicationId, JobApplication updatedApplication) {
        return jobApplicationRepository.findById(applicationId)
                .map(application -> {
                    application.setApplicationStatus(updatedApplication.getApplicationStatus());
                    return jobApplicationRepository.save(application);
                });
    }
}
