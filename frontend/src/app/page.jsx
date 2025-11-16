import React from "react";


export default function TravelHome() {
  return (
    <div className="bg-gray-50 text-gray-800">
      

      {/* Hero Section */}
      <section
        className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Discover Your Next Adventure</h1>
          <p className="text-lg">
            Find the best destinations, offers, and unforgettable travel experiences.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-6xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Find Your Trip</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="p-3 border rounded-lg">
            <option>Destination</option>
            <option>Paris</option>
            <option>Dubai</option>
            <option>Maldives</option>
            <option>New York</option>
          </select>

          <select className="p-3 border rounded-lg">
            <option>Trip Type</option>
            <option>Adventure</option>
            <option>Romantic</option>
            <option>Family</option>
          </select>

          <select className="p-3 border rounded-lg">
            <option>Budget</option>
            <option>₹10,000 - ₹20,000</option>
            <option>₹20,000 - ₹50,000</option>
            <option>₹50,000+</option>
          </select>

          <button className="bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700">
            Search
          </button>
        </div>
      </section>
    </div>
  );
}
