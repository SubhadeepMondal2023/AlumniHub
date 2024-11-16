package com.alumnihub.AlumniHub.config;


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
import static org.springframework.security.config.Customizer.withDefaults;
import com.alumnihub.AlumniHub.util.JwtTokenValidator;

import java.util.Collections;
import java.util.List;



@Configuration
@EnableWebSecurity
public class AppConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection for stateless authentication
                .cors(cors -> cors.configurationSource(corsConfigarationSource())) // Enable CORS
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Use stateless sessions
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login","/register").permitAll() // Allow public access to login and register
                        .requestMatchers("/api/**").authenticated() // Protect all other API endpoints
                        .anyRequest().permitAll() // Allow other non-API requests
                )
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class) // Add custom JWT validation filter
                .httpBasic(withDefaults()); // Optional: Enable basic authentication for testing (can remove in production)

        return http.build();
    }

    private CorsConfigurationSource corsConfigarationSource() {
        return request -> {
            CorsConfiguration cfg = new CorsConfiguration();
            cfg.setAllowedOrigins(Collections.singletonList("http://your-frontend-domain.com")); // Replace with your frontend domain
            cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            cfg.setAllowedHeaders(List.of("Authorization", "Content-Type"));
            cfg.setExposedHeaders(List.of("Authorization"));
            cfg.setMaxAge(3600L);
            return cfg;
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
