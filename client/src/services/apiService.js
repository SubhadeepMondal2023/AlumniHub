import axios from 'axios';

const API_URL = 'http://api-url.com';

// Notifications API
export const getNotifications = async () => {
  const response = await axios.get(`${API_URL}/notifications`);
  return response.data;
};

export const markNotificationAsRead = async (id) => {
  await axios.put(`${API_URL}/notifications/${id}/read`);
};

// Alumni API
export const getAlumni = async (params) => {
  const response = await axios.get(`${API_URL}/alumni`, { params });
  return response.data;
};
