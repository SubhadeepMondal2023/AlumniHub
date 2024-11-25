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

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequestMapping("/events")
@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @GetMapping("/{eventId}")
    public ResponseEntity<?> getEventById(@PathVariable Long eventId) {
        try {
            Optional<Event> event = eventService.getEventById(eventId);
            if (event.isPresent()) {
                Map<String, Object> map = Map.of("success", true, "data", event.get());
                return ResponseEntity.status(HttpStatus.OK).body(map);
            } else {
                Map<String, Object> map = Map.of("success", false, "message", "Event not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            }
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @PostMapping
    public ResponseEntity<?> createEvent(@RequestHeader("Authorization") String token, @RequestBody Event event) {
        try {
            Optional<User> user = userService.getUserFromToken(token);
            if (user.isPresent()) {
                event.setCreatedBy(user.get());
                Event createdEvent = eventService.createEvent(event);
                Map<String, Object> map = Map.of(
                        "success", true,
                        "data", createdEvent);
                return ResponseEntity.status(HttpStatus.CREATED).body(map);
            } else {
                Map<String, Object> map = Map.of(
                        "success", false,
                        "message", "User not found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
            }
        } catch (Exception e) {
            Map<String, Object> map = Map.of(
                    "success", false,
                    "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllEvents() {
        try {
            Map<String, Object> map = Map.of("success", true, "data", eventService.getAllEvents());
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long eventId) {
        try {
            eventService.deleteEvent(eventId);
            Map<String, Object> map = Map.of("success", true, "message", "Event deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @RequestBody Event eventDetails) {
        try {
            Optional<Event> updatedEvent = eventService.updateEvent(eventId, eventDetails);
            if (updatedEvent.isPresent()) {
                Map<String, Object> map = Map.of("success", true, "data", updatedEvent.get());
                return ResponseEntity.status(HttpStatus.OK).body(map);
            } else {
                Map<String, Object> map = Map.of("success", false, "message", "Event not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            }
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @PostMapping("/{eventId}/attend")
    public ResponseEntity<?> attendEvent(@RequestHeader("Authorization") String token, @PathVariable Long eventId) {
        try {
            Optional<User> user = userService.getUserFromToken(token);
            if (user.isPresent()) {
                Optional<Event> event = eventService.attendEvent(eventId, user.get().getUserId());
                if (event.isPresent()) {
                    Map<String, Object> map = Map.of("success", true, "data", event.get());
                    return ResponseEntity.status(HttpStatus.OK).body(map);
                } else {
                    Map<String, Object> map = Map.of("success", false, "message", "Event not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
                }
            } else {
                Map<String, Object> map = Map.of(
                        "success", false,
                        "message", "User not found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
            }
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @GetMapping("/{eventId}/attendees")
    public ResponseEntity<?> getEventAttendees(@PathVariable Long eventId) {
        try {
            List<Attendee> attendees = eventService.getEventAttendees(eventId);
            if (!attendees.isEmpty()) {
                Map<String, Object> map = Map.of("success", true, "data", attendees);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            } else {
                Map<String, Object> map = Map.of("success", false, "message", "No attendees found for this event");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            }
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @GetMapping("/my-events")
    public ResponseEntity<?> getMyEvents(@RequestHeader("Authorization") String token) {
        try {
            Optional<User> user = userService.getUserFromToken(token);
            if (user.isPresent()) {
                Map<String, Object> map = Map.of("success", true, "data",
                        eventService.getMyEvents(user.get().getUserId()));
                return ResponseEntity.status(HttpStatus.OK).body(map);
            } else {
                Map<String, Object> map = Map.of("success", false, "message", "User not found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
            }
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }
}

// package com.alumnihub.AlumniHub.controller;

// import com.alumnihub.AlumniHub.model.Event;
// import com.alumnihub.AlumniHub.service.EventService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;
// import java.util.Optional;

// @RequestMapping("/events")
// @RestController
// public class EventController {

// @Autowired
// private EventService eventService;

// @GetMapping("/{eventId}")
// public ResponseEntity<?> getEventById(@PathVariable Long eventId) {
// try {
// Optional<Event> event = eventService.getEventById(eventId);
// if (event.isPresent()) {
// Map<String, Object> map = Map.of("success", true, "data", event.get());
// return ResponseEntity.status(HttpStatus.OK).body(map);
// } else {
// Map<String, Object> map = Map.of("success", false, "message", "Event not
// found");
// return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
// }
// } catch (Exception e) {
// Map<String, Object> map = Map.of("success", false, "message",
// e.getMessage());
// return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
// }
// }

// @PostMapping
// public ResponseEntity<?> createEvent(@RequestBody Event event) {
// try {
// Event createdEvent = eventService.createEvent(event);
// Map<String, Object> map = Map.of("success", true, "data", createdEvent);
// return ResponseEntity.status(HttpStatus.CREATED).body(map);
// } catch (Exception e) {
// Map<String, Object> map = Map.of("success", false, "message",
// e.getMessage());
// return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
// }
// }

// @GetMapping
// public ResponseEntity<?> getAllEvents() {
// try {
// Map<String, Object> map = Map.of("success", true, "data",
// eventService.getAllEvents());
// return ResponseEntity.status(HttpStatus.OK).body(map);
// } catch (Exception e) {
// Map<String, Object> map = Map.of("success", false, "message",
// e.getMessage());
// return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
// }
// }

// @DeleteMapping("/{eventId}")
// public ResponseEntity<?> deleteEvent(@PathVariable Long eventId) {
// try {
// eventService.deleteEvent(eventId);
// Map<String, Object> map = Map.of("success", true, "message", "Event deleted
// successfully");
// return ResponseEntity.status(HttpStatus.OK).body(map);
// } catch (Exception e) {
// Map<String, Object> map = Map.of("success", false, "message",
// e.getMessage());
// return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
// }
// }

// @PutMapping("/{eventId}")
// public ResponseEntity<?> updateEvent(@PathVariable Long eventId, @RequestBody
// Event eventDetails) {
// try {
// Optional<Event> updatedEvent = eventService.updateEvent(eventId,
// eventDetails);
// if (updatedEvent.isPresent()) {
// Map<String, Object> map = Map.of("success", true, "data",
// updatedEvent.get());
// return ResponseEntity.status(HttpStatus.OK).body(map);
// } else {
// Map<String, Object> map = Map.of("success", false, "message", "Event not
// found");
// return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
// }
// } catch (Exception e) {
// Map<String, Object> map = Map.of("success", false, "message",
// e.getMessage());
// return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
// }
// }

// @PostMapping("/{eventId}/attend/{userId}")
// public ResponseEntity<?> attendEvent(@PathVariable Long eventId,
// @PathVariable Long userId) {
// try {
// Optional<Event> event = eventService.attendEvent(eventId, userId);
// if (event.isPresent()) {
// Map<String, Object> map = Map.of("success", true, "data", event.get());
// return ResponseEntity.status(HttpStatus.OK).body(map);
// } else {
// Map<String, Object> map = Map.of("success", false, "message", "Event not
// found");
// return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
// }
// } catch (Exception e) {
// Map<String, Object> map = Map.of("success", false, "message",
// e.getMessage());
// return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
// }
// }

// @GetMapping("/{eventId}/attendees")
// public ResponseEntity<?> getEventAttendees(@PathVariable Long eventId) {
// try {
// Optional<Event> event = eventService.getEventAttendees(eventId);
// if (event.isPresent()) {
// Map<String, Object> map = Map.of("success", true, "data",
// event.get().getAttendees());
// return ResponseEntity.status(HttpStatus.OK).body(map);
// } else {
// Map<String, Object> map = Map.of("success", false, "message", "Event not
// found");
// return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
// }
// } catch (Exception e) {
// Map<String, Object> map = Map.of("success", false, "message",
// e.getMessage());
// return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
// }
// }

// @GetMapping("/my-events")
// public ResponseEntity<?> getMyEvents(@RequestParam Long userId) {
// try {
// Map<String, Object> map = Map.of("success", true, "data",
// eventService.getMyEvents(userId));
// return ResponseEntity.status(HttpStatus.OK).body(map);
// } catch (Exception e) {
// Map<String, Object> map = Map.of("success", false, "message",
// e.getMessage());
// return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
// }
// }
// }
