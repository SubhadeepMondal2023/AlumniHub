package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.jwt.JwtProvider;
import com.alumnihub.AlumniHub.model.Gender;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.UserRepository;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUser(Long userId) {
        return userRepository.findById(userId);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public String registerUser(User user) throws Exception {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email is already registered!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user directly
        userRepository.save(user);

        // Generate token
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    public String loginUser(String email, String password) throws Exception {

        // Find user by email
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new BadCredentialsException("Invalid email");
        }

        // Authenticate user
        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    private Authentication authenticate(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty() || !passwordEncoder.matches(password, user.get().getPassword())) {
            throw new BadCredentialsException("Invalid email or password!");
        }
        return new UsernamePasswordAuthenticationToken(email, null, null);
    }

    public Optional<User> getUserFromToken(String token) throws Exception {

        // String jwt = token.split(" ")[1];
        String jwt = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found!");
        }
        return user;
    }


    public void deleteUser(String token) throws Exception {
        Optional<User> user= getUserFromToken(token);
        userRepository.deleteById(user.get().getUserId());
    }

    public void updatePassword(String email, String newPassword) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("Email not found!");
        }

        // Update password
        user.get().setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user.get());
    }

    public void updateUserProfile(Long userId, Map<String, String> parameters) {
        // Fetch the user entity from the database
        User user = userRepository.findById(userId).orElseThrow(() -> 
                new IllegalArgumentException("User not found"));

        // Update the user entity based on the provided parameters
        parameters.forEach((key, value) -> {
            switch (key) {
                case "firstName":
                    user.setFirstName(value);
                    break;
                case "lastName":
                    user.setLastName(value);
                    break;
                case "email":
                    user.setEmail(value);
                    break;
                case "password":
                    user.setPassword(value); // Consider encrypting this value
                    break;
                case "gender":
                    user.setGender(Gender.valueOf(value.toUpperCase()));
                    break;
                case "dateOfBirth":
                    user.setDateOfBirth(LocalDate.parse(value)); // Ensure date format is valid
                    break;
                case "yearOfGraduation":
                    user.setYearOfGraduation(Short.parseShort(value));
                    break;
                case "degree":
                    user.setDegree(value);
                    break;
                case "industry":
                    user.setIndustry(value);
                    break;
                case "bio":
                    user.setBio(value);
                    break;
                case "profileImage":
                    user.setProfileImage(value);
                    break;
                default:
                    // Log unknown fields for debugging
                    System.out.println("Unknown field: " + key);
            }
        });

        // Save the updated user entity
        userRepository.save(user);
    }
}
