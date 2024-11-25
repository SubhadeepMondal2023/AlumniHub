package com.alumnihub.AlumniHub.repository;

import com.alumnihub.AlumniHub.model.Event;
import com.alumnihub.AlumniHub.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE e.eventDateAndTime = :eventDateAndTime AND e.venue = :venue")
    Optional<Event> findByEventDateAndTimeAndVenue(@Param("eventDateAndTime") LocalDateTime eventDateAndTime, @Param("venue") String venue);

    @Query("SELECT e FROM Event e WHERE e.createdBy = :createdBy AND e.eventName = :eventName")
    Optional<Event> findByCreatedByAndEventName(@Param("createdBy") User createdBy, @Param("eventName") String eventName);

    @Query("SELECT e FROM Event e WHERE e.createdBy = :createdBy")
    List<Event> findByCreatedBy(@Param("createdBy") User createdBy);
}
