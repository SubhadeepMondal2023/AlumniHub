package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.model.Notification;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // ✅ Get all notifications for a user
    public List<Notification> getNotificationsByUser(Long userId) {
        return notificationRepository.findAllByUser_UserId(userId);
    }

    // ✅ Internal method to create notification for user
    public void sendNotificationToUser(User user, String title, String description) {
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setDescription(description);
        notification.setStatus("UNREAD");
        notification.setUser(user);
        notificationRepository.save(notification);
    }

    // ✅ Delete notification only if belongs to user
    public boolean deleteNotification(Long notificationId, Long userId) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);
        if (notification.isPresent() && notification.get().getUser().getUserId().equals(userId)) {
            notificationRepository.deleteById(notificationId);
            return true;
        }
        return false; // Forbidden case
    }
}
