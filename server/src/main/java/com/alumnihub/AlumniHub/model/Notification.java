package com.alumnihub.AlumniHub.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
// import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notification")
@Getter
@Setter
public class Notification {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long notificationId;
    private String message;
    private boolean isRead;

    @ManyToMany
    @JoinTable(
        name = "notification_user", // Join table name
        joinColumns = @JoinColumn(name = "notificationId"), // Join column for Notification
        inverseJoinColumns = @JoinColumn(name = "UserID") // Join column for User
    )
    // private User userId;
    // @ElementCollection
    private List<User> userId=new ArrayList<>(); 
    // private Long userId;
    @CreationTimestamp
    private Date createdAt;
}
