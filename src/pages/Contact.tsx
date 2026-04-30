import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    toast.success("Your message has been sent! We'll get back to you soon.");
    reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      subdetails: "Mon-Fri from 8am to 6pm",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@travelease.com",
      subdetails: "Reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Travel Street",
      subdetails: "Adventure City, AC 12345",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Mon - Fri: 8am - 6pm",
      subdetails: "Sat - Sun: 10am - 4pm",
    },
  ];

  return (
    <div className="min-h-screen smooth-scroll">
      <Navbar />
      
      {/* Header */}
      <section className="gradient-hero pt-32 pb-20 text-white">
        <div className="container mx-auto px-4 text-center space-y-4 fade-in">
          <h1 className="text-5xl font-bold">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 -mt-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={info.title}
              className="bg-card rounded-lg shadow-lg p-6 border border-border text-center hover-lift fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                <info.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{info.title}</h3>
              <p className="text-foreground font-medium">{info.details}</p>
              <p className="text-sm text-muted-foreground mt-1">{info.subdetails}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="fade-in">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name">Your Name *</Label>
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

              <div>
                <Label htmlFor="email">Your Email *</Label>
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

              <div>
                <Label htmlFor="message">Your Message *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us how we can help you..."
                  className="mt-2 min-h-[150px]"
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
                Send Message
              </Button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="fade-in-delay-1">
            <h2 className="text-3xl font-bold mb-6">Visit Our Office</h2>
            <div className="bg-muted rounded-lg overflow-hidden shadow-lg h-[400px] lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
