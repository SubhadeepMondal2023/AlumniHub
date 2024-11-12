// package com.alumnihub.AlumniHub.model;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.Table;
// import java.sql.Timestamp;
// import java.time.LocalDate;
// import lombok.Getter;
// import lombok.Setter;

// @Entity
// @Table(name = "JobPost")
// @Getter
// @Setter
// public class JobPost {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private int jobId;

//     private String jobTitle;
//     private String company;
//     private String location;
//     private String jobDescription;

//     @ManyToOne
//     @JoinColumn(name = "postedBy", nullable = false)
//     private User postedBy;

//     private Timestamp postDate;
//     private LocalDate applicationDeadline;

//     // Getters, setters, and constructors
// }
