import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import MyTrips from "./pages/MyTrips";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Packages from "./pages/Packages";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AIPlanner from "./pages/AIPLanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* NEW ROUTE ADDED */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/mytrips" element={<MyTrips />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/ai-planner" element={<AIPlanner />} />


          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;