import { useState } from "react";
import Navbar from "@/components/Navbar";

const AIPlanner = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    try {
      const res = await fetch("http://localhost:5000/plan-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.result || "No response from AI");
    } catch (error) {
      console.log(error);
      alert("Error generating trip");
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-blue-50">
      <Navbar />

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          AI Trip Planner 🤖
        </h1>

        <textarea
          className="w-full p-3 border rounded-lg"
          placeholder="Plan a 5 day trip to Manali under ₹20,000"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Generate Plan
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;