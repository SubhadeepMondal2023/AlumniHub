package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.exception.JobPostNotFoundException;
import com.alumnihub.AlumniHub.exception.UnauthorizedException;
import com.alumnihub.AlumniHub.model.JobPost;
import com.alumnihub.AlumniHub.service.JobPostService;
import com.alumnihub.AlumniHub.util.JobPostSpecifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/jobs")
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

   @GetMapping
    public ResponseEntity<List<JobPost>> getAllJobPosts(
        @RequestParam(required = false) String jobTitle,
        @RequestParam(required = false) String company,
        @RequestParam(required = false) String location) {

        Specification<JobPost> specification = JobPostSpecifications.buildSearchSpecification(jobTitle, company, location);
        List<JobPost> jobPosts = jobPostService.getAllJobPosts(specification);

        if (jobPosts.isEmpty()) {
            String message = "No job posts found matching the specified criteria";
            throw new JobPostNotFoundException(message);
        }

        return ResponseEntity.ok(jobPosts);
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<?> getJobPostById(@PathVariable Long jobId) {
        Optional<JobPost> job = jobPostService.getJobPostById(jobId);
        if (job.isEmpty()) {
            throw new JobPostNotFoundException("Job post not found with ID: " + jobId);
        }
        
        Map<String, Object> successResponse = Map.of(
            "success", true,
            "data", job.get()
        );
        return ResponseEntity.ok(successResponse);
    }

    @PostMapping
    public ResponseEntity<?> createJobPost(@RequestBody JobPost jobPost) {
        try {
            // Verify if the user is an alumni (handled by isAuthorized('alumni') in service)
            JobPost newJobPost = jobPostService.createJobPost(jobPost);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "data", newJobPost,
                "message", "Job post created successfully"
            ));
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                "success", false,
                "message", "Only alumni can create job posts"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An unexpected error occurred: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<?> updateJobPost(@PathVariable Long jobId, @RequestBody JobPost jobPostDetails) {
        try {
            Optional<JobPost> updatedJob = jobPostService.updateJobPost(jobId, jobPostDetails);
            if (updatedJob.isEmpty()) {
                throw new JobPostNotFoundException("Job post not found with ID: " + jobId);
            }
            
            Map<String, Object> successResponse = Map.of(
                "success", true,
                "data", updatedJob.get(),
                "message", "Job post updated successfully"
            );
            return ResponseEntity.ok(successResponse);
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                "success", false,
                "message", "Only the alumni who created this post can update it"
            ));
        } catch (JobPostNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An unexpected error occurred: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<?> deleteJobPost(@PathVariable Long jobId) {
        try {
            boolean isDeleted = jobPostService.deleteJobPost(jobId);
            if (!isDeleted) {
                throw new JobPostNotFoundException("Job post not found with ID: " + jobId);
            }
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Job post deleted successfully"
            ));
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                "success", false,
                "message", "Only the alumni who created this post can delete it"
            ));
        } catch (JobPostNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An unexpected error occurred: " + e.getMessage()
            ));
        }
    }
}
