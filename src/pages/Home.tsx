import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import TestimonialCard from "@/components/TestimonialCard";
import WhyChooseUsCard from "@/components/WhyChooseUsCard";
import { Button } from "@/components/ui/button";
import { DollarSign, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import switzerlandImage from "@/assets/switzerland.jpg";
import dubaiImage from "@/assets/dubai.jpg";
import maldivesImage from "@/assets/maldives.jpg";
import parisImage from "@/assets/paris.jpg";

const Home = () => {
  const destinations = [
    {
      image: santoriniImage,
      name: "Santorini, Greece",
      description: "Experience the stunning sunsets and white-washed buildings of this iconic Greek island.",
      price: "₹1,09,999",
    },
    {
      image: baliImage,
      name: "Bali, Indonesia",
      description: "Discover lush rice terraces, ancient temples, and pristine beaches in paradise.",
      price: "₹74,999",
    },
    {
      image: switzerlandImage,
      name: "Swiss Alps",
      description: "Adventure awaits in the majestic mountains with breathtaking alpine views.",
      price: "₹1,49,999",
    },
    {
      image: dubaiImage,
      name: "Dubai, UAE",
      description: "Experience luxury and innovation in this modern marvel of the Middle East.",
      price: "₹34,999",
    },
    {
      image: maldivesImage,
      name: "Maldives",
      description: "Relax in overwater bungalows surrounded by crystal-clear turquoise waters.",
      price: "₹1,79,999",
    },
    {
      image: parisImage,
      name: "Paris, France",
      description: "Fall in love with the City of Light, where romance and culture intertwine.",
      price: "$1,499",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      review: "Best travel experience ever! The guides were professional, and every detail was perfect. Highly recommend TravelEase!",
    },
    {
      name: "Michael Chen",
      location: "Singapore",
      rating: 5,
      review: "Amazing value for money. The package was well-organized, and we got to see everything we wanted without any hassle.",
    },
    {
      name: "Emily Rodriguez",
      location: "Madrid, Spain",
      rating: 5,
      review: "From booking to the trip itself, everything was seamless. The team made our dream vacation a reality!",
    },
  ];

  const whyChooseUs = [
    {
      icon: DollarSign,
      title: "Affordable Prices",
      description: "Get the best deals on travel packages without compromising on quality and experience.",
    },
    {
      icon: Shield,
      title: "Trusted Guides",
      description: "Our experienced guides ensure your safety and provide insights into local culture.",
    },
    {
      icon: Sparkles,
      title: "Comfortable Trips",
      description: "Enjoy handpicked accommodations and smooth transportation throughout your journey.",
    },
  ];

  return (
    <div className="min-h-screen smooth-scroll">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4 space-y-6 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-shadow-sm">
            Explore the World With Us
          </h1>
          <p className="text-xl md:text-2xl text-shadow-sm max-w-2xl mx-auto">
            Discover amazing destinations and create unforgettable memories
          </p>
          <div className="flex gap-4 justify-center fade-in-delay-1">
            <Link to="/packages">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View Packages
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of the world's most beautiful and exciting travel destinations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.name} {...dest} delay={index * 0.1} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing exceptional travel experiences tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <WhyChooseUsCard key={item.title} {...item} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from our satisfied customers who have experienced unforgettable journeys
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} {...testimonial} delay={index * 0.1} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="container mx-auto px-4 text-center space-y-6 fade-in">
          <h2 className="text-4xl font-bold">Ready to Start Your Adventure?</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Book your dream vacation today and create memories that will last a lifetime
          </p>
          <Link to="/booking">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Book Your Trip Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
