import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import "../../css/notification.css"; 
import { fetchNotifications, markAsRead } from "../../redux/actions/notificationActions";

const NotificationItem = ({ item, index }) => {
  const { message, notificationDate, status } = item;
  return (
    <Row className="align-items-center notification-item mb-4">
      <Col xs={12} md={8} className="notification-content">
        <h5 className="fw-bold">{message}</h5>
        <p className="text-muted">Date: {new Date(notificationDate).toLocaleString()}</p>
        <p className={`status ${status.toLowerCase()}`}>Status: {status}</p>
      </Col>
      <Col xs="auto" className="text-center">
        {status === "Unread" && (
          <Button
            variant="primary"
            className="mark-read-button"
            onClick={() => markAsRead(item.notificationID)}
          >
            Mark as Read
          </Button>
        )}
      </Col>
    </Row>
  );
};

NotificationItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const NotificationList = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <section className="notifications-section light">
      <Container>
        <Row className="justify-content-center text-center mb-5">
          <Col xs={12} md={8}>
            <h2 className="notifications-heading fw-bold mb-4">Notifications</h2>
            <p className="notifications-sub-heading">
              Stay updated with the latest notifications from the Alumni Hub. Mark your notifications as read to keep track.
            </p>
          </Col>
        </Row>

        {notifications.map((item, i) => (
          <NotificationItem key={i} item={item} index={i} />
        ))}

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
