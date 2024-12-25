package com.alumnihub.AlumniHub.model;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "donations")
@Getter
@Setter
@ToString
public class Donation {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long donationId;

   @ManyToOne 
   @JoinColumn(name="UserID")
    private User userId;
    
    @CreationTimestamp
    private Date donationDate;
    private Double amount;
    private String purpose;
    private String transactionId;

    // Define fields for Donation based on routes and database

    // Getters and Setters
}
