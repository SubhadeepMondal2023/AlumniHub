import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../css/notification.css";
import { useGetNotificationsQuery, useMarkAsReadMutation, useDeleteNotificationMutation } from "../../redux/api/notificationsApiSlice";

const NotificationItem = ({ item, isAdmin, onMarkAsRead, onMarkAsUnread, onDelete }) => {
  return (
    <Row className="align-items-center notification-item mb-4">
      <Col xs={12} md={8} className="notification-content">
        <h5 className="fw-bold">{item.Message}</h5>
        <p className="text-muted">Date: {new Date(item.NotificationDate).toLocaleString()}</p>
        <p className={`status ${item.Status.toLowerCase()}`}>Status: {item.Status}</p>
      </Col>
      <Col xs="auto" className="text-center">
        {item.Status === "Unread" ? (
          <Button variant="primary" className="mark-read-button me-2" onClick={() => onMarkAsRead(item.NotificationID)}>
            Mark as Read
          </Button>
        ) : (
          <Button variant="warning" className="mark-read-button me-2" onClick={() => onMarkAsUnread(item.NotificationID)}>
            Mark as Unread
          </Button>
        )}
        {isAdmin && (
          <Button variant="danger" className="delete-button" onClick={() => onDelete(item.NotificationID)}>
            Delete
          </Button>
        )}
      </Col>
    </Row>
  );
};

NotificationItem.propTypes = {
  item: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
  onMarkAsUnread: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const NotificationList = () => {
  const isAdmin = true;
  const { data: notifications, isLoading, isError } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
  };

  const handleMarkAsUnread = async (id) => {
    // Handle marking as unread if API supports it.
  };

  const handleDeleteNotification = async (id) => {
    await deleteNotification(id);
  };

  if (isLoading) return <p>Loading notifications...</p>;
  if (isError) return <p>Error loading notifications.</p>;

  return (
    <section className="notifications-section light">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col xs={12} md={8}>
            <h2 className="notifications-heading fw-bold mb-4">Notifications</h2>
            <p className="notifications-sub-heading" style={{ color: "black" }}>
              Stay updated with the latest notifications from Alumni Hub. Mark your notifications as read to keep track.
            </p>
          </Col>
        </Row>

        {notifications?.length > 0 ? (
          notifications.map((item) => (
            <NotificationItem key={item.NotificationID} item={item} isAdmin={isAdmin} onMarkAsRead={handleMarkAsRead} onMarkAsUnread={handleMarkAsUnread} onDelete={handleDeleteNotification} />
          ))
        ) : (
          <Row className="text-center">
            <Col>
              <p className="text-muted">No notifications available.</p>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center mt-5">
          <Col xs="auto">
            <Button className="view-all-button" href="/notifications">
              View All Notifications
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NotificationList;
