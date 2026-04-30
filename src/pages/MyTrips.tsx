import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const MyTrips = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "bookings"),
        where("userId", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(q);

      const userTrips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTrips(userTrips);
    };

    fetchTrips();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
      toast.success("Booking cancelled");
    } catch {
      toast.error("Error cancelling booking");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <h1 className="text-3xl font-bold mb-6">My Trips</h1>

        {trips.map((trip) => (
          <div key={trip.id} className="border p-4 mb-4 rounded">
            <p><strong>Destination:</strong> {trip.destination}</p>
            <p><strong>Status:</strong> 
              <span className={trip.status === "Paid" ? "text-green-600" : "text-yellow-600"}>
                {" "}{trip.status}
              </span>
            </p>

            {trip.status === "Pending" && (
              <button
                onClick={() => navigate(`/payment/${trip.id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Pay Now
              </button>
            )}

            <button
              onClick={() => handleCancel(trip.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MyTrips;