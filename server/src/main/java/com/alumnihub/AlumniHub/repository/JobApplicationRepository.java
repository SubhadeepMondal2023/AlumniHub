package com.alumnihub.AlumniHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alumnihub.AlumniHub.model.JobApplication;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByJob_JobId(Long jobId);

    List<JobApplication> findByUser_UserId(Long userId);

    List<JobApplication> findByJob_JobIdAndUser_UserId(Long jobId, Long userId);
    
}
