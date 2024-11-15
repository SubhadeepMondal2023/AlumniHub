package com.alumnihub.AlumniHub.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumnihub.AlumniHub.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    // Add custom query methods if needed
    Optional<User> findById(Long userId);

    Optional<User> findByEmail(String email);
}
