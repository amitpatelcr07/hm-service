import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAdminReviewPayments, resolveCashPayment } from "../../services/paymentService";

export default function PaymentReviews() {
  const [payments, setPayments] = useState([]), [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { try { setPayments((await getAdminReviewPayments()).data || []); } catch { toast.error("Could not load payment reviews"); } finally { setLoading(false); } })(); }, []);
  const resolve = async (payment) => { const resolution = window.prompt("Enter SUCCESS, FAILED, or REFUNDED:"); const resolutionNote = window.prompt("Enter the required resolution note:"); if (!resolution || !resolutionNote) return; try { await resolveCashPayment(payment.id, { resolution: resolution.toUpperCase(), resolutionNote }); setPayments((current) => current.filter((item) => item.id !== payment.id)); toast.success("Payment resolved"); } catch (error) { toast.error(error.response?.data?.message || "Could not resolve payment"); } };
  if (loading) return <div>Loading payment reviews...</div>;
  return <div className="space-y-6"><div><h1 className="text-3xl font-bold">Cash payment reviews</h1><p className="mt-1 text-gray-500">Only admins can resolve disputed or expired cash payments.</p></div>{payments.length ? payments.map((payment) => <section key={payment.id} className="rounded-xl bg-white p-5 shadow"><p className="font-semibold">{payment.job.title} — ₹{payment.amount}</p><p className="mt-1 text-sm text-gray-600">Customer: {payment.job.customer.fullName} · Status: {payment.status}</p><p className="mt-2 text-sm text-red-700">{payment.disputeReason || "Worker confirmation deadline expired."}</p><button onClick={() => resolve(payment)} className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white">Resolve payment</button></section>) : <div className="rounded-xl bg-white p-8 text-gray-500 shadow">No payments require review.</div>}</div>;
}
