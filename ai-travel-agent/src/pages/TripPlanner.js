import { useState } from "react";
import Select from "react-select";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaUser,
  FaUsers,
  FaUmbrellaBeach,
  FaCity,
  FaMountain,
  FaGlassCheers,
  FaUtensils,
  FaShoppingBag,
  FaSpa
} from "react-icons/fa";
import "../styles/tripplanner.css";

function TripPlanner() {

  const cityOptions = [
    { value: "New York", label: "New York" },
    { value: "London", label: "London" },
    { value: "Tokyo", label: "Tokyo" },
    { value: "Paris", label: "Paris" },
    { value: "Dubai", label: "Dubai" },
    { value: "Sydney", label: "Sydney" }
  ];

  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("");
  const [travelType, setTravelType] = useState("");
  const [activities, setActivities] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleActivity = (activity) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter(a => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };

  const handleSubmit = async () => {
    if (!destination) {
      alert("Please select a destination");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          destination: destination.value,
          days: days.toString(),
          budget: budget
        })
      });

      const data = await response.json();
      
      // If data.message is JSON, we can navigate to the trip-result page
    try {

    const jsonStart = data.message.indexOf("{");
    const jsonEnd = data.message.lastIndexOf("}") + 1;

    const jsonString = data.message.substring(jsonStart, jsonEnd);

    const tripData = JSON.parse(jsonString);

    navigate("/trip-result", {
      state: { tripData }
    });

    } catch (e) {
    console.error("JSON parse failed:", e);
    setResult(data.message);
    }  

    } catch (error) {
      console.error(error);
      alert("Failed to generate trip.");
      setResult("Failed to generate itinerary.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="planner-wrapper">

        <h1>Tell us your travel preferences</h1>
        <p className="planner-subtext">
          Just provide some basic information and our trip planner
          will generate a customized itinerary.
        </p>

        {/* Destination */}
        <div className="planner-section">
          <label>Destination of choice</label>
          <Select
            options={cityOptions}
            onChange={setDestination}
            placeholder="Select or type a city..."
          />
        </div>

        <div className="divider" />

        {/* Date */}
        <div className="planner-section">
          <label>When are you planning to travel?</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="divider" />

        {/* Days */}
        <div className="planner-section">
          <label>How many days?</label>
          <div className="counter">
            <button onClick={() => setDays(Math.max(1, days - 1))}>−</button>
            <span>{days}</span>
            <button onClick={() => setDays(days + 1)}>+</button>
          </div>
        </div>

        <div className="divider" />

        {/* Budget */}
        <div className="planner-section">
          <label>Budget</label>
          <div className="options-row">
            {["Low <6.7k", "Medium 6.7k-20k", "High >20k"].map(option => (
              <div
                key={option}
                className={`card-option ${budget === option ? "active" : ""}`}
                onClick={() => setBudget(option)}
              >
                <FaWallet />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Travel Type */}
        <div className="planner-section">
          <label>Traveling with</label>
          <div className="options-row wrap">
            {[
              { name: "Solo", icon: <FaUser /> },
              { name: "Couple", icon: <FaUsers /> },
              { name: "Family", icon: <FaUsers /> },
              { name: "Friends", icon: <FaUsers /> }
            ].map(option => (
              <div
                key={option.name}
                className={`card-option ${travelType === option.name ? "active" : ""}`}
                onClick={() => setTravelType(option.name)}
              >
                {option.icon}
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Activities */}
        <div className="planner-section">
          <label>Activities</label>
          <div className="options-row wrap">
            {[
              { name: "Beaches", icon: <FaUmbrellaBeach /> },
              { name: "City sightseeing", icon: <FaCity /> },
              { name: "Outdoor adventures", icon: <FaMountain /> },
              { name: "Nightlife", icon: <FaGlassCheers /> },
              { name: "Food exploration", icon: <FaUtensils /> },
              { name: "Shopping", icon: <FaShoppingBag /> },
              { name: "Spa wellness", icon: <FaSpa /> }
            ].map(option => (
              <div
                key={option.name}
                className={`card-option ${activities.includes(option.name) ? "active" : ""}`}
                onClick={() => toggleActivity(option.name)}
              >
                {option.icon}
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="submit-container">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        {loading && <p className="loading-text">Generating your itinerary...</p>}

        {result && (
          <div className="itinerary-result">
            <h2>Your AI Travel Plan</h2>
            <pre>{result}</pre>
          </div>
        )}

      </div>
    </>
  );
}

export default TripPlanner;