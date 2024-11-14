export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const MARK_AS_READ = 'MARK_AS_READ';
export const SET_FILTER = 'SET_FILTER';

export const fetchNotifications = (notifications) => ({
  type: FETCH_NOTIFICATIONS,
  payload: notifications,
});

export const markAsRead = (id) => ({
  type: MARK_AS_READ,
  payload: id,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
