package com.alumnihub.AlumniHub.service;


import com.alumnihub.AlumniHub.model.Notification;
import com.alumnihub.AlumniHub.repository.NotificationRepository;
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
    public void deleteNotification(Notification notification) {
        notificationRepository.delete(notification);
    }
}

