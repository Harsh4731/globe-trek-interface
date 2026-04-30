import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Fake AI Trip Generator
function generateTripPlan(prompt) {
  return `
🌍 Trip Plan for: ${prompt}

📅 Day 1:
- Arrival & Hotel Check-in
- Local sightseeing
- Evening beach visit

📅 Day 2:
- Famous tourist spots
- Water sports / adventure
- Local food exploration

📅 Day 3:
- Nearby places visit
- Shopping & cafes
- Sunset point

📅 Day 4:
- Relax / optional activities
- Bike ride / local exploration

📅 Day 5:
- Checkout & return

💰 Estimated Budget:
- Stay: ₹5000
- Food: ₹3000
- Travel: ₹4000
- Activities: ₹2000

✅ Total: ₹14,000 approx

Enjoy your trip! ✈️
`;
}

// API route
app.post("/plan-trip", (req, res) => {
  try {
    const { prompt } = req.body;

    const result = generateTripPlan(prompt);

    res.json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error generating trip" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});