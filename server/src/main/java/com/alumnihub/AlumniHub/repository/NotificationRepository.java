package com.alumnihub.AlumniHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumnihub.AlumniHub.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Add custom query methods if needed
    
}
