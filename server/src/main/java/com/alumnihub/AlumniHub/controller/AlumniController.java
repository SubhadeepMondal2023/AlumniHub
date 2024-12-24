package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.exception.AlumniNotFoundException;
import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.Alumni;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.AlumniService;
import com.alumnihub.AlumniHub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/alumni")
@CrossOrigin(origins = "http://localhost:5173")
public class AlumniController {

    @Autowired
    private AlumniService alumniService;

    @Autowired
    private UserService userService;

    private Optional<User> authenticate(String token) {
        try {
            return userService.getUserFromToken(token);
        } catch (Exception e) {
            System.err.println("Error during authentication: " + e.getMessage());
            return Optional.empty();
        }
    }
    

    @GetMapping
    public ResponseEntity<?> getAllAlumni(@RequestHeader("Authorization") String token,
                                          @RequestParam(required = false) String location,
                                          @RequestParam(required = false) String company,
                                          @RequestParam(required = false) Integer minYoe,
                                          @RequestParam(required = false) Integer maxYoe,
                                          @RequestParam(required = false) String industry) {
        Optional<User> user = authenticate(token);
        if (user.isPresent()) {
            List<Alumni> alumniList = alumniService.getAllAlumni(location, company, minYoe, maxYoe, industry);
            if (alumniList.isEmpty()) {
                String message = (location != null || company != null || minYoe != null || 
                                maxYoe != null || industry != null)
                    ? "No alumni found matching the specified criteria"
                    : "No alumni records found in the system";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", message));
            }
            return ResponseEntity.ok(Map.of("success", true, "data", alumniList));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        }
    }

    @GetMapping("/search/experience")
    public ResponseEntity<?> getAlumniByExperience(@RequestHeader("Authorization") String token,
                                                    @RequestParam(required = false) Integer minYoe,
                                                    @RequestParam(required = false) Integer maxYoe) {
        Optional<User> user = authenticate(token);
        if (user.isPresent()) {
            List<Alumni> alumni = alumniService.getAlumniByYearOfExperience(minYoe, maxYoe);
            if (alumni.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", false, "message", "No alumni found with the specified years of experience range"));
            }
            return ResponseEntity.ok(Map.of("success", true, "data", alumni));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        }
    }

    @GetMapping("/search/industry")
    public ResponseEntity<?> getAlumniByIndustry(@RequestHeader("Authorization") String token,
                                                  @RequestParam String industry) {
        Optional<User> user = authenticate(token);
        if (user.isPresent()) {
            List<Alumni> alumni = alumniService.getAlumniByIndustry(industry);
            if (alumni.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", false, "message", "No alumni found in the specified industry: " + industry));
            }
            return ResponseEntity.ok(Map.of("success", true, "data", alumni));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        }
    }

    @GetMapping("/{alumniId}")
    public ResponseEntity<?> getAlumniById(@RequestHeader("Authorization") String token, @PathVariable Long alumniId) {
        Optional<User> user = authenticate(token);
        if (user.isPresent()) {
            Optional<Alumni> alumni = alumniService.getAlumniById(alumniId);
            if (alumni.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Alumni not found with ID: " + alumniId));
            }
            return ResponseEntity.ok(Map.of("success", true, "data", alumni.get()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createAlumni(@RequestHeader("Authorization") String token, @RequestBody Alumni alumni) {
        Optional<User> user = authenticate(token);
        if (user.isPresent()) {
            if (alumni == null || alumni.getUser() == null || alumni.getUser().getUserId() == null) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid input: Alumni or User data is missing"));
            }
            try {
                User userFromDb = alumniService.getUserById(alumni.getUser().getUserId())
                        .orElseThrow(() -> new NotFoundException("User not found"));

                if (alumniService.alumniExistsByUserId(userFromDb.getUserId())) {
                    return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Alumni profile already exists for this user"));
                }

                Alumni newAlumni = alumniService.createAlumni(alumni);
                return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", newAlumni));
            } catch (NotFoundException e) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "An unexpected error occurred: " + e.getMessage()));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        }
    }

    @PutMapping("/{alumniId}")
    public ResponseEntity<?> updateAlumni(@RequestHeader("Authorization") String token, @PathVariable Long alumniId, @RequestBody Alumni alumniDetails) {
        Optional<User> user = authenticate(token);
        if (user.isPresent()) {
            try {
                Optional<Alumni> updatedAlumni = alumniService.updateAlumni(alumniId, alumniDetails);
                if (updatedAlumni.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Alumni not found with ID: " + alumniId));
                }
                return ResponseEntity.ok(Map.of("success", true, "data", updatedAlumni.get(), "message", "Alumni profile updated successfully"));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", e.getMessage()));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        }
    }

    @DeleteMapping("/{alumniId}")
    public ResponseEntity<?> deleteAlumni(@RequestHeader("Authorization") String token, @PathVariable Long alumniId) {
        Optional<User> user = authenticate(token);
        if (user.isPresent()) {
            try {
                boolean isDeleted = alumniService.deleteAlumni(alumniId);
                if (!isDeleted) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Alumni not found with ID: " + alumniId));
                }
                return ResponseEntity.ok(Map.of("success", true, "message", "Alumni profile deleted successfully"));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", e.getMessage()));
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "User not found"));
        }
    }
}
