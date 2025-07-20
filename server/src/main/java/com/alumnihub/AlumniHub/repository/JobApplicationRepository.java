package com.alumnihub.AlumniHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumnihub.AlumniHub.model.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByJob_JobId(Long jobId);
    List<JobApplication> findByUser_UserId(Long userId);
    List<JobApplication> findByJob_JobIdAndUser_UserId(Long jobId, Long userId);
    List<JobApplication> findAllByUser_UserId(Long userId);

}
