package com.alumnihub.AlumniHub.service;


import com.alumnihub.AlumniHub.model.Notification;
import com.alumnihub.AlumniHub.repository.NotificationRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;
    
    public Iterable<Notification> getAllNotification() {
        return notificationRepository.findAll();
    }
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    public Notification markAsRead(Long notificationId) {
        Optional<Notification> notificationOptional = notificationRepository.findById(notificationId);
        if (notificationOptional.isPresent()) {
            Notification notification = notificationOptional.get();
            notification.setRead(true);
            return notificationRepository.save(notification);
        }
        throw new IllegalArgumentException("Notification not found with ID: " + notificationId);
    }
}

