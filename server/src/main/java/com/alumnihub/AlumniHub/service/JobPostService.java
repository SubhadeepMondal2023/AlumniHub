package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.JobPost;
import com.alumnihub.AlumniHub.model.User;
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
public class JobPostService {

    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<JobPost> getJobPostById(Long jobId) {
        return jobPostRepository.findById(jobId);
    }

    public List<JobPost> searchJobPosts(String jobTitle, String company, String location) {
        List<JobPost> results = jobPostRepository.searchJobPosts(jobTitle, company, location);
        log.info("Searching job posts with filters - jobTitle: {}, company: {}, location: {}. Found {} records",
                jobTitle, company, location, results.size());
        return results;
    }

    public List<JobPost> searchByKeyword(String searchTerm) {
        List<JobPost> results = jobPostRepository.searchByKeyword(searchTerm);
        log.info("Searching job posts with keyword: {}. Found {} records", searchTerm, results.size());
        return results;
    }

    public JobPost createJobPost(JobPost jobPost) {
        if (jobPost == null || jobPost.getUser() == null || jobPost.getUser().getUserId() == null) {
            throw new IllegalArgumentException("Invalid job post or user data provided");
        }

        User user = userRepository.findById(jobPost.getUser().getUserId())
                .orElseThrow(() -> new NotFoundException("User not found"));

        jobPost.setUser(user);
        return jobPostRepository.save(jobPost);
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

    public boolean deleteJobPost(Long jobId) {
        if (!jobPostRepository.existsById(jobId)) {
            return false;
        }
        jobPostRepository.deleteById(jobId);
        return true;
    }
}