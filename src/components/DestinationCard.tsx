import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface DestinationCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  delay?: number;
}

const DestinationCard = ({ image, name, description, price, delay = 0 }: DestinationCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover-lift fade-in border-border bg-card"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden h-56 rounded-t-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full font-semibold text-sm shadow-lg">
            {price}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
