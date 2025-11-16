"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Calendar, MapPin, DollarSign, Users, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { format } from "date-fns";

export default function ViewItinerary() {
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  // 🟢 Fetch single itinerary data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/itinerary/${params.id}`);
        setItinerary(res.data);
      } catch (err) {
        console.error("Error fetching itinerary:", err);
        toast.error("Failed to load itinerary");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  // 🔴 Delete function
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this itinerary?")) return;

    try {
      await axios.delete(`http://localhost:5000/itinerary/delete/${params.id}`);
      toast.success("Itinerary deleted successfully!");
      // Redirect to manage itineraries
      window.location.href = "/manage-itinerary";
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete itinerary");
    }
  };

  // 🌀 Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show error if no itinerary found
  if (!itinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Itinerary Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the itinerary you're looking for.</p>
          <Link href="/manage-itinerary">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Back to Itineraries
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // 🧾 UI - Single Itinerary View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/manage-itinerary" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          <ArrowLeft size={20} />
          Back to Itineraries
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10">
            <h1 className="text-4xl font-bold text-white mb-2">{itinerary.title}</h1>
            <p className="text-blue-100">{itinerary.description}</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Destination */}
              <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
                <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase">Destination</p>
                  <p className="text-lg font-bold text-gray-900">{itinerary.destinations || "N/A"}</p>
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
                <Calendar className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase">Duration</p>
                  <p className="text-lg font-bold text-gray-900">
                    {format(new Date(itinerary.startDate), "MMM dd")} - {format(new Date(itinerary.endDate), "MMM dd, yyyy")}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{itinerary.days?.length || 0} Days</p>
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg">
                <Users className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase">Guests</p>
                  <p className="text-lg font-bold text-gray-900">{itinerary.guests} {itinerary.guests === 1 ? "Person" : "People"}</p>
                </div>
              </div>

              {/* Cost */}
              <div className="flex items-start gap-4 bg-green-50 p-4 rounded-lg">
                <DollarSign className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase">Estimated Cost</p>
                  <p className="text-lg font-bold text-gray-900">${itinerary.estimatedCost || "0"}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {itinerary.tags && itinerary.tags.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={20} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {itinerary.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Plans */}
            {itinerary.days && itinerary.days.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Daily Plans</h3>
                <div className="space-y-4">
                  {itinerary.days.map((day, idx) => (
                    <div key={idx} className="border-2 border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900">Day {day.day}</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Places */}
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">📍 Places</h5>
                          <p className="text-gray-600 whitespace-pre-wrap">{day.places || "N/A"}</p>
                        </div>

                        {/* Activities */}
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">🎯 Activities</h5>
                          <p className="text-gray-600 whitespace-pre-wrap">{day.activities || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Public Status */}
            {itinerary.isPublic && (
              <div className="mb-8 bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <p className="text-green-800 font-semibold">✓ This itinerary is public</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-semibold"
              >
                Delete Itinerary
              </button>
              <Link href="/manage-itinerary" className="flex-1">
                <button className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
