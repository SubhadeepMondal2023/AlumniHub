package com.alumnihub.AlumniHub.model;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Donations")
@Getter
@Setter
@ToString
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationId;

    // Many donations can be made by one user
    @ManyToOne(optional = false) // optional=false makes user mandatory
    @JoinColumn(name = "UserId", nullable = false) // Ensure foreign key is not null
    @ToString.Exclude // Avoid recursion in toString
    private User user;

    @CreationTimestamp // Automatically set when persisted
    private Date donationDate;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private Double amount;

    @NotBlank(message = "Purpose is required")
    private String purpose;

    @NotBlank(message = "Transaction ID is required")
    private String transactionId;
}
