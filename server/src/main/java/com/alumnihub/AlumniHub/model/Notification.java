package com.alumnihub.AlumniHub.model;

import java.sql.Date;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notification")
@Getter
@Setter
public class Notification {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long notificationId;
    
    private String message;
    
    //add userid  as foreign key
    private Long userId;

    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date createdAt;
   

}
