package com.alumnihub.AlumniHub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;

@Entity
@Table(name = "Events")
@Getter
@Setter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EventId")
    private Long id;

    @Column(name = "EventName", nullable = false)
    private String eventName;

    @Column(name = "EventDescription")
    private String eventDescription;

    @Column(name = "EventDateAndTime", nullable = false)
    private LocalDateTime eventDateAndTime;

    @Column(name = "Venue", nullable = false)
    private String venue;

    @ManyToOne
    @JoinColumn(name = "CreatedBy", nullable = false)
    private User createdBy;

    @Column(name = "EventStatus")
    private String eventStatus;

    @OneToMany(mappedBy = "event")
    private List<Attendee> attendees = new ArrayList<>();
}
