"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewItinerary() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/itinerary/getAll");
        setItineraries(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔴 Delete function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this itinerary?")) return;

    try {
      await axios.delete(`http://localhost:5000/itinerary/delete/${id}`);
      setItineraries((prev) => prev.filter((item) => item._id !== id));
      alert("Itinerary deleted successfully ✅");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete itinerary ❌");
    }
  };

  // ✏️ Edit function (for now just message)
  const handleEdit = (id) => {
    alert(`Edit functionality coming soon! (ID: ${id})`);
  };

  // 🌀 Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Loading itineraries...</p>
      </div>
    );
  }

  // 🧾 UI
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        All Itineraries
      </h1>

      {itineraries.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No itineraries found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {itineraries.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>📍 {item.location || "Unknown"}</span>
                <span>🕒 {item.date || "N/A"}</span>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
