import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface PackageCardProps {
  image: string;
  destination: string;
  duration: string;
  price: string;
  groupSize?: string;
}

const PackageCard = ({ image, destination, duration, price, groupSize = "2-10" }: PackageCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift fade-in border-border bg-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden h-64 rounded-t-lg">
          <img
            src={image}
            alt={destination}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
            {duration}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">{destination}</h3>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{groupSize} people</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-bold text-primary">{price}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link to="/booking" className="w-full">
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
