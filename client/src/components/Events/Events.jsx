import React, { useState } from 'react';
import '../../css/events.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetMyProfileQuery } from '../../redux/api/authSlice';
import { useGetEventsQuery, useAttendEventMutation } from '../../redux/api/eventApiSlice';

const Events = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetMyProfileQuery();
  const { data: eventsData, error, isLoading, refetch } = useGetEventsQuery();
  const [attendEvent] = useAttendEventMutation();
  const [showAttendees, setShowAttendees] = useState({});

  const toggleAttendees = (eventId) => {
    setShowAttendees((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const isUserAttendee = (event) => {
    if (!userData?.data?.userId || !event.attendees) return false;
    return event.attendees.some((attendee) => attendee.user.userId === userData.data.userId);
  };

  const handleAttendEvent = async (eventId) => {
    try {
      await attendEvent(eventId).unwrap();
      toast.success('Successfully registered for the event!');
      refetch();
    } catch (err) {
      toast.error(err.data?.message || 'Failed to attend event');
    }
  };

  if (isLoading) return <div className="events-container"><div className="loading">Loading events...</div></div>;
  if (error) return <div className="events-container"><div className="error"><p>Error loading events</p></div></div>;

  return (
    <div className="events-container">
      <h1 className="events-title">Upcoming Events</h1>
      <div className="events-grid">
        {eventsData?.data?.map((event) => {
          const isAttendee = isUserAttendee(event);
          return (
            <div key={event.id} className="event-card">
              <div className="event-content">
                <h2 className="event-title">{event.eventName}</h2>
                <div className="event-details">
                  <p><strong>Date:</strong> {new Date(event.eventDateAndTime).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date(event.eventDateAndTime).toLocaleTimeString()}</p>
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Description:</strong> {event.eventDescription}</p>
                  <p><strong>Organized by:</strong> {event.createdBy.firstName} {event.createdBy.lastName}</p>
                  <p><strong>Status:</strong> {event.eventStatus}</p>
                </div>
                <div className="event-footer">
                  <div className="event-actions">
                    <button className={`attend-button ${isAttendee ? 'disabled' : ''}`} onClick={() => handleAttendEvent(event.id)} disabled={isAttendee}>
                      {isAttendee ? 'Already Attending' : 'Attend Event'}
                    </button>
                    <button className="view-attendees-button" onClick={() => toggleAttendees(event.id)}>
                      {showAttendees[event.id] ? 'Hide Attendees' : 'View Attendees'}
                    </button>
                    <span className="attendees-count">{event.attendees?.length || 0} attendees</span>
                  </div>
                </div>
                {showAttendees[event.id] && event.attendees && event.attendees.length > 0 && (
                  <div className="attendees-list">
                    <h3>Attendees</h3>
                    <ul>
                      {event.attendees.map((attendee) => (
                        <li key={attendee.id}>
                          <span className="attendee-name">
                            {attendee.user.firstName} {attendee.user.lastName}
                          </span>
                          <span className="attendee-role">
                            {attendee.user.role}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
