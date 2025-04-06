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
import java.util.List;
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
    public List<JobApplication> getJobApplicationsByUser( Long userId) {
        return jobApplicationRepository.findAllByUser_UserId(userId);
    }

    public JobApplication createJobApplication(Long jobId, User user, JobApplication jobApplication) {
        JobPost job = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new NotFoundException("Job not found"));


        if (!jobApplicationRepository.findByJob_JobIdAndUser_UserId(jobId, user.getUserId()).isEmpty()) {
            throw new IllegalStateException("User has already applied to this job.");
        }
    
        jobApplication.setUser(user);
        jobApplication.setJob(job);
        jobApplication.setApplicationDate(LocalDate.now());
        jobApplication.setApplicationStatus(ApplicationStatus.APPLIED);
    
        return jobApplicationRepository.save(jobApplication);
    }
    

    // Optional: Check if a user has already applied for a job
    public boolean hasApplied(Long jobId, Long userId) {
        return !jobApplicationRepository.findByJob_JobIdAndUser_UserId(jobId, userId).isEmpty();
    }
    
    public Optional<JobApplication> getApplicationByJobAndUser(Long jobId, Long userId) {
        List<JobApplication> applications = jobApplicationRepository.findByJob_JobIdAndUser_UserId(jobId, userId);
        return applications.isEmpty() ? Optional.empty() : Optional.of(applications.get(0));
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
