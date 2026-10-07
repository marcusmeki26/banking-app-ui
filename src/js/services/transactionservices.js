import api from "./api";
const transactionEndpoint = import.meta.env.VITE_TRANSACTION_ENDPOINT;

export const transactionService = {
  getTransactionsByAccountNumber: async (accountNumber) =>{
    const response = await api.get(`${transactionEndpoint}?accountNumber=${accountNumber}`);
    return response;
  }
}