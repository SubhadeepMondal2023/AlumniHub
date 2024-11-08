package com.alumnihub.AlumniHub.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alumnihub.AlumniHub.model.Notification;
import com.alumnihub.AlumniHub.service.NotificationService;

@RequestMapping("/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/get-all-notification")
    public ResponseEntity<?> getAllNotification() {
        try{
            Map<String, Object> map = Map.of("success", true);
            map.put("data", notificationService.getAllNotification());
            return ResponseEntity.status(HttpStatus.OK).body(map);

        }catch(Exception e){

            Map<String, Object> map = Map.of("success", false);
            map.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @PostMapping("/create-notification")
    public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
        try{
            Map<String, Object> map = Map.of("success", true);
            map.put("data", notificationService.createNotification(notification));
            return ResponseEntity.status(HttpStatus.OK).body(map);
        }catch(Exception e){    
            Map<String, Object> map = Map.of("success", false);
            map.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }
    @DeleteMapping("/delete-notification/{id}")
    public ResponseEntity<?> deleteNotification(@RequestBody Notification notification) {
        try{
            notificationService.deleteNotification(notification);
            Map<String, Object> map = Map.of("success", true);
            map.put("data", "Notification deleted successfully");

            return ResponseEntity.status(HttpStatus.OK).body(map);
        }catch(Exception e){    
            Map<String, Object> map = Map.of("success", false);
            map.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }
    
}