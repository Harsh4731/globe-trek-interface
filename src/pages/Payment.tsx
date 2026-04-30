import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    setTimeout(async () => {
      await updateDoc(doc(db, "bookings", id!), {
        status: "Paid",
        paymentMethod: method,
      });

      setLoading(false);
      setSuccess(true);
      toast.success("Payment Successful!");
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center w-[400px]">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful 🎉
          </h1>
          <p className="mb-4 text-gray-600">
            Your trip has been confirmed.
          </p>
          <Button onClick={() => navigate("/my-trips")}>
            Go to My Trips
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg flex overflow-hidden">

          {/* LEFT SIDE - Payment Methods */}
          <div className="w-1/3 bg-gray-100 p-4 space-y-3">
            <div
              className={`p-3 rounded cursor-pointer ${method === "upi" ? "bg-blue-500 text-white" : "bg-white"}`}
              onClick={() => setMethod("upi")}
            >
              UPI
            </div>

            <div
              className={`p-3 rounded cursor-pointer ${method === "card" ? "bg-blue-500 text-white" : "bg-white"}`}
              onClick={() => setMethod("card")}
            >
              Credit / Debit Card
            </div>

            <div
              className={`p-3 rounded cursor-pointer ${method === "netbanking" ? "bg-blue-500 text-white" : "bg-white"}`}
              onClick={() => setMethod("netbanking")}
            >
              Net Banking
            </div>

            <div
              className={`p-3 rounded cursor-pointer ${method === "wallet" ? "bg-blue-500 text-white" : "bg-white"}`}
              onClick={() => setMethod("wallet")}
            >
              Wallet
            </div>
          </div>

          {/* RIGHT SIDE - Form */}
          <div className="w-2/3 p-6">
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>

            {method === "upi" && (
              <div className="space-y-4">
                <Input placeholder="Enter UPI ID (example@upi)" />
                <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? "Processing..." : "Pay via UPI"}
                </Button>
              </div>
            )}

            {method === "card" && (
              <div className="space-y-4">
                <Input placeholder="Card Number" />
                <div className="flex gap-3">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" type="password" />
                </div>
                <Input placeholder="Card Holder Name" />
                <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? "Processing..." : "Pay via Card"}
                </Button>
              </div>
            )}

            {method === "netbanking" && (
              <div className="space-y-4">
                <select className="w-full border rounded p-2">
                  <option>Select Bank</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>Axis Bank</option>
                </select>
                <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? "Processing..." : "Pay via Net Banking"}
                </Button>
              </div>
            )}

            {method === "wallet" && (
              <div className="space-y-4">
                <select className="w-full border rounded p-2">
                  <option>Select Wallet</option>
                  <option>Paytm</option>
                  <option>PhonePe</option>
                  <option>Amazon Pay</option>
                </select>
                <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                  {loading ? "Processing..." : "Pay via Wallet"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;