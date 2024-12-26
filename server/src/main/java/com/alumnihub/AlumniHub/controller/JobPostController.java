package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.JobPost;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.JobPostService;
import com.alumnihub.AlumniHub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

    @Autowired
    private UserService userService;

    private Optional<User> authenticate(String token) {
        try {
            return userService.getUserFromToken(token);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchJobPosts(
            @RequestHeader("Authorization") String token,
            @RequestParam(required = false) String jobTitle,
            @RequestParam(required = false) String company,
            @RequestParam(required = false) String location) {
        Optional<User> user = authenticate(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        List<JobPost> jobPosts = jobPostService.searchJobPosts(jobTitle, company, location);
        if (jobPosts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "No job posts found matching the specified criteria"));
        }

        return ResponseEntity.ok(Map.of("success", true, "data", jobPosts));
    }

    @GetMapping("/search/keyword")
    public ResponseEntity<Map<String, Object>> searchByKeyword(
            @RequestHeader("Authorization") String token,
            @RequestParam String keyword) {
        Optional<User> user = authenticate(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        List<JobPost> jobPosts = jobPostService.searchByKeyword(keyword);
        if (jobPosts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "No job posts found matching the keyword: " + keyword));
        }

        return ResponseEntity.ok(Map.of("success", true, "data", jobPosts));
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<Map<String, Object>> getJobPostById(
            @RequestHeader("Authorization") String token,
            @PathVariable Long jobId) {
        Optional<User> user = authenticate(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        Optional<JobPost> job = jobPostService.getJobPostById(jobId);
        if (job.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "Job post not found with ID: " + jobId));
        }

        return ResponseEntity.ok(Map.of("success", true, "data", job.get()));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createJobPost(
            @RequestHeader("Authorization") String token,
            @RequestBody JobPost jobPost) {
        Optional<User> user = authenticate(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        try {
            jobPost.setUser(user.get());
            JobPost newJobPost = jobPostService.createJobPost(jobPost);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("success", true, "data", newJobPost, "message", "Job post created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<Map<String, Object>> updateJobPost(
            @RequestHeader("Authorization") String token,
            @PathVariable Long jobId,
            @RequestBody JobPost jobPostDetails) {
        Optional<User> user = authenticate(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        try {
            Optional<JobPost> updatedJob = jobPostService.updateJobPost(jobId, jobPostDetails);
            if (updatedJob.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("success", false, "message", "Job post not found with ID: " + jobId));
            }

            return ResponseEntity.ok(Map.of("success", true, "data", updatedJob.get(), "message", "Job post updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Map<String, Object>> deleteJobPost(
            @RequestHeader("Authorization") String token,
            @PathVariable Long jobId) {
        Optional<User> user = authenticate(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        try {
            boolean isDeleted = jobPostService.deleteJobPost(jobId);
            if (!isDeleted) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("success", false, "message", "Job post not found with ID: " + jobId));
            }

            return ResponseEntity.ok(Map.of("success", true, "message", "Job post deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}
