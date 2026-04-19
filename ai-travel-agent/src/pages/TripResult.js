import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "../styles/tripresult.css";
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";

function TripResult() {
  const location = useLocation();
  const data =
    location.state?.tripData ||
    JSON.parse(localStorage.getItem("tripData"));

  // ✅ Hooks MUST be inside component
  const [heroImage, setHeroImage] = useState("");
  const [dayImages, setDayImages] = useState({});


  const PEXELS_KEY = "boulwxVmJQltzCvk1XtGBuBovT9E57t39ExRFcveYfrdeH9VyTPmWhP0";

  const getImageUrl = async (query) => {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_KEY,
          },
        }
      );

      const data = await res.json();
      return data.photos?.[0]?.src?.landscape;

    } catch (err) {
      console.error("Pexels error:", err);
      return "https://picsum.photos/800/400"; // fallback
    }
  };

  const CACHE_KEY = "tripImagesCache";
  // ✅ useEffect also INSIDE component
  useEffect(() => {
    if (!data) return;

    const loadImages = async () => {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};

      const tripKey = data.title; // unique key per trip

      // ✅ If already cached → use it
      if (cached[tripKey]) {
        setHeroImage(cached[tripKey].hero);
        setDayImages(cached[tripKey].days);
        return;
      }

      // ❌ Otherwise fetch
      const city = data.title.split(" ").pop();
      const hero = await getImageUrl(`${city} skyline cityscape`);

      const images = {};
      for (let day of data.days || []) {
        const city = data.title.split(" ").pop(); // Tokyo, Delhi, Goa etc
        const query = day.image_query || data.title;
        images[day.day] = await getImageUrl(query);
      }

      // ✅ Save to cache
      cached[tripKey] = {
        hero: hero,
        days: images
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify(cached));

      setHeroImage(hero);
      setDayImages(images);
    };

    loadImages();
  }, [data]);

  if (!data) {
    return <h2>No trip data found</h2>;
  }

  const downloadPDF = () => {
    const pdf = new jsPDF();
    pdf.text(JSON.stringify(data, null, 2), 10, 10);
    pdf.save("trip-plan.pdf");
  };

  const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

      return (
    <>
      <Navbar />

      <div className="result-wrapper">

        {/* HERO */}
        <div className="hero">
          <img
            src={heroImage || "https://via.placeholder.com/1600x500"}
            alt="destination"
          />
          <div className="hero-overlay">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
        </div>

        {/* TABS */}
        <div className="tabs">
          <button className="tab" onClick={() => scrollToSection("overview")}>
            Overview
          </button>

          <button className="tab" onClick={() => scrollToSection("itinerary")}>
            Itinerary
          </button>


          <button className="tab" onClick={() => scrollToSection("map")}>
            Map
          </button>
        </div>

        {/* OVERVIEW */}
        <div id="overview" className="overview-grid">
          <div className="overview-card">
            <h3>About</h3>
            <p>{data.description}</p>
          </div>

          <div className="overview-card">
            <h3>History</h3>
            <p>{data.history}</p>
          </div>
        </div>

        {/* ITINERARY */}
        <h2 id="itinerary" className="section-title">Your Plan</h2>

        <div className="timeline">
          {data.days?.map((day) => (
            <div key={day.day} className="timeline-item">

              <div className="timeline-left">
                <span>Day {day.day}</span>
              </div>

              <div className="timeline-right">
                <img
                  src={
                    dayImages[day.day] ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt="activity"
                />

                <ul>
                  {day.activities.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        <div id="map" className="map-section">
          <h2 className="section-title">Map</h2>
          <MapView data={data} />
        </div>

        <button onClick={downloadPDF} className="pdf-btn">
          Download PDF
        </button>

      </div>
    </>
  );
}

export default TripResult;