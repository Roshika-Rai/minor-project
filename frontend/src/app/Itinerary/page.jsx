"use client";
import { useState } from "react";
import axios from "axios";
import "./itinerary.css"; // styling yaha se milegi
import { requestFormReset } from "react-dom";
import toast from "react-hot-toast";

const user = JSON.parse(localStorage.getItem('user'));


export default function ItineraryForm() {
  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    days: [{ day: 1, places: "", activities: "" }],
  });

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleDayChange = (index, field, value) => {
    const newDays = [...trip.days];
    newDays[index][field] = value;
    setTrip({ ...trip, days: newDays });
  };

  const addDay = () => {
    setTrip({
      ...trip,
      days: [...trip.days, { day: trip.days.length + 1, places: "", activities: "" }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    trip.owner = user._id;
    console.log(trip);

    axios.post('http://localhost:5000/api/itineraries', trip)
      .then((result) => {
        toast.success('Login Successful')
        console.log(result.data);
      }).catch((err) => {
        toast.error('Login Failed');
        console.log(err);
      });
  }


  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">✨ Create Your Itinerary ✨</h2>

        <div className="row">
          <input
            type="text"
            name="title"
            placeholder="Trip Name"
            value={trip.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={trip.destination}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <input
            type="date"
            name="startDate"
            value={trip.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            name="endDate"
            value={trip.endDate}
            onChange={handleChange}
          />
        </div>

        <h3 className="subtitle">📅 Day-wise Plans</h3>
        {trip.days.map((d, index) => (
          <div key={index} className="day-box">
            <h4>Day {d.day}</h4>
            <input
              type="text"
              placeholder="Places to visit"
              value={d.places}
              onChange={(e) => handleDayChange(index, "places", e.target.value)}
            />
            <input
              type="text"
              placeholder="Activities"
              value={d.activities}
              onChange={(e) => handleDayChange(index, "activities", e.target.value)}
            />
          </div>
        ))}

        <div className="buttons">
          <button type="button" onClick={addDay} className="btn add">
            + Add Day
          </button>
          <button type="submit" className="btn save">
            Save Itinerary
          </button>
        </div>
      </form>
    </div>
  );
}