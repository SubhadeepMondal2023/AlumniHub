package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.JobPost;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.JobPostRepository;
import com.alumnihub.AlumniHub.repository.UserRepository;
import com.alumnihub.AlumniHub.util.JobPostSpecifications;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class JobPostService {

    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<JobPost> getJobPostById(Long jobId) {
        return jobPostRepository.findById(jobId);
    }

    public JobPost createJobPost(JobPost jobPost) {
        // Validate input
        if (jobPost == null || jobPost.getPostedBy() == null || jobPost.getPostedBy().getUserId() == null) {
            throw new IllegalArgumentException("Invalid job post or user data provided");
        }

        // Retrieve user
        User postedBy = userRepository.findById(jobPost.getPostedBy().getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Link the validated user to the job post entity
        jobPost.setPostedBy(postedBy);

        // Save and return the new job post
        return jobPostRepository.save(jobPost);
    }

    public List<JobPost> getAllJobPosts(String jobTitle, String company, String location) {
        List<JobPost> results;
        if (jobTitle == null && company == null && location == null) {
            results = jobPostRepository.findAll();
            log.info("Fetching all job posts without filters. Found {} records", results.size());
        } else {
            results = jobPostRepository.findAll(JobPostSpecifications.buildSearchSpecification(jobTitle, company, location));
            log.info("Fetching job posts with filters - jobTitle: {}, company: {}, location: {}. Found {} records",
                jobTitle, company, location, results.size());
        }
        return results;
    }

    public boolean deleteJobPost(Long jobId) {
        if (!jobPostRepository.existsById(jobId)) {
            return false;
        }
        jobPostRepository.deleteById(jobId);
        return true;
    }

    public Optional<JobPost> updateJobPost(Long jobId, JobPost updatedJobPost) {
        return jobPostRepository.findById(jobId)
                .map(jobPost -> {
                    jobPost.setJobTitle(updatedJobPost.getJobTitle());
                    jobPost.setCompany(updatedJobPost.getCompany());
                    jobPost.setLocation(updatedJobPost.getLocation());
                    jobPost.setJobDescription(updatedJobPost.getJobDescription());
                    jobPost.setApplicationDeadline(updatedJobPost.getApplicationDeadline());
                    return jobPostRepository.save(jobPost);
                });
    }
}