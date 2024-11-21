package com.alumnihub.AlumniHub.util;

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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class JwtTokenValidator extends OncePerRequestFilter {

    @Autowired
    private TokenBlacklistService tokenBlacklistService;

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

                String email = String.valueOf(claims.get("email"));

                // Create an authenticated token (authorities can be extracted if needed)
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, null);

                // Set authentication in the security context
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
