package com.alumnihub.AlumniHub.repository;

import com.alumnihub.AlumniHub.model.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Attendee a WHERE a.event.id = :eventId AND a.user.userId = :userId")
    boolean existsByEventIdAndUserId(@Param("eventId") Long eventId, @Param("userId") Long userId);

    @Query("SELECT a FROM Attendee a WHERE a.event.id = :eventId AND a.user.userId = :userId")
    Optional<Attendee> findByEventIdAndUserId(@Param("eventId") Long eventId, @Param("userId") Long userId);

    List<Attendee> findByEventId(Long eventId);
}
