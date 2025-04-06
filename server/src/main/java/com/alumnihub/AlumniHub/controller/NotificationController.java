package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.Notification;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.NotificationService;
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


    @GetMapping
    public ResponseEntity<Map<String, Object>> getUserNotifications(@RequestHeader("Authorization") String token) {
        Optional<User> user = authenticate(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Unauthorized"));
        }

        List<Notification> notifications = notificationService.getNotificationsByUser(user.get().getUserId());
        return ResponseEntity.ok(Map.of("success", true, "data", notifications));
    }

    // ✅ Delete Notification (only user's own notifications)
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Map<String, Object>> deleteNotification(@RequestHeader("Authorization") String token,
                                                                  @PathVariable Long notificationId) {
        Optional<User> user = authenticate(token);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Unauthorized"));
        }

        try {
            boolean deleted = notificationService.deleteNotification(notificationId, user.get().getUserId());
            if (deleted) {
                return ResponseEntity.ok(Map.of("success", true, "message", "Notification deleted successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("success", false, "message", "You are not allowed to delete this notification"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}
