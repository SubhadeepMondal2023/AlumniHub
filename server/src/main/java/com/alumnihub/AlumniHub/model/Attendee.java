package com.alumnihub.AlumniHub.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Attendees")
@Getter
@Setter
public class Attendee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AttendeeId")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "EventId", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "UserId", nullable = false)
    private User user;
}

