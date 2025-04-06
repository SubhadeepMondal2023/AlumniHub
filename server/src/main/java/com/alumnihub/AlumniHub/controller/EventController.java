package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.Attendee;
import com.alumnihub.AlumniHub.model.Event;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.EventService;
import com.alumnihub.AlumniHub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RequestMapping("/api/events")
@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    private boolean isAdmin(User user) {
        return "admin".equalsIgnoreCase(user.getRole().toString());
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<?> getEventById(@PathVariable Long eventId) {
        try {
            Optional<Event> event = eventService.getEventById(eventId);
            return event.map(value -> ResponseEntity.ok(Map.of("success", true, "data", value)))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Event not found")));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestHeader("Authorization") String token, @RequestBody Event event) {
        try {
            Optional<User> user = userService.getUserFromToken(token);
            if (user.isPresent() && isAdmin(user.get())) {
                event.setCreatedBy(user.get());
                Event createdEvent = eventService.createEvent(event);
                return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", createdEvent));
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("success", false, "message", "Access denied"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllEvents() {
        try {
            return ResponseEntity.ok(Map.of("success", true, "data", eventService.getAllEvents()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEvent(@RequestHeader("Authorization") String token, @PathVariable Long eventId) {
        try {
            Optional<User> user = userService.getUserFromToken(token);
            if (user.isPresent() && isAdmin(user.get())) {
                eventService.deleteEvent(eventId);
                return ResponseEntity.ok(Map.of("success", true, "message", "Event deleted successfully"));
            }
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("success", false, "message", "Access denied"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    @PostMapping("/{eventId}/attend")
    public ResponseEntity<?> attendEvent(@RequestHeader("Authorization") String token, @PathVariable Long eventId) {
        try {
            Optional<User> user = userService.getUserFromToken(token);
            if (user.isPresent()) {
                Optional<Event> event = eventService.attendEvent(eventId, user.get().getUserId());
                return event.map(value -> ResponseEntity.ok(Map.of("success", true, "data", value)))
                        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Event not found")));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}
