package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.jwt.TokenBlacklistService;
import com.alumnihub.AlumniHub.util.EmailService;
import com.alumnihub.AlumniHub.util.PasswordConstraintValidator;

import jakarta.validation.Valid;

import com.alumnihub.AlumniHub.service.UserService;
import com.alumnihub.AlumniHub.storage.OtpStorage;
import com.alumnihub.AlumniHub.storage.UserStorage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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

    @Autowired
    private UserStorage userStorage;

    @Autowired
    private PasswordConstraintValidator passwordValidator;

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }

    // Step 1: Start Registration
    // input - email first,last name password yog
    @PostMapping("/auth/register/send-otp")
    public ResponseEntity<?> RegistrationSendOtp(@Valid @RequestBody User user) {
        try {

            if (userService.getUserByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "success", false,
                                "message", "Email is already registered"));
            }

            if (!passwordValidator.isValid(user.getPassword(), null)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "success", false,
                                "message", "Password does not meet the required criteria"));
            }
            String otp = emailService.sendOtpEmail(user.getEmail());
            otpStorage.storeOtp(user.getEmail(), otp);
            userStorage.storeUserDetails(user);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of(
                            "success", true,
                            "message", "OTP sent to " + user.getEmail()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "success", false,
                            "message", e.getMessage()));
        }
    }

    // Step 2: Complete Registration
    // input email otp
    @PostMapping("/auth/register/confirm")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        {
            try {
                String email = request.get("email");
                String otp = request.get("otp");
                String storedOtp = otpStorage.getOtp(email);
                if (storedOtp == null || !storedOtp.equals(otp)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(Map.of(
                                    "success", false,
                                    "message", "Invalid or expired OTP!"));
                }
                User user = userStorage.getUserDetails(email);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(Map.of(
                                    "success", false,
                                    "message", "User details not found!"));
                }
                String token = userService.registerUser(user);
                userStorage.removeUserDetails(email);
                otpStorage.removeOtp(email);
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(Map.of(
                                "success", true,
                                "jwt", token,
                                "message", "Registration successful!"));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of(
                                "success", false,
                                "message", e.getMessage()));
            }
        }
    }

    // Login User
    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");

            String token = userService.loginUser(email, password);
            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "success", true,
                    "jwt", token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    // delete User
    @DeleteMapping("/api/user/delete")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String token) {
        try {
            userService.deleteUser(token);
            return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                    "success", true,
                    "message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", e.getMessage()));
        }
    }

    @PostMapping("/api/logout")
    public ResponseEntity<?> logoutUser(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        tokenBlacklistService.blacklistToken(jwt);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "success", true,
                "message", "Logged out successfully"));
    }

    // update user
    @PutMapping("/api/user/update-profile")
public ResponseEntity<?> updateUserProfile(
        @RequestHeader("Authorization") String token, 
        @RequestBody Map<String, String> parameters) {
    try {
        // Extract user from the token
        User user = userService.getUserFromToken(token).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Invalid or expired token"));
        }

        // Pass userId and parameters to the service
        userService.updateUserProfile(user.getUserId(), parameters);

        return ResponseEntity.status(HttpStatus.OK).body(Map.of(
                "success", true,
                "message", "User profile updated successfully"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
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
