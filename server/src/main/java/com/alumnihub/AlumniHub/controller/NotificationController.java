package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.Notification;
import com.alumnihub.AlumniHub.service.NotificationService;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    private Optional<User> authenticate(String token) {
        try {
            return userService.getUserFromToken(token);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getUserNotifications(@PathVariable Long userId) {
        Optional<User> user = userService.getUser(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("success", false, "message", "User not found"));
        }

        List<Notification> notifications = notificationService.getNotificationsByUser(user.get().getUserId());
        return ResponseEntity.ok(Map.of("success", true, "data", notifications));
    }

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendNotification(@RequestHeader("Authorization") String token,
                                                            @RequestBody Notification notification) {
    Optional<User> user = authenticate(token);
    if (user.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("success", false, "message", "User  not found"));
    }

    try {
        notification.setUser (user.get()); // Set the user entity directly
        notificationService.sendNotification(notification);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("success", true, "message", "Notification sent successfully"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("success", false, "message", e.getMessage()));
    }
}
    
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Map<String, Object>> deleteNotification(@PathVariable Long notificationId) {
        try {
            notificationService.deleteNotification(notificationId);
            return ResponseEntity.ok(Map.of("success", true, "message", "Notification deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }
    }
