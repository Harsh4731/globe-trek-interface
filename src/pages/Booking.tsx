import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  destination: z.string().min(1, "Please select a destination"),
  travelers: z.string().min(1, "Please enter number of travelers"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const Booking = () => {
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const destination = watch("destination");

  const destinations = [
    "Santorini, Greece",
    "Bali, Indonesia",
    "Swiss Alps",
    "Dubai, UAE",
    "Maldives",
    "Paris, France",
    "Mediterranean Cruise",
    "Asian Highlights",
    "European Explorer",
  ];

  const onSubmit = (data: BookingFormData) => {
    if (!date) {
      toast.error("Please select a travel date");
      return;
    }
    console.log({ ...data, date });
    setIsSubmitted(true);
    toast.success("Your booking request has been sent!");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen smooth-scroll">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-2xl mx-auto text-center space-y-6 fade-in">
            <div className="inline-flex p-6 rounded-full bg-primary/10">
              <CheckCircle2 className="h-20 w-20 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Booking Request Sent!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for choosing TravelEase. Our team will contact you shortly to confirm your booking details.
            </p>
            <Button onClick={() => setIsSubmitted(false)} size="lg" className="bg-primary hover:bg-primary/90">
              Make Another Booking
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen smooth-scroll">
      <Navbar />
      
      {/* Header */}
      <section className="gradient-hero pt-32 pb-20 text-white">
        <div className="container mx-auto px-4 text-center space-y-4 fade-in">
          <h1 className="text-5xl font-bold">Book Your Trip</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Fill out the form below and let us plan your perfect getaway
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container mx-auto px-4 -mt-8 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border fade-in">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="John Doe"
                  className="mt-2"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className="mt-2"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Contact Number *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+1 (555) 123-4567"
                  className="mt-2"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Destination */}
              <div>
                <Label htmlFor="destination">Destination *</Label>
                <Select value={destination} onValueChange={(value) => setValue("destination", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    {destinations.map((dest) => (
                      <SelectItem key={dest} value={dest}>
                        {dest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.destination && (
                  <p className="text-destructive text-sm mt-1">{errors.destination.message}</p>
                )}
              </div>

              {/* Travel Date */}
              <div>
                <Label>Travel Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-popover border-border z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Number of Travelers */}
              <div>
                <Label htmlFor="travelers">Number of Travelers *</Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  {...register("travelers")}
                  placeholder="2"
                  className="mt-2"
                />
                {errors.travelers && (
                  <p className="text-destructive text-sm mt-1">{errors.travelers.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                Submit Booking Request
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
