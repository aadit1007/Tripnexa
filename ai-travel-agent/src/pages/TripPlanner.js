import { useState } from "react";
import Select from "react-select";
import Navbar from "../components/Navbar";
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

  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("");
  const [travelType, setTravelType] = useState("");
  const [activities, setActivities] = useState([]);

  const toggleActivity = (activity) => {
    if (activities.includes(activity)) {
      setActivities(activities.filter(a => a !== activity));
    } else {
      setActivities([...activities, activity]);
    }
  };

  const handleSubmit = () => {
    alert(`
Destination: ${destination?.value}
Date: ${date}
Days: ${days}
Budget: ${budget}
Travel Type: ${travelType}
Activities: ${activities.join(", ")}
    `);
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
            {["Low", "Medium", "High"].map(option => (
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

      </div>
    </>
  );
}

export default TripPlanner;