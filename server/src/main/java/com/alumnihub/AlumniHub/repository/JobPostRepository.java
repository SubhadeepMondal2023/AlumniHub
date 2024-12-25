package com.alumnihub.AlumniHub.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.alumnihub.AlumniHub.model.JobPost;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {
    
    @Query("SELECT j FROM JobPost j WHERE " +
           "(:jobTitle IS NULL OR LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :jobTitle, '%'))) AND " +
           "(:company IS NULL OR LOWER(j.company) LIKE LOWER(CONCAT('%', :company, '%'))) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<JobPost> searchJobPosts(
        @Param("jobTitle") String jobTitle,
        @Param("company") String company,
        @Param("location") String location
    );

    @Query("SELECT j FROM JobPost j WHERE " +
           "LOWER(j.jobTitle) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(j.company) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(j.jobDescription) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<JobPost> searchByKeyword(@Param("searchTerm") String searchTerm);
}
