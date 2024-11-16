package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUser(Long userId) {
        return userRepository.findById(userId);
    }

    // Register a new user
    public User register(User user) {
        return userRepository.save(user);
    }

    // Login method
    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty();
    }

    // Get user profile by ID
    public Optional<User> getMyProfile(Long userId) {
        return userRepository.findById(userId);
    }

    // Update user profile
    public Optional<User> updateProfile(Long userId, User user) {
        Optional<User> existingUser = userRepository.findById(userId);
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setFirstName(user.getFirstName());
            updatedUser.setLastName(user.getLastName());
            updatedUser.setEmail(user.getEmail());
            userRepository.save(updatedUser);
            return Optional.of(updatedUser);
        }
        return Optional.empty();
    }

    // Update user password
    public boolean updatePassword(Long userId, String oldPassword, String newPassword) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && user.get().getPassword().equals(oldPassword)) {
            user.get().setPassword(newPassword);
            userRepository.save(user.get());
            return true;
        }
        return false;
    }

    // Forgot password - generate OTP
    public Optional<String> forgotPassword(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            String otp = generateOtp();
            // Send OTP (implementation needed for actual sending)
            return Optional.of(otp);
        }
        return Optional.empty();
    }

    // Reset password with OTP
    public boolean resetPassword(String email, String otp, String newPassword) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            user.get().setPassword(newPassword);
            userRepository.save(user.get());
            return true;
        }
        return false;
    }

    // Delete user account
    public boolean deleteAccount(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    // Generate OTP (for demonstration purposes)
    private String generateOtp() {
        return String.valueOf((int) (Math.random() * 900000) + 100000);
    }
}
