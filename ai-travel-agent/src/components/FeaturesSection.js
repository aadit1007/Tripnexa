import "../styles/landing.css";
import featurePreview from "../assets/feature-preview.png";

function FeaturesSection() {
  return (
    <section className="features-section">
      
      <h2 className="section-title">
        Everything you need for planning your trip
      </h2>

      <div className="feature-container">

        <div className="feature-left">
          <h3>Adjust your itinerary as needed</h3>
          <p>
            Seamlessly manage your itinerary all in one page —
            from reconfiguring the order of your plans,
            introducing new destinations to your itinerary,
            or even discarding plans as needed.
          </p>
        </div>

        <div className="feature-right">
          <img src={featurePreview} alt="Itinerary Preview" />
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;