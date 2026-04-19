import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

function MapView({ data }) {
  const [locations, setLocations] = useState([]);

  const geocodePlace = async (place) => {
    if (!place) return null;
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
      const places = [];
      const seen = new Set();

      for (const day of data.days || []) {
        const label = day.activities?.[0] || data.title;
        if (!label || seen.has(label)) continue;
        seen.add(label);
        const location = await geocodePlace(label);
        if (location) places.push(location);
      }

      setLocations(places);
    };

    fetchLocations();
  }, [data]);

  const center =
    locations.length > 0
      ? [locations[0].lat, locations[0].lng]
      : [28.6139, 77.209];

  return (
    <MapContainer
      center={center}
      zoom={locations.length > 1 ? 4 : 12}
      className="z-0 h-[min(24rem,55vh)] w-full overflow-hidden rounded-2xl border border-slate-200/80 shadow-inner dark:border-slate-700/80"
      style={{ minHeight: "280px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc, i) => (
        <Marker key={`${loc.name}-${i}`} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
