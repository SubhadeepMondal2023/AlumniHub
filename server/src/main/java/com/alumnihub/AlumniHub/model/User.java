package com.alumnihub.AlumniHub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Table(name = "User")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Long userId;

    @Column(name = "FirstName", nullable = false, length = 100)
    private String firstName;

    @Column(name = "LastName", nullable = false, length = 100)
    private String lastName;

    @Column(name = "Email", nullable = false, length = 150, unique = true)
    private String email;

    @Column(name = "Password", nullable = false, length = 255)
    private String password;

    // Enums(Role, Gender) used in the User model are separate enum java files in model directory
    @Enumerated(EnumType.STRING)
    @Column(name = "Role", nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "Gender", nullable = false)
    private Gender gender;

    @Column(name = "DateOfBirth", nullable = false)
    private LocalDate dateOfBirth;

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

    // other methods
}




