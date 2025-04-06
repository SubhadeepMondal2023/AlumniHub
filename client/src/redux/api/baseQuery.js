import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isTokenValid } from '../../utils/jwtValidator';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  //credentials: 'include',
  prepareHeaders: (headers, { url }) => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      headers.set('Authorization', `Bearer ${token}`);
    } else {
      localStorage.removeItem('token');
    }
    return headers;
  },
}); 