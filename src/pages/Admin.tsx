import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const ADMIN_EMAIL = "harshsolanki4731@gmail.com";

const Admin = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();

  // 🔐 Protect Admin Route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== ADMIN_EMAIL) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  // 📥 Fetch All Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));

      const allBookings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(allBookings);
    };

    fetchBookings();
  }, []);

  // ❌ Delete Booking
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      toast.success("Booking removed by admin");
    } catch {
      toast.error("Error deleting booking");
    }
  };

  const totalTravelers = bookings.reduce(
    (sum, booking) => sum + Number(booking.travelers),
    0
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Admin Dashboard 👑
        </h1>

        <div className="mb-8 text-center space-y-2">
          <p className="text-lg font-semibold">
            Total Bookings: {bookings.length}
          </p>
          <p className="text-lg font-semibold">
            Total Travelers: {totalTravelers}
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 border rounded-xl shadow bg-white"
            >
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Destination:</strong> {booking.destination}</p>
              <p><strong>Travelers:</strong> {booking.travelers}</p>
              <p><strong>User ID:</strong> {booking.userId}</p>

              <button
                onClick={() => handleDelete(booking.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete Booking
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;