import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

function MapView({ data }) {
  const [locations, setLocations] = useState([]);

  

  // 🔹 Convert place → lat/lng
  const geocodePlace = async (place) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          place
        )}&format=json&limit=1`
      );
      const result = await res.json();

      if (result.length > 0) {
        return {
          lat: parseFloat(result[0].lat),
          lng: parseFloat(result[0].lon),
          name: place,
        };
      }
    } catch (err) {
      console.error("Geocode error:", err);
    }

    return null;
  };

  useEffect(() => {
    if (!data) return;

    const fetchLocations = async () => {
      let places = [];

      for (let day of data.days || []) {
        for (let day of data.days || []) {
            const location = await geocodePlace(day.activities[0]);
            if (location) places.push(location);
        }
      }

      setLocations(places);
    };

    fetchLocations();
  }, [data]);

  // Default center (fallback)
  const center =
    locations.length > 0
      ? [locations[0].lat, locations[0].lng]
      : [28.6139, 77.209];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc, i) => (
        <Marker key={i} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;