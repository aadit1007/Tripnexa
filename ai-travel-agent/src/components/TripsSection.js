import "../styles/landing.css";
import seoul from "../assets/seoul.png";
import osaka1 from "../assets/osaka1.png";
import osaka2 from "../assets/osaka2.png";
import spain from "../assets/spain.png";
import california from "../assets/california.png";


function TripsSection() {
  return (
    <section className="trips-section">

      <div className="trips-container">

        <h2 className="trips-title">Trips</h2>

        <div className="trips-tabs">
          <button className="tab active">My Trips</button>
          <button className="tab">Collections</button>
        </div>

        <div className="trips-grid">
          <TripCard
            image={seoul}
            date="28 Nov 2023 - 30 Nov 2023"
            title="3 Days trip in Seoul, South Korea"
          />

          <TripCard
            image={osaka1}
            date="28 Nov 2023 - 30 Nov 2023"
            title="3 Days trip in Osaka, Japan"
          />

          <TripCard
            image={osaka2}
            date="27 Nov 2023 - 29 Nov 2023"
            title="3 Days trip in Osaka, Japan"
          />

          <TripCard
            image={spain}
            date="28 Nov 2023 - 30 Nov 2023"
            title="3 Days trip in Spain"
          />

          <TripCard
            image={california}
            date="28 Nov 2023 - 30 Nov 2023"
            title="3 Days trip in California, United States"
          />
        </div>

      </div>

    </section>
  );
}

function TripCard({ image, date, title }) {
  return (
    <div className="trip-card">
      <img src={image} alt={title} />
      <p className="trip-date">{date}</p>
      <p className="trip-title">{title}</p>
    </div>
  );
}

export default TripsSection;