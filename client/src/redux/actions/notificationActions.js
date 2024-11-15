import { getNotifications, markNotificationAsRead } from '../../services/apiService';

export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const MARK_AS_READ = 'MARK_AS_READ';
export const SET_FILTER = 'SET_FILTER';


export const fetchNotifications = () => async (dispatch) => {
  try {
    const data = await getNotifications();
    dispatch({
      type: FETCH_NOTIFICATIONS,
      payload: data,
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};


export const markAsRead = (id) => async (dispatch) => {
  try {
    await markNotificationAsRead(id);
    dispatch({
      type: MARK_AS_READ,
      payload: id,
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};


export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
