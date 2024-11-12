package com.alumnihub.AlumniHub.repository;

import com.alumnihub.AlumniHub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    // Custom Query 1: Find Event by Event Date and Venue
    @Query("SELECT e FROM Event e WHERE e.eventDateAndTime = :eventDateAndTime AND e.venue = :venue")
    Optional<Event> findByEventDateAndTimeAndVenue(@Param("eventDateAndTime") LocalDateTime eventDateAndTime,
                                                   @Param("venue") String venue);

    // Custom Query 2: Find Event by CreatedBy (User ID) and Event Name
    @Query("SELECT e FROM Event e WHERE e.createdBy = :createdBy AND e.eventName = :eventName")
    Optional<Event> findByCreatedByAndEventName(@Param("createdBy") Long createdBy,
                                                @Param("eventName") String eventName);

    // Custom Query 3: Find All Events by CreatedBy (User ID)
    @Query("SELECT e FROM Event e WHERE e.createdBy = :createdBy")
    List<Event> findByCreatedBy(@Param("createdBy") Long createdBy);
}
