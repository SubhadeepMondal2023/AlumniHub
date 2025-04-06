package com.alumnihub.AlumniHub.service;

import com.alumnihub.AlumniHub.model.Attendee;
import com.alumnihub.AlumniHub.model.Event;
import com.alumnihub.AlumniHub.model.User;
import com.alumnihub.AlumniHub.repository.AttendeeRepository;
import com.alumnihub.AlumniHub.repository.EventRepository;
import com.alumnihub.AlumniHub.repository.UserRepository;

import jakarta.transaction.Transactional;

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

    @Autowired
    private NotificationService notificationService; // Inject NotificationService

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

        Event savedEvent = eventRepository.save(event);

        // 🔔 Notify Event Creator
        String title = "Event Created";
        String description = "Your event '" + savedEvent.getEventName() + "' has been created successfully!";
        notificationService.sendNotificationToUser(savedEvent.getCreatedBy(), title, description);

        return savedEvent;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Transactional
    public void deleteEvent(Long eventId) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
    
            // 🔔 Notify Attendees about Cancellation
            List<Attendee> attendees = attendeeRepository.findByEventId(eventId);
            for (Attendee attendee : attendees) {
                notificationService.sendNotificationToUser(attendee.getUser(),
                        "Event Cancelled", "The event '" + event.getEventName() + "' has been cancelled.");
            }
    
            // Delete attendees first
            attendeeRepository.deleteByEventId(eventId);
    
            // Now delete the event
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

            Event updatedEvent = eventRepository.save(event);

            // 🔔 Notify Attendees about Update
            List<Attendee> attendees = attendeeRepository.findByEventId(eventId);
            for (Attendee attendee : attendees) {
                notificationService.sendNotificationToUser(attendee.getUser(),
                        "Event Updated", "The event '" + updatedEvent.getEventName() + "' has been updated.");
            }

            return updatedEvent;
        });
    }

    public Optional<Event> attendEvent(Long eventId, Long userId) {
        return eventRepository.findById(eventId).map(event -> {
            boolean alreadyAttending = attendeeRepository.existsByEventIdAndUserId(eventId, userId);
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            
            if (alreadyAttending) {
                // Remove the user from the attendees
                Attendee attendee = attendeeRepository.findByEventIdAndUserId(eventId, userId)
                        .orElseThrow(() -> new RuntimeException("Attendee not found"));
                attendeeRepository.delete(attendee);

                notificationService.sendNotificationToUser(event.getCreatedBy(),
                        "User Left Event", user.getFirstName() + " has left your event '" + event.getEventName() + "'.");
            } else {
                Attendee attendee = new Attendee();
                attendee.setEvent(event);
                attendee.setUser(user);
                attendeeRepository.save(attendee);

                // 🔔 Notify Event Creator that User Joined
                notificationService.sendNotificationToUser(event.getCreatedBy(),
                        "New Attendee", user.getFirstName() + " is attending your event '" + event.getEventName() + "'.");
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
