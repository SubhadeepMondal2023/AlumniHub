package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            Map<String, Object> map = Map.of("success", true, "data", registeredUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(map);
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password) {
        Optional<User> user = userService.login(email, password);
        if (user.isPresent()) {
            Map<String, Object> map = Map.of("success", true, "data", user.get());
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } else {
            Map<String, Object> map = Map.of("success", false, "message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
        }
    }

    @GetMapping("/myprofile")
    public ResponseEntity<?> getMyProfile(@RequestParam Long userId) {
        Optional<User> user = userService.getMyProfile(userId);
        if (user.isPresent()) {
            Map<String, Object> map = Map.of("success", true, "data", user.get());
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } else {
            Map<String, Object> map = Map.of("success", false, "message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        }
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestParam Long userId, @RequestBody User user) {
        Optional<User> updatedUser = userService.updateProfile(userId, user);
        if (updatedUser.isPresent()) {
            Map<String, Object> map = Map.of("success", true, "data", updatedUser.get());
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } else {
            Map<String, Object> map = Map.of("success", false, "message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        }
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestParam Long userId, @RequestParam String oldPassword, @RequestParam String newPassword) {
        boolean isUpdated = userService.updatePassword(userId, oldPassword, newPassword);
        if (isUpdated) {
            Map<String, Object> map = Map.of("success", true, "message", "Password updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } else {
            Map<String, Object> map = Map.of("success", false, "message", "Invalid current password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        Optional<String> otp = userService.forgotPassword(email);
        if (otp.isPresent()) {
            Map<String, Object> map = Map.of("success", true, "otp", otp.get());
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } else {
            Map<String, Object> map = Map.of("success", false, "message", "User not found with this email");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String otp, @RequestParam String newPassword) {
        boolean isReset = userService.resetPassword(email, otp, newPassword);
        if (isReset) {
            Map<String, Object> map = Map.of("success", true, "message", "Password reset successfully");
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } else {
            Map<String, Object> map = Map.of("success", false, "message", "Invalid OTP or email");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @DeleteMapping("/delete-account")
    public ResponseEntity<?> deleteAccount(@RequestParam Long userId) {
        boolean isDeleted = userService.deleteAccount(userId);
        if (isDeleted) {
            Map<String, Object> map = Map.of("success", true, "message", "Account deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } else {
            Map<String, Object> map = Map.of("success", false, "message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
        }
    }
}
