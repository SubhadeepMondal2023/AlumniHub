package com.alumnihub.AlumniHub.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.alumnihub.AlumniHub.model.Alumni;
import com.alumnihub.AlumniHub.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniRepository extends JpaRepository<Alumni, Long>, JpaSpecificationExecutor<Alumni> {
    // Find alumni by associated user ID
    Optional<User> findByUser_UserId(Long userId);

    // Check if an alumni record exists for a specific user ID
    boolean existsByUser_UserId(Long userId);

    // Search alumni by location (case-insensitive, partial match)
    List<Alumni> findByLocationContainingIgnoreCase(String location);

    // Search alumni by current company (case-insensitive, partial match)
    List<Alumni> findByCurrentCompanyContainingIgnoreCase(String company);
}


