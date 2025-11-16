'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, Trash2, MapPin, Calendar, DollarSign, AlertCircle } from "lucide-react";

const ManageItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItinerary = async () => {
    try {
      const res = await axios.get("http://localhost:5000/itineraries/getall");
      console.log(res.data);
      setItineraries(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load itineraries");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItinerary();
  }, []);

  const deleteItinerary = async (Id) => {
    if (!window.confirm("Are you sure you want to delete this itinerary?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/itineraries/delete/${Id}`);
      if (res.status === 200) {
        toast.success("Itinerary deleted successfully!");
        fetchItinerary();
      }
    } catch (error) {
      toast.error("Failed to delete itinerary");
      console.log("Error deleting itinerary:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Manage Itineraries
          </h1>
          <p className="text-gray-600 text-lg">View and manage all your travel plans</p>
        </div>

        {itineraries.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-6">No itineraries found</p>
            <Link href="/create-itinerary">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                Create Your First Itinerary
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                {/* Card Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6">
                  <h2 className="text-2xl font-bold text-white truncate">
                    {item.title}
                  </h2>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Destination */}
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="text-blue-600 flex-shrink-0" size={20} />
                    <span className="text-gray-700 font-medium">
                      {item.destination || item.destinations || "N/A"}
                    </span>
                  </div>

                  {/* Days Count */}
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="text-blue-600 flex-shrink-0" size={20} />
                    <span className="text-gray-700 font-medium">
                      {item.days?.length || 0} Days
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <DollarSign className="text-green-600 flex-shrink-0" size={20} />
                    <span className="text-gray-700 font-bold text-lg">
                      ${item.price || item.estimatedCost || "0"}
                    </span>
                  </div>

                  {/* Days Overview */}
                  {item.days && item.days.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                        Days Overview
                      </h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {item.days.slice(0, 3).map((day, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition"
                          >
                            <p className="font-semibold text-gray-800 text-sm mb-1">
                              Day {day.day}
                            </p>
                            {day.places && (
                              <p className="text-xs text-gray-600 truncate flex items-center gap-1">
                                <span>📍</span> {day.places}
                              </p>
                            )}
                            {(day.activity || day.activities) && (
                              <p className="text-xs text-gray-600 truncate flex items-center gap-1">
                                <span>🎯</span> {day.activity || day.activities}
                              </p>
                            )}
                          </div>
                        ))}
                        {item.days.length > 3 && (
                          <p className="text-xs text-blue-600 font-semibold px-3 py-2">
                            +{item.days.length - 3} more days
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link href={`/view-itinerary/${item._id}`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 group">
                        <Eye size={18} className="group-hover:scale-110 transition" />
                        View
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteItinerary(item._id)}
                      className="flex-1 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition font-semibold flex items-center justify-center gap-2 group"
                    >
                      <Trash2 size={18} className="group-hover:scale-110 transition" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageItinerary;