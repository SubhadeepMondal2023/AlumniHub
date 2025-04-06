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

    @PostMapping("/{jobId}/apply")
public ResponseEntity<String> applyToJob(@RequestHeader("Authorization") String token, 
                                         @PathVariable Long jobId) {
    
    Optional<User> user = authenticate(token);
    
    if (user.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
    }

    JobApplication jobApplication = new JobApplication();
    
    // Set default application status and date
    jobApplication.setApplicationStatus(ApplicationStatus.APPLIED);
    jobApplication.setApplicationDate(LocalDate.now());
    
    try {
        JobApplication createdApplication = jobApplicationService.createJobApplication(jobId, user.get(), jobApplication);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(
            "Successfully applied to the job with Application ID: " + createdApplication.getApplicationId());
            
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            
        } catch (IllegalStateException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                "You have already applied for this job.");
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                "An error occurred while applying for the job.");
        }
    }


    @GetMapping("/{jobId}/application-status")
    public ResponseEntity<String> getApplicationStatus(@RequestHeader("Authorization") String token,
                                                       @PathVariable Long jobId) {

       Optional<User> user = authenticate(token);
       
       if (user.isEmpty()) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
       }
       
       JobPost jobPost = jobPostRepository.findById(jobId)
           .orElseThrow(() -> new NotFoundException("Job not found"));

       Optional<JobApplication> applicationOptional =
           jobApplicationService.getApplicationByJobAndUser(jobId, user.get().getUserId());

       if (applicationOptional.isPresent()) {
           String status = applicationOptional.get().getApplicationStatus().name();
           return ResponseEntity.ok(status);
       } else {
           return ResponseEntity.notFound().build();
       }
   }

   @DeleteMapping("/{jobId}/withdraw-application")
   public ResponseEntity<String> withdrawApplication(@RequestHeader("Authorization") String token,
                                                     @PathVariable Long jobId) {

       Optional<User> user = authenticate(token);

       if (user.isEmpty()) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
       }

       JobPost jobPost = jobPostRepository.findById(jobId)
           .orElseThrow(() -> new NotFoundException("Job not found"));

       Optional<JobApplication> applicationOptional =
           jobApplicationService.getApplicationByJobAndUser(jobId, user.get().getUserId());

       if (applicationOptional.isPresent()) {
           // Withdraw application
           jobApplicationService.deleteJobApplication(applicationOptional.get().getApplicationId());
           return ResponseEntity.ok("Successfully withdrew your application.");
       } else {
           return ResponseEntity.notFound().build();
       }
   }
}
