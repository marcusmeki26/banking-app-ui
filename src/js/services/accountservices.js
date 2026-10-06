import api from './api';
const accountEndpoint = import.meta.env.VITE_ACCOUNT_ENDPOINT;

export const accountServices = {
  getBalance: async (accountNumber) =>{
    const response = await api.get(`${accountEndpoint}/${accountNumber}`);
    return response;
  },
  getAllAccounts: async () => {
    const response = await api.get(`${accountEndpoint}`);
    return response;
  },
  postAccount: async (account) => {
    const response = await api.post(`${accountEndpoint}`, account)
    return response;
  }
}