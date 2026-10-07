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
  postAccount: async (accountReq) => {
    const response = await api.post(`${accountEndpoint}`, accountReq)
    return response;
  },
  deposit: async (depositReq) => {
    const response = await api.post(`${accountEndpoint}/deposit`, depositReq);
    return response;
  },
  withdraw: async (withdrawReq) => {
    const response = await api.post(`${accountEndpoint}/withdraw`, withdrawReq);
    return response;
  },
  transfer: async (transferReq) => {
    const response = await api.post(`${accountEndpoint}/transfer`, transferReq);
    return response;
  }
}