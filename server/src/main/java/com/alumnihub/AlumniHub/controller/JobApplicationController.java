package com.alumnihub.AlumniHub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.ApplicationStatus;
import com.alumnihub.AlumniHub.model.JobApplication;
import com.alumnihub.AlumniHub.model.JobPost;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.JobPostRepository;
import com.alumnihub.AlumniHub.service.JobApplicationService;

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/jobs")
public class JobApplicationController {
    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    private JobApplicationService jobApplicationService;

    @PostMapping("/{jobId}/apply")
    public ResponseEntity<String> applyToJob(@PathVariable Long jobId) {
        // Create a new JobApplication instance
        JobApplication jobApplication = new JobApplication();
        
        // Set default application status
        jobApplication.setApplicationStatus(ApplicationStatus.APPLIED); // Assuming APPLIED is a valid enum value
        jobApplication.setApplicationDate(LocalDate.now()); // Set current date

        try {
            // Create a new job application using the service method
            JobApplication createdApplication = jobApplicationService.createJobApplication(jobId, jobApplication);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body("Successfully applied to the job with Application ID: " + createdApplication.getApplicationId());
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while applying for the job.");
        }
    }

    @GetMapping("/{jobId}/application-status")
    public ResponseEntity<String> getApplicationStatus(@PathVariable Long jobId) {
        // Retrieve JobPost by jobId
        JobPost jobPost = jobPostRepository.findById(jobId)
            .orElseThrow(() -> new NotFoundException("Job not found"));

        // Get the user associated with this JobPost
        User user = jobPost.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user associated with this job.");
        }

        // Retrieve the application for this job and user
        Optional<JobApplication> applicationOptional = jobApplicationService.getApplicationByJobAndUser(jobId, user.getUserId());

        // Check if application exists and return its status
        if (applicationOptional.isPresent()) {
            JobApplication application = applicationOptional.get();
            String status = application.getApplicationStatus().name(); // Assuming ApplicationStatus is an enum
            return ResponseEntity.ok(status);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{jobId}/withdraw-application")
    public ResponseEntity<String> withdrawApplication(@PathVariable Long jobId) {
        // Retrieve JobPost by jobId
        JobPost jobPost = jobPostRepository.findById(jobId)
            .orElseThrow(() -> new NotFoundException("Job not found"));

        // Get the user associated with this JobPost
        User user = jobPost.getUser();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user associated with this job.");
        }

        // Retrieve the application for this job and user
        Optional<JobApplication> applicationOptional = jobApplicationService.getApplicationByJobAndUser(jobId, user.getUserId());
        
        if (applicationOptional.isPresent()) {
            // Withdraw application
            jobApplicationService.deleteJobApplication(applicationOptional.get().getApplicationId());
            return ResponseEntity.ok("Successfully withdrew your application.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
