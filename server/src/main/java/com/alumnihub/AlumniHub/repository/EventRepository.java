package com.alumnihub.AlumniHub.repository;

import com.alumnihub.AlumniHub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query
    Optional<Event> findByEventDateAndTimeAndVenue(LocalDateTime eventDateAndTime, String venue); // Corrected field name
    @Query
    Optional<Event> findByCreatedByAndEventName(Long createdBy, String eventName);
    @Query
    List<Event> findByCreatedBy(Long createdBy);
}
