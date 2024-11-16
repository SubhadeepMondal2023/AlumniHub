package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.model.Gender;
import com.alumnihub.AlumniHub.model.LoginRequest;
import com.alumnihub.AlumniHub.model.Role;
import com.alumnihub.AlumniHub.util.EmailService;
import com.alumnihub.AlumniHub.service.UserService;
import com.alumnihub.AlumniHub.storage.OtpStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpStorage otpStorage;

    // Step 1: Start Registration
    @PostMapping("/auth/register/send-otp")
    public ResponseEntity<?> RegistrationSendOtp(@RequestBody User user) {
        try {

            // Send OTP to email
            String otp = emailService.sendOtpEmail(user.getEmail());

            // Store OTP in the OTP storage
            otpStorage.storeOtp(user.getEmail(), otp);

            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "success", true,
                    "message", "OTP sent to " + user.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    // Step 2: Complete Registration
    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otp = request.get("otp");

            // Validate OTP
            String storedOtp = otpStorage.getOtp(email);
            if (storedOtp == null || !storedOtp.equals(otp)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "success", false,
                        "message", "Invalid or expired OTP!"));
            }

            // Retrieve user details from the OTP storage (you need to store user details as
            // well in otpStorage if required)
            User user = new User();
            user.setFirstName(request.get("firstName"));
            user.setLastName(request.get("lastName"));
            user.setEmail(email); // Set email from the request
            user.setPassword(request.get("password")); // Set password from the request

            // Convert string role to Role enum
            String roleString = request.get("role");
            Role role = Role.valueOf(roleString.toUpperCase()); // Convert the string to Role enum
            user.setRole(role);

            // Convert string gender to Gender enum
            String genderString = request.get("gender");
            Gender gender = Gender.valueOf(genderString.toUpperCase()); // Convert the string to Gender enum
            user.setGender(gender);

            // Set date of birth
            user.setDateOfBirth(LocalDate.parse(request.get("dateOfBirth")));

            // Convert yearOfGraduation to Short
            Short yearOfGraduation = Short.parseShort(request.get("yearOfGraduation"));
            user.setYearOfGraduation(yearOfGraduation);

            user.setDegree(request.get("degree"));
            user.setIndustry(request.get("industry"));
            user.setProfileImage(request.get("profileImage"));
            user.setBio(request.get("bio"));
            String token = userService.registerUser(user);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "jwt", token,
                    "message", "Registration successful!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    // Login User
    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.loginUser(loginRequest);
            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "success", true,
                    "jwt", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    // Reset Password Step 1: Send OTP
    @PostMapping("/auth/reset-password/send-otp")
    public ResponseEntity<?> ResetPasswordSendOtp(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");

            // Send OTP
            String otp = emailService.sendOtpEmail(email);
            otpStorage.storeOtp(email, otp);

            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "success", true,
                    "message", "OTP sent to " + email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    // Reset Password Step 2: Complete Reset
    @PostMapping("/auth/reset-password")
    public ResponseEntity<?> ResetPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otp = request.get("otp");
            String newPassword = request.get("newPassword");

            // Validate OTP
            String storedOtp = otpStorage.getOtp(email);
            if (storedOtp == null || !storedOtp.equals(otp)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                        "success", false,
                        "message", "Invalid or expired OTP!"));
            }

            // Update password
            userService.updatePassword(email, newPassword);
            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "success", true,
                    "message", "Password reset successful!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    @GetMapping("/api/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
        try {

            // Fetch user from token
            Optional<User> user = userService.getUserFromToken(token);

            // Construct the response map
            Map<String, Object> map = Map.of(
                    "success", true,
                    "data", user);
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            Map<String, Object> map = Map.of(
                    "success", false,
                    "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
        }
    }
}

// @GetMapping("/{userId}")
// public ResponseEntity<User> getUser(@PathVariable Long userId) {
// Optional<User> userOpt = userService.getUser(userId);
// if (userOpt.isPresent()) {
// return ResponseEntity.ok(userOpt.get());
// } else {
// return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
// }
// }