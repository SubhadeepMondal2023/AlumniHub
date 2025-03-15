package com.alumnihub.AlumniHub.model;

import java.sql.Timestamp; // Use java.sql.Timestamp instead of java.security.Timestamp
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Notification")
@Getter
@Setter
public class Notification {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "NotificationID", nullable = false)
    private Long NotificationID;

    @Column(name = "Title", nullable = false)
    private String Title;

    @Column(name = "Description", nullable = false)
    private String Description;

    @Column(name = "Status", nullable = false)
    private String Status;

    @Column(name = "User ID", nullable = false) // Change back to Long
    private Long UserID; // Keep this as Long

    @Column(name = "CreatedAt") // Add @Column annotation for CreatedAt
    private Timestamp CreatedAt;

    // If you want to keep the relationship, you can add a ManyToOne relationship
    @ManyToOne
    @JoinColumn(name = "User ID", insertable = false, updatable = false) // Use insertable and updatable false
    private User user; // Optional: This is for convenience if you want to access the User entity directly

    public String toString() {
        return "Notification{" +
                "NotificationID=" + NotificationID +
                ", Title='" + Title + '\'' +
                ", Description='" + Description + '\'' +
                ", Status='" + Status + '\'' +
                ", UserID=" + UserID +
                ", CreatedAt=" + CreatedAt +
                '}';
    }
}