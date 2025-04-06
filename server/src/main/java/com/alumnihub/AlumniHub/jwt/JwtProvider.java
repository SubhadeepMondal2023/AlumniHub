package com.alumnihub.AlumniHub.jwt;

import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.UserRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class JwtProvider {

    private final SecretKey key = Keys.hmacShaKeyFor(JwtConstant.JWT_SECRET.getBytes(StandardCharsets.UTF_8));
    private final UserRepository userRepository;

    public JwtProvider(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generateToken(Authentication auth) {
        String email = auth.getName();

        return Jwts.builder()
                .setSubject(email)
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(7)))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractClaims(String jwt) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jwt)
                    .getBody();
        } catch (JwtException e) {
            System.err.println("Error parsing JWT: " + e.getMessage());
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public String getEmailFromJwtToken(String jwt) {
        return extractClaims(jwt).get("email", String.class);
    }

    public String getRoleFromJwtToken(String jwt) {
        String email = getEmailFromJwtToken(jwt);
        
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found!");
        }
        
        return user.get().getRole().toString(); // Fetching role from database
    }
}
