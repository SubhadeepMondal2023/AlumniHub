import { FETCH_NOTIFICATIONS, MARK_AS_READ, SET_FILTER } from '../../redux/actions/notificationActions.js';

const initialState = {
  notifications: [],
  filter: 'all', // options: 'all', 'unread', 'jobs', 'groups'
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return { ...state, notifications: action.payload };
    case MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.NotificationID === action.payload
            ? { ...notification, Status: 'Read' }
            : notification
        ),
      };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default notificationReducer;
