package com.alumnihub.AlumniHub.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Notification_User")
@Getter
@Setter
public class NotificationUser {

    @EmbeddedId
    private NotificationUserId id;

    @ManyToOne
    @MapsId("notificationId")
    @JoinColumn(name = "NotificationId")
    @JsonBackReference // Prevent infinite recursion
    private Notification notification;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "UserID")
    @JsonBackReference // Prevent infinite recursion
    private User user;

    @CreationTimestamp
    private Date createdAt;
}
