package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.Donation;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.DonationService;
import com.alumnihub.AlumniHub.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequestMapping("/donations")
@CrossOrigin
@RestController
public class DonationController {
    @Autowired
    private DonationService donationService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllDonations() {
        try {
            Map<String, Object> map = Map.of("success", true, "data", donationService.getAllDonations());
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @GetMapping("/{donationId}")
    public ResponseEntity<?> getDonationById(@PathVariable Long donationId) {
        try {
            Optional<Donation> donation = donationService.getDonationById(donationId);
            if (donation.isPresent()) {
                Map<String, Object> map = Map.of("success", true, "data", donation.get());
                return ResponseEntity.status(HttpStatus.OK).body(map);
                // return (new ResponseEntity<>(donation, HttpStatus.OK));
            } else {
                Map<String, Object> map = Map.of("success", false, "message", "Event not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            }
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getDonationHistory(@RequestHeader("Authorization") String token) {
        try {
            Optional<User> user = userService.getUserFromToken(token);
            if (user.isPresent()) {
                Map<String, Object> map = Map.of("success", true, "data", donationService.getMyDonations(user.get()));
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

    @PostMapping
    public ResponseEntity<?> addDonation(@RequestHeader("Authorization") String token,
            @Valid @RequestBody Donation donation) {
        try {
            Optional<User> userOpt = userService.getUserFromToken(token);
            if (userOpt.isEmpty()) {
                Map<String, Object> map = Map.of("success", false, "message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
            }

            // Set the user
            donation.setUser(userOpt.get());
            System.out.println("User set in donation: " + donation.getUser());

            // Save donation
            Donation newDonation = donationService.createDonation(donation);
            System.out.println("Donation created: " + newDonation);

            // If not saved properly
            if (newDonation == null) {
                Map<String, Object> map = Map.of("success", false, "message", "Failed to create donation");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(map);
            }

            // Return success response
            Map<String, Object> map = Map.of("success", true, "data", newDonation);
            return ResponseEntity.status(HttpStatus.CREATED).body(map);

        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

}