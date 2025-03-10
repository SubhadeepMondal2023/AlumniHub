package com.alumnihub.AlumniHub.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.alumnihub.AlumniHub.model.Notification;
import com.alumnihub.AlumniHub.service.NotificationService;

@RestController
@CrossOrigin
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/get-all-notification")
    public ResponseEntity<?> getAllNotification() {
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("data", notificationService.getAllNotification());
            return ResponseEntity.status(HttpStatus.OK).body(map);

        } catch (Exception e) {
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }
    // add route for read un read notification

    @PostMapping("/create-notification")
    public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("data", notificationService.createNotification(notification));
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @DeleteMapping("/delete-notification/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        try {
            notificationService.deleteNotification(notificationId);
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("data", "Notification deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<?> markNotificationAsRead(@PathVariable Long notificationId) {
        try {
            Notification updatedNotification = notificationService.markAsRead(notificationId);
            return ResponseEntity.ok(updatedNotification);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
