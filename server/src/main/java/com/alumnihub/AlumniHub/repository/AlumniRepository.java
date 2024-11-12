package com.alumnihub.AlumniHub.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.alumnihub.AlumniHub.model.Alumni;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, Integer>, JpaSpecificationExecutor<Alumni> {
    // Find alumni by associated user ID
    Optional<Alumni> findByUser_UserId(Integer userId);

    // Check if an alumni record exists for a specific user ID
    boolean existsByUser_UserId(Integer userId);

    // Search alumni by location (case-insensitive, partial match)
    List<Alumni> findByLocationContainingIgnoreCase(String location);

    // Search alumni by current company (case-insensitive, partial match)
    List<Alumni> findByCurrentCompanyContainingIgnoreCase(String company);
}


