import "../styles/landing.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <h1>
        Craft Unforgettable <br />
        Itineraries with <br />
        <span className="highlight">AI Trip Planner</span>
      </h1>

      <p>
        Your personal trip planner and travel curator, creating custom itineraries
        tailored to your interests and budget.
      </p>

      <button
        className="primary-btn"
        onClick={() => navigate("/trip-planner")}
      >
        Get started — it's free
      </button>
    </section>
  );
}

export default Hero;