package com.alumnihub.AlumniHub.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode
public class NotificationUserId implements Serializable {

    private Long notificationId;
    private Long userId;

    // Default constructor
    public NotificationUserId() {}

    // Parameterized constructor
    public NotificationUserId(Long notificationId, Long userId) {
        this.notificationId = notificationId;
        this.userId = userId;
    }

    // Getters and setters
    public Long getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Long notificationId) {
        this.notificationId = notificationId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}

