package com.alumnihub.AlumniHub.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "JobApplication")
@Getter
@Setter
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ApplicationId")
    private Long applicationId;

    @ManyToOne
    @JoinColumn(name = "JobId", nullable = false)
    private JobPost job;

    @ManyToOne
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @Column(name = "ApplicationDate")
    private LocalDate applicationDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "ApplicationStatus")
    private ApplicationStatus applicationStatus; // Enums(ApplicationStatus) is separate java file

    // other fields or constructors
}


