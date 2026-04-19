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



  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
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

  const fetchCities = async (input) => {
  if (!input) return;

  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&type=city&limit=5&apiKey=697a5489dbee42b1ab0cd2df6293407f`
    );

    const data = await res.json();

    const formatted = data.features.map((place) => ({
      label: place.properties.formatted,
      value: place.properties.city || place.properties.name
    }));

    setOptions(formatted);

  } catch (err) {
    console.error("Autocomplete error:", err);
  }

  let timeout;

const fetchCities = (input) => {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    // API call here
  }, 400);
};

if (!input || input.length < 2) {
  setOptions([]);
  return;
}
};

  

  const handleSubmit = async () => {
  console.log("SUBMIT CLICKED");

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
    console.log("RAW RESPONSE:", data);

    const tripData = data.message;

  // save for refresh (optional but good)
  localStorage.setItem("tripData", JSON.stringify(tripData));

  // navigate to result page
  navigate("/trip-result", {
    state: { tripData }
  });

    // save for refresh
    localStorage.setItem("tripData", JSON.stringify(tripData));

    // navigate
    navigate("/trip-result", {
      state: { tripData }
    });

  } catch (error) {
    console.error("ERROR:", error);
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
            options={options}                  // ← use dynamic options (from API)
            onChange={setDestination}          // ← when user selects
            onInputChange={(value) => {        // ← when user types
              setInputValue(value);
              fetchCities(value);              // ← call API
            }}
            placeholder="Type a city..."
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

        {loading && (
          <div className="skeleton">
            <div className="skeleton-title"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        )}

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