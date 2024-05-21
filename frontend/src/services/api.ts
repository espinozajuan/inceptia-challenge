import axios from 'axios';

const API_URL = 'https://admindev.inceptia.ai/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/login/', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const fetchClients = async () => {
  try {
    const response = await api.get('/clients/');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch clients');
  }
};

export const fetchInboundCases = async (
  clientId: number,
  fromDate: string,
  toDate: string
) => {
  try {
    const response = await api.get(`/inbound-case/`, {
      params: {
        bot: clientId,
        local_updated__date__gte: fromDate,
        local_updated__date__lte: toDate,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch inbound cases');
  }
};

export default api;
