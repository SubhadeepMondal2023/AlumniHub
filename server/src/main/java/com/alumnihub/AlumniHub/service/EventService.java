package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.model.Attendee;
import com.alumnihub.AlumniHub.model.Event;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.AttendeeRepository;
import com.alumnihub.AlumniHub.repository.EventRepository;
import com.alumnihub.AlumniHub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId);
    }

    public Event createEvent(Event event) throws Exception {
        Optional<Event> existingEventByDateAndVenue = eventRepository
                .findByEventDateAndTimeAndVenue(event.getEventDateAndTime(), event.getVenue());
        if (existingEventByDateAndVenue.isPresent()) {
            throw new Exception("An event at the same time and venue already exists.");
        }
        Optional<Event> existingEventByUserAndName = eventRepository.findByCreatedByAndEventName(event.getCreatedBy(),
                event.getEventName());
        if (existingEventByUserAndName.isPresent()) {
            throw new Exception("An event with the same name by the same user already exists.");
        }
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public void deleteEvent(Long eventId) {
        if (eventRepository.existsById(eventId)) {
            eventRepository.deleteById(eventId);
        } else {
            throw new RuntimeException("Event not found");
        }
    }

    public Optional<Event> updateEvent(Long eventId, Event eventDetails) {
        return eventRepository.findById(eventId).map(event -> {
            if (eventDetails.getEventName() != null) {
                event.setEventName(eventDetails.getEventName());
            }
            if (eventDetails.getEventDescription() != null) {
                event.setEventDescription(eventDetails.getEventDescription());
            }
            if (eventDetails.getEventDateAndTime() != null) {
                event.setEventDateAndTime(eventDetails.getEventDateAndTime());
            }
            if (eventDetails.getVenue() != null) {
                event.setVenue(eventDetails.getVenue());
            }
            if (eventDetails.getCreatedBy() != null) {
                event.setCreatedBy(eventDetails.getCreatedBy());
            }
            if (eventDetails.getEventStatus() != null) {
                event.setEventStatus(eventDetails.getEventStatus());
            }
            return eventRepository.save(event);
        });
    }

    public Optional<Event> attendEvent(Long eventId, Long userId) {
        return eventRepository.findById(eventId).map(event -> {
            boolean alreadyAttending = attendeeRepository.existsByEventIdAndUserId(eventId, userId);
            if (!alreadyAttending) {
                User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
                Attendee attendee = new Attendee();
                attendee.setEvent(event);
                attendee.setUser(user);
                attendeeRepository.save(attendee);
            }
            return event;
        });
    }

    public List<Attendee> getEventAttendees(Long eventId) {
        return attendeeRepository.findByEventId(eventId);
    }

    public List<Event> getMyEvents(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return eventRepository.findByCreatedBy(user);
    }
}
