package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.exception.AlumniNotFoundException;
import com.alumnihub.AlumniHub.exception.NotFoundException;
import com.alumnihub.AlumniHub.model.Alumni;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.AlumniService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/alumni")
public class AlumniController {

    @Autowired
    private AlumniService alumniService;

    @GetMapping
    public ResponseEntity<List<Alumni>> getAllAlumni(@RequestParam(required = false) String location,
                                                     @RequestParam(required = false) String company) {
        List<Alumni> alumniList = alumniService.getAllAlumni(location, company);

        if (alumniList.isEmpty()) {
            String message = (location != null || company != null)
                ? "No alumni found matching the specified criteria"
                : "No alumni records found in the system";
            throw new AlumniNotFoundException(message);
        }

        return ResponseEntity.ok(alumniList);
    }

    @GetMapping("/{alumniId}")
    public ResponseEntity<?> getAlumniById(@PathVariable Long alumniId) {
        Optional<Alumni> alumni = alumniService.getAlumniById(alumniId);
        if (alumni.isEmpty()) {
            throw new AlumniNotFoundException("Alumni not found with ID: " + alumniId);
        }
        
        Map<String, Object> successResponse = Map.of(
            "success", true,
            "data", alumni.get()
        );
        return ResponseEntity.ok(successResponse);
    }

    @PostMapping
    public ResponseEntity<?> createAlumni(@RequestBody Alumni alumni) {
        if (alumni == null || alumni.getUser() == null || alumni.getUser().getUserId() == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Invalid input: Alumni or User data is missing"
            ));
        }

        try {
            // Check if user exists
            User user = alumniService.getUserById(alumni.getUser().getUserId())
                    .orElseThrow(() -> new NotFoundException("User not found"));

            // Check if alumni profile already exists for this user
            if (alumniService.alumniExistsByUserId(user.getUserId())) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Alumni profile already exists for this user"
                ));
            }

            // Create new alumni profile
            Alumni newAlumni = alumniService.createAlumni(alumni);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "data", newAlumni
            ));
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            // Catch unexpected exceptions to prevent HTTP 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "An unexpected error occurred: " + e.getMessage()
            ));
        }
    }


    @PutMapping("/{alumniId}")
    public ResponseEntity<?> updateAlumni(@PathVariable Long alumniId, @RequestBody Alumni alumniDetails) {
        try {
            Optional<Alumni> updatedAlumni = alumniService.updateAlumni(alumniId, alumniDetails);
            if (updatedAlumni.isEmpty()) {
                throw new AlumniNotFoundException("Alumni not found with ID: " + alumniId);
            }
            
            Map<String, Object> successResponse = Map.of(
                "success", true,
                "data", updatedAlumni.get(),
                "message", "Alumni profile updated successfully"
            );
            return ResponseEntity.ok(successResponse);
        } catch (AlumniNotFoundException e) {
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "message", e.getMessage(),
                "status", HttpStatus.NOT_FOUND.value()
            );
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "message", e.getMessage(),
                "status", HttpStatus.INTERNAL_SERVER_ERROR.value()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/{alumniId}")
    public ResponseEntity<?> deleteAlumni(@PathVariable Long alumniId) {
        try {
            boolean isDeleted = alumniService.deleteAlumni(alumniId);
            if (!isDeleted) {
                throw new AlumniNotFoundException("Alumni not found with ID: " + alumniId);
            }
            
            Map<String, Object> successResponse = Map.of(
                "success", true,
                "message", "Alumni profile deleted successfully"
            );
            return ResponseEntity.ok(successResponse);
        } catch (AlumniNotFoundException e) {
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "message", e.getMessage(),
                "status", HttpStatus.NOT_FOUND.value()
            );
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "message", e.getMessage(),
                "status", HttpStatus.INTERNAL_SERVER_ERROR.value()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}