import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  destination: z.string().min(1),
  travelers: z.string().min(1),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Booking = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    return () => unsubscribe();
  }, []);

  const { register, handleSubmit } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      await addDoc(collection(db, "bookings"), {
        ...data,
        userId: auth.currentUser?.uid,
        createdAt: new Date(),
        status: "Pending",   // ✅ important
      });

      toast.success("Booking Created!");
      setIsSubmitted(true);
    } catch {
      toast.error("Error creating booking");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Booking Created Successfully!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Book Your Trip</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Name" {...register("name")} />
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Phone" {...register("phone")} />
          <Input placeholder="Destination" {...register("destination")} />
          <Input placeholder="Travelers" {...register("travelers")} />

          <Button type="submit" className="w-full">
            Submit Booking
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;