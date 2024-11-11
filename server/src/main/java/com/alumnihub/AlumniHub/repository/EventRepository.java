package com.alumnihub.AlumniHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alumnihub.AlumniHub.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByCreatedBy(String userId);
    
}
