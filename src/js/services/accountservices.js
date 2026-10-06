import api from './api';
const accountEndpoint = import.meta.env.VITE_ACCOUNT_ENDPOINT;

export const accountServices = {
  postAccount: async (account) => {
    const response = await api.post(`${accountEndpoint}`, account)
    return response;
  }
}