import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatWithAI = async (message) => {
  // In production, this would call the backend
  // return await api.post('/chat', { message });
  
  // For now, simulated delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    data: {
      response: "Mock response for: " + message,
      citations: [],
      trace: []
    }
  };
};

export default api;
