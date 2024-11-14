package com.alumnihub.AlumniHub.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "JobPost")
@Getter
@Setter
public class JobPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "JobId")
    private Long jobId;

    @Column(name = "JobTitle")
    private String jobTitle;

    @Column(name = "Company")
    private String company;

    @Column(name = "Location")
    private String location;

    @Column(name = "JobDescription")
    private String jobDescription;

    @ManyToOne
    @JoinColumn(name = "PostedBy", nullable = false)
    private User postedBy;

    @Column(name = "PostDate")
    private Timestamp postDate;

    @Column(name = "ApplicationDeadline")
    private LocalDate applicationDeadline;

    // other fields or constructors
}
