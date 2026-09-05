import api from "../api/axios";

export const getPayments = async () => (await api.get("/payments")).data;
export const createPayment = async (data) => (await api.post("/payments", data)).data;
export const confirmCashPayment = async (id) => (await api.post(`/payments/${id}/cash/customer-confirm`)).data;
export const getWorkerCashPayments = async () => (await api.get("/payments/worker")).data;
export const workerConfirmCashPayment = async (id) => (await api.post(`/payments/${id}/cash/worker-confirm`)).data;
export const disputeCashPayment = async (id, disputeReason) => (await api.post(`/payments/${id}/cash/dispute`, { disputeReason })).data;
export const getPaymentReceipt = async (id) => (await api.get(`/payments/${id}/receipt`)).data;
export const getAdminReviewPayments = async () => (await api.get("/payments/admin/review")).data;
export const resolveCashPayment = async (id, data) => (await api.post(`/payments/${id}/cash/resolve`, data)).data;
