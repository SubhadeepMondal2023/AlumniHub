package com.alumnihub.AlumniHub.repository;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alumnihub.AlumniHub.model.JobPost;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {

    List<JobPost> findAll(Specification<JobPost> searchSpecification);

}
