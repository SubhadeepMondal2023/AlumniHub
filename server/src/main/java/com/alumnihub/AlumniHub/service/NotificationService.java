package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.model.Notification;
import com.alumnihub.AlumniHub.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationRepository.findAllByUser_UserId(userId);
    }

    public void sendNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
