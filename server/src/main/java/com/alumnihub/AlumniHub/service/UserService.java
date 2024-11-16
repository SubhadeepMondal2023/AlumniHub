package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.util.JwtProvider;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.UserRepository;
import com.alumnihub.AlumniHub.model.LoginRequest;

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

    public String registerUser(User user) throws Exception {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email is already registered!");
        }

        // Encode the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user directly
        userRepository.save(user);

        // Generate token
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    public String loginUser(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

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
      
        String jwt = token.split(" ")[1];
        // token = token.startsWith("Bearer ") ? token.substring(7) : token;
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found!");
        }
        return user;
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
}
