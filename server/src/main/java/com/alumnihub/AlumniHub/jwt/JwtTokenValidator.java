package com.alumnihub.AlumniHub.jwt;

import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Component
public class JwtTokenValidator extends OncePerRequestFilter {

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7); // Remove "Bearer " prefix

            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.JWT_SECRET.getBytes(StandardCharsets.UTF_8));
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                // Check if the token is blacklisted
                if (tokenBlacklistService.isTokenBlacklisted(jwt)) {
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    return;
                }

                String email = claims.get("email", String.class);

                if (email == null) {
                    throw new BadCredentialsException("Invalid Token: Missing email claim");
                }

                // Fetch user role from database
                Optional<User> user = userRepository.findByEmail(email);
                if (user.isEmpty()) {
                    throw new BadCredentialsException("Invalid Token: User not found");
                }

                String role = user.get().getRole().toString();

                // Create authentication token with the role from database
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null,
                        List.of(authority));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                // Log the exception for debugging
                System.err.println("Invalid Token: " + e.getMessage());
                throw new BadCredentialsException("Invalid Token", e);
            }
        }

        // Continue the filter chain for all requests
        filterChain.doFilter(request, response);
    }
}
