package com.alumnihub.AlumniHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumnihub.AlumniHub.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Add custom query methods if needed
    List<Notification> findAllByUser_UserId(Long userId);
    
}
