package com.alumnihub.AlumniHub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "AlumniDetails")
@Getter
@Setter
public class Alumni {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AlumniId")
    private Long alumniId;

    @OneToOne
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Address")
    private String address;

    @Column(name = "LinkedInProfile")
    private String linkedInProfile;

    @Column(name = "CurrentCompany")
    private String currentCompany;

    @Column(name = "Designation")
    private String designation;

    @Column(name = "Location")
    private String location;

    @Column(name = "YoE")
    @Min(0)
    @Max(99)
    private Integer yoe;

}