package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.ApplicationStatus;
import com.alumnihub.AlumniHub.model.JobApplication;
import com.alumnihub.AlumniHub.model.JobPost;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.JobPostRepository;
import com.alumnihub.AlumniHub.service.JobApplicationService;
import com.alumnihub.AlumniHub.service.UserService; // Import UserService
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobApplicationController {

    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private JobApplicationService jobApplicationService;

    @Autowired
    private UserService userService;

    private Optional<User> authenticate(String token) {
        try {
            return userService.getUserFromToken(token);
        } catch (Exception e) {
            return Optional.empty();
        }
    }
    @GetMapping("/{userId}/applications")
    public ResponseEntity<Map<String, Object>> getJobApplicationsByUser(@PathVariable Long userId) {
        Optional<User> user = userService.getUser(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        List<JobApplication> jobApplications = jobApplicationService.getJobApplicationsByUser(user.get().getUserId());
        return ResponseEntity.ok(Map.of("success", true, "data", jobApplications));
    }

    @PostMapping("/{jobId}/apply")
public ResponseEntity<Map<String, Object>> applyToJob(@RequestHeader("Authorization") String token, 
                                         @PathVariable Long jobId) {
    
    Optional<User> user = authenticate(token);
    
    if (user.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
            Map.of("success", false, "message", "User not found")
        );
    }

    JobApplication jobApplication = new JobApplication();
    
    // Set default application status and date
    jobApplication.setApplicationStatus(ApplicationStatus.APPLIED);
    jobApplication.setApplicationDate(LocalDate.now());
    
    try {
        JobApplication createdApplication = jobApplicationService.createJobApplication(jobId, user.get(), jobApplication);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(
            Map.of("success", true, "data", "Application created successfully for job: " + createdApplication.getJob().getJobId())
        );
            
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                Map.of("success", false, "message", "Job not found")
            );
            
        } catch (IllegalStateException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                Map.of("success", false, "message", "You have already applied for this job")
            );
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                Map.of("success", false, "message", "Failed to create application")    
            );
        }
    }


    @GetMapping("/{jobId}/application-status")
    public ResponseEntity<Map<String, Object>> getApplicationStatus(@RequestHeader("Authorization") String token,
            @PathVariable Long jobId) {

        Optional<User> user = authenticate(token);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        }

        JobPost jobPost = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new NotFoundException("Job not found"));

        Optional<JobApplication> applicationOptional = jobApplicationService.getApplicationByJobAndUser(jobId,
                user.get().getUserId());

        if (applicationOptional.isPresent()) {
            String status = applicationOptional.get().getApplicationStatus().name();
            return ResponseEntity.ok(Map.of("success", true, "data", status));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{jobId}/withdraw-application")
    public ResponseEntity<Map<String, Object>> withdrawApplication(@RequestHeader("Authorization") String token,
            @PathVariable Long jobId) {

        try {
            Optional<User> user = authenticate(token);

            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
            }

            JobPost jobPost = jobPostRepository.findById(jobId)
                    .orElseThrow(() -> new NotFoundException("Job not found"));

            Optional<JobApplication> applicationOptional = jobApplicationService.getApplicationByJobAndUser(jobId,
                    user.get().getUserId());

            if (applicationOptional.isPresent()) {
                // Withdraw application
                jobApplicationService.deleteJobApplication(applicationOptional.get().getApplicationId());
                return ResponseEntity.ok(Map.of("success", true, "message", "Application withdrawn successfully"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}
