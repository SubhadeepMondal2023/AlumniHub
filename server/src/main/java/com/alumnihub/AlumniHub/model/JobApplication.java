// package com.alumnihub.AlumniHub.model;

// import java.time.LocalDate;

// import jakarta.persistence.Entity;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
// import lombok.Getter;
// import lombok.Setter;

// @Entity
// @Table(name = "JobApplication")
// @Getter
// @Setter
// public class JobApplication {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private int id;

//     @ManyToOne
//     @JoinColumn(name = "jobId", nullable = false)
//     private JobPost job;

//     @ManyToOne
//     @JoinColumn(name = "userId", nullable = false)
//     private User user;

//     private LocalDate applicationDate;

//     @Enumerated(EnumType.STRING)
//     private ApplicationStatus applicationStatus; // Enums(ApplicationStatus) is separate java file

//     // Getters, setters, and constructors
// }


