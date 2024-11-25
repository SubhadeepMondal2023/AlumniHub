package com.alumnihub.AlumniHub.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notification_user")
@Getter
@Setter
public class NotificationUser {

    @EmbeddedId
    private NotificationUserId id;

    @ManyToOne
    @MapsId("notificationId")
    @JoinColumn(name = "notificationId")
    private Notification notification;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "userId")
    private User user;
}
