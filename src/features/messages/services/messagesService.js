import httpClient from '../../../services/api/httpClient';

export const getConversations = async (search = '') => {
  const response = await httpClient.get('/api/v1/messages/conversations', {
    params: { search }
  });
  return response.data;
};

export const getMessages = async (customerId) => {
  const response = await httpClient.get(`/api/v1/messages/${customerId}`);
  return response.data;
};

export const sendMessage = async (customerId, body) => {
  const response = await httpClient.post('/api/v1/messages/send', {
    customer_id: customerId,
    body
  });
  return response.data;
};

export const markAsRead = async (customerId) => {
  const response = await httpClient.post(`/api/v1/messages/${customerId}/read`);
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await httpClient.get('/api/v1/messages/unread-count');
  return response.data;
};
