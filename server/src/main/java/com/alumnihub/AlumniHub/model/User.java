package com.alumnihub.AlumniHub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.alumnihub.AlumniHub.util.ValidPassword;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "User")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Long userId;

    @NotBlank(message = "First name is required")
    @Column(name = "FirstName", nullable = false, length = 100)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(name = "LastName", nullable = false, length = 100)
    private String lastName;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    @Column(name = "Email", nullable = false, length = 150, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password is required")
    @ValidPassword
    @Column(name = "Password", nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "Role")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "Gender")
    private Gender gender;

    @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;

    @NotNull(message = "Year of graduation is required")
    @Column(name = "YearOfGraduation", nullable = false)
    private Short yearOfGraduation;

    @Column(name = "Degree", length = 100)
    private String degree;

    @Column(name = "Industry", length = 100)
    private String industry;

    @Column(name = "ProfileImage", length = 255)
    private String profileImage;

    @Column(name = "Bio", columnDefinition = "TEXT")
    private String bio;
}
