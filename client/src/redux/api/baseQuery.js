import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isTokenValid } from '../../utils/jwtValidator';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: 'https://alumnihub-production.up.railway.app',
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