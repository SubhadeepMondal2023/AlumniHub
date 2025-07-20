package com.alumnihub.AlumniHub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import com.alumnihub.AlumniHub.jwt.JwtTokenValidator;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class AppConfig {

    @Value("${ALLOWED_ORIGINS:http://localhost:5173,http://localhost:8081,https://alumni-hub-rose.vercel.app}") // Default for React & Flutter web
    private String allowedOrigins;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtTokenValidator jwtTokenValidator) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless authentication
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable dynamic CORS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Use stateless sessions
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() 
                        .requestMatchers("/api/**").authenticated() 
                        .anyRequest().permitAll() 
                )
                .addFilterBefore(jwtTokenValidator, BasicAuthenticationFilter.class) // Add custom JWT validation filter
                .httpBasic(withDefaults()); // Optional: Enable basic authentication for testing (can remove in production)

        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration cfg = new CorsConfiguration();
            cfg.setAllowedOrigins(Arrays.asList(allowedOrigins.split(","))); // Support multiple frontend origins
            cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            cfg.setAllowedHeaders(List.of("Authorization", "Content-Type"));
            cfg.setExposedHeaders(List.of("Authorization"));
            cfg.setAllowCredentials(true); // Allow cookies if needed
            cfg.setMaxAge(3600L); // Cache the CORS response for 1 hour
            return cfg;
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
