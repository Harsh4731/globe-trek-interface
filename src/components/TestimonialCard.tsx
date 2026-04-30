import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  review: string;
  delay?: number;
}

const TestimonialCard = ({ name, location, rating, review, delay = 0 }: TestimonialCardProps) => {
  return (
    <Card 
      className="bg-card border-border fade-in hover-lift"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardContent className="p-6 space-y-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "fill-accent text-accent" : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground italic">"{review}"</p>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
