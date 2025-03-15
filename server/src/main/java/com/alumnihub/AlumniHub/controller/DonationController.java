package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.Donation;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.DonationService;
import com.alumnihub.AlumniHub.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequestMapping("/api/donations")
@CrossOrigin
@RestController
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private UserService userService;

    // ✅ Get all donations - Only authenticated users
    @GetMapping
    public ResponseEntity<?> getAllDonations(@RequestHeader("Authorization") String token) {
        try {
            Optional<User> userOpt = userService.getUserFromToken(token);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Unauthorized access"));
            }

            Map<String, Object> map = Map.of("success", true, "data", donationService.getAllDonations());
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ✅ Get donation by ID - Only authenticated users
    @GetMapping("/{donationId}")
    public ResponseEntity<?> getDonationById(@RequestHeader("Authorization") String token, @PathVariable Long donationId) {
        try {
            Optional<User> userOpt = userService.getUserFromToken(token);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Unauthorized access"));
            }

            Optional<Donation> donation = donationService.getDonationById(donationId);
            if (donation.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(Map.of("success", true, "data", donation.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Donation not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ✅ Get donation history of logged-in user
    @GetMapping("/history")
    public ResponseEntity<?> getDonationHistory(@RequestHeader("Authorization") String token) {
        try {
            Optional<User> userOpt = userService.getUserFromToken(token);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Unauthorized access"));
            }

            Map<String, Object> map = Map.of("success", true, "data", donationService.getMyDonations(userOpt.get()));
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ✅ Add new donation - Only authenticated users
    @PostMapping
    public ResponseEntity<?> addDonation(@RequestHeader("Authorization") String token,
                                         @Valid @RequestBody Donation donation) {
        try {
            Optional<User> userOpt = userService.getUserFromToken(token);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Unauthorized access"));
            }

            // Set the authenticated user to the donation
            donation.setUser(userOpt.get());

            // Save donation
            Donation newDonation = donationService.createDonation(donation);

            if (newDonation == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "Failed to create donation"));
            }

            // Return created donation
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", newDonation));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", e.getMessage()));
        }
    }

}
