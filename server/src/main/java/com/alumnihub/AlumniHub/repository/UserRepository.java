package com.alumnihub.AlumniHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumnihub.AlumniHub.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
    // Add custom query methods if needed
}
