package com.alumnihub.AlumniHub.controller;

import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.model.LoginRequest;
import com.alumnihub.AlumniHub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            
            String token = userService.registerUser(user);
            Map<String, Object> map = Map.of("success", true, "jwt", token);
            return ResponseEntity.status(HttpStatus.CREATED).body(map);
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String token = userService.loginUser(loginRequest);
            Map<String, Object> map = Map.of("success", true, "jwt", token);
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            Map<String, Object> map = Map.of("success", false, "message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
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
                "data", user
            );
            return ResponseEntity.status(HttpStatus.OK).body(map);
        } catch (Exception e) {
            Map<String, Object> map = Map.of(
                "success", false,
                "message", e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
        }
    }
}
