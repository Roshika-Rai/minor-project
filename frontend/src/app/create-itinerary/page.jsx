"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

function CreateItinerary() {
  const [user, setUser] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(1);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const itineraryForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      destinations: "",
      guests: 1,
      estimatedCost: 0,
      tags: "",
      isPublic: false,
      days: [
        {
          day: 1,
          activities: "",
          places: "",
        },
      ],
    },
    onSubmit: async (values) => {
      // if (!user?._id) {
      //   toast.error("Please login first!");
      //   return;
      // }

      try {
        const formattedValues = {
          ...values,
          owner: user._id,
          tags: values.tags.split(",").map((tag) => tag.trim()), // Convert comma-separated tags to array
        };

        const res = await axios.post(
          "http://localhost:5000/itineraries/add",
          formattedValues
        );
        toast.success("Itinerary Created Successfully!");
        console.log("Response:", res.data);
      } catch (err) {
        toast.error("Error while creating itinerary");
        console.error("API Error:", err);
      }
    },
  });

  // Handle date changes
  const handleDateChange = (e) => {
    itineraryForm.handleChange(e);

    if (e.target.name === "startDate" || e.target.name === "endDate") {
      const startDate =
        e.target.name === "startDate"
          ? e.target.value
          : itineraryForm.values.startDate;
      const endDate =
        e.target.name === "endDate"
          ? e.target.value
          : itineraryForm.values.endDate;

      if (startDate && endDate) {
        const days = calculateDays(startDate, endDate);
        setNumberOfDays(days);

        // Update days array with correct number of days
        const newDays = Array.from({ length: days }, (_, index) => ({
          day: index + 1,
          activities: itineraryForm.values.days[index]?.activities || "",
          places: itineraryForm.values.days[index]?.places || "",
        }));

        itineraryForm.setFieldValue("days", newDays);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Your Itinerary</h1>
      <form
        onSubmit={itineraryForm.handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={itineraryForm.values.title}
          onChange={itineraryForm.handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={itineraryForm.values.description}
          onChange={itineraryForm.handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="destinations"
          placeholder="Destinations"
          value={itineraryForm.values.destinations}
          onChange={itineraryForm.handleChange}
          className="border p-2 rounded"
        />

        <div className="flex gap-4">
          <input
            type="date"
            name="startDate"
            value={itineraryForm.values.startDate}
            onChange={handleDateChange}
            className="border p-2 rounded flex-1"
          />

          <input
            type="date"
            name="endDate"
            value={itineraryForm.values.endDate}
            onChange={handleDateChange}
            className="border p-2 rounded flex-1"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={itineraryForm.values.guests}
            onChange={itineraryForm.handleChange}
            className="border p-2 rounded flex-1"
          />

          <input
            type="number"
            name="estimatedCost"
            placeholder="Estimated Cost"
            value={itineraryForm.values.estimatedCost}
            onChange={itineraryForm.handleChange}
            className="border p-2 rounded flex-1"
          />
        </div>

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={itineraryForm.values.tags}
          onChange={itineraryForm.handleChange}
          className="border p-2 rounded"
        />

        {/* Dynamic Days Section */}
        <div className="space-y-4">
          {itineraryForm.values.days.map((day, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="font-bold mb-2">Day {day.day} Plans</h3>
              <textarea
                name={`days.${index}.activities`}
                placeholder={`Activities for Day ${day.day}`}
                value={day.activities}
                onChange={itineraryForm.handleChange}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                name={`days.${index}.places`}
                placeholder="Places to visit"
                value={day.places}
                onChange={itineraryForm.handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={itineraryForm.values.isPublic}
            onChange={itineraryForm.handleChange}
            className="border rounded"
          />
          <label>Make this itinerary public</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Create Itinerary
        </button>
      </form>
    </div>
  );
}

export default CreateItinerary;
