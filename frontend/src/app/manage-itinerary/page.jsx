'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

const ManageItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItinerary = async () => {
    const res = await axios.get("http://localhost:5000/itineraries/getall")
    console.log(res.data);
    setItineraries(res.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchItinerary();
  }, []);

  const deleteItinerary = async (Id) => {
    const res = await axios.delete(`http://localhost:5000/itineraries/delete/${Id}`);
    if (res.status === 200) {
      toast.success("User Deleted Successfully");
      fetchItinerary(); // Refresh the user list after deletion
    } else {
      toast.error("Failed to delete user");
      console.log("Error deleting user:", res.data);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Manage Itineraries
      </h1>

      {itineraries.length === 0 ? (
        <p className="text-center text-gray-500">No itineraries found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow hover:shadow-lg p-4 transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Destination:</span> {item.destination}
              </p>
              <div className="text-gray-600 mb-1">
                <span className="font-medium">Days:</span>
                {
                  item.days.map((day, idx) => (
                    <div key={idx} className="m-2 border p-4">
                      <p>{day.day}</p>
                      <p>{day.activity}</p>
                      <p>{day.places}</p>
                    </div>
                  ))
                }
              </div>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Price:</span> ${item.price}
              </p>
              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  <Link href={`/update-itinerary/${item._id}`}>
                    Edit
                  </Link>
                </button>
                <button
                  onClick={() => deleteItinerary(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
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
};

export default ManageItinerary;