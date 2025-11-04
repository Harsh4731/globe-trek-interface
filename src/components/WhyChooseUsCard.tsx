import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface WhyChooseUsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const WhyChooseUsCard = ({ icon: Icon, title, description, delay = 0 }: WhyChooseUsCardProps) => {
  return (
    <Card 
      className="bg-card border-border hover-lift fade-in text-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardContent className="p-8 space-y-4">
        <div className="inline-flex p-4 rounded-full bg-primary/10">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default WhyChooseUsCard;
