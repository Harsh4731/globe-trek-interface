import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/PackageCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import switzerlandImage from "@/assets/switzerland.jpg";
import dubaiImage from "@/assets/dubai.jpg";
import maldivesImage from "@/assets/maldives.jpg";
import parisImage from "@/assets/paris.jpg";

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const packages = [
    { image: santoriniImage, destination: "Santorini, Greece", duration: "5 Days 4 Nights", price: "₹1,09,999", priceValue: 109999 },
    { image: baliImage, destination: "Bali, Indonesia", duration: "6 Days 5 Nights", price: "₹74,999", priceValue: 74999 },
    { image: switzerlandImage, destination: "Swiss Alps Adventure", duration: "7 Days 6 Nights", price: "₹1,49,999", priceValue: 149999 },
    { image: dubaiImage, destination: "Dubai Luxury Tour", duration: "4 Days 3 Nights", price: "₹34,999", priceValue: 34999 },
    { image: maldivesImage, destination: "Maldives Paradise", duration: "5 Days 4 Nights", price: "₹1,79,999", priceValue: 179999 },
    { image: parisImage, destination: "Paris Romance", duration: "4 Days 3 Nights", price: "₹2,49,999", priceValue: 249999 },
    { image: santoriniImage, destination: "Mediterranean Cruise", duration: "8 Days 7 Nights", price: "₹2,79,999", priceValue: 279999 },
    { image: baliImage, destination: "Asian Highlights", duration: "10 Days 9 Nights", price: "₹99,999", priceValue: 99999 },
    { image: switzerlandImage, destination: "European Explorer", duration: "12 Days 11 Nights", price: "₹1,79,999", priceValue: 179999 },
  ];

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "low" && pkg.priceValue < 1500) ||
      (priceFilter === "medium" && pkg.priceValue >= 1500 && pkg.priceValue < 2000) ||
      (priceFilter === "high" && pkg.priceValue >= 2000);
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen smooth-scroll">
      <Navbar />
      
      {/* Header */}
      <section className="gradient-hero pt-32 pb-20 text-white">
        <div className="container mx-auto px-4 text-center space-y-4 fade-in">
          <h1 className="text-5xl font-bold">Travel Packages</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Choose from our carefully curated travel packages to destinations around the world
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto px-4 -mt-8 mb-12">
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by price" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border z-50">
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under $1,500</SelectItem>
                <SelectItem value="medium">$1,500 - $2,000</SelectItem>
                <SelectItem value="high">Above $2,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.destination} {...pkg} />
          ))}
        </div>
        {filteredPackages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No packages found matching your criteria.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
