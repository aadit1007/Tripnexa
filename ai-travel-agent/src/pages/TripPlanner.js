import { useRef, useState } from "react";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import PageShell from "../components/PageShell";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { getApiBase } from "../apiBase";
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
  FaSpa,
} from "react-icons/fa";

const GEOAPIFY_KEY = "697a5489dbee42b1ab0cd2df6293407f";

function buildSelectStyles(isDark) {
  return {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDark ? "rgb(15 23 42 / 0.65)" : "rgb(255 255 255 / 0.92)",
      borderColor: state.isFocused
        ? isDark
          ? "rgb(34 211 238 / 0.45)"
          : "rgb(6 182 212 / 0.5)"
        : isDark
          ? "rgb(51 65 85)"
          : "rgb(226 232 240)",
      borderRadius: "0.75rem",
      minHeight: 48,
      boxShadow: state.isFocused
        ? isDark
          ? "0 0 0 1px rgb(34 211 238 / 0.2)"
          : "0 0 0 1px rgb(6 182 212 / 0.3)"
        : "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "rgb(15 23 42)" : "rgb(255 255 255)",
      border: `1px solid ${isDark ? "rgb(51 65 85)" : "rgb(226 232 240)"}`,
      borderRadius: "0.75rem",
      overflow: "hidden",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDark
          ? "rgb(30 41 59)"
          : "rgb(240 253 250)"
        : "transparent",
      color: isDark ? "rgb(241 245 249)" : "rgb(15 23 42)",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "rgb(241 245 249)" : "rgb(15 23 42)",
    }),
    placeholder: (base) => ({
      ...base,
      color: isDark ? "rgb(148 163 184)" : "rgb(100 116 139)",
    }),
    input: (base) => ({
      ...base,
      color: isDark ? "rgb(241 245 249)" : "rgb(15 23 42)",
    }),
  };
}

export default function TripPlanner() {
  const navigate = useNavigate();
  const { resolved } = useTheme();
  const isDark = resolved === "dark";
  const debounceRef = useRef(null);

  const [options, setOptions] = useState([]);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("");
  const [travelType, setTravelType] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleActivity = (activity) => {
    setActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const fetchCities = async (input) => {
    if (!input || input.length < 2) {
      setOptions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          input
        )}&type=city&limit=5&apiKey=${GEOAPIFY_KEY}`
      );
      const data = await res.json();
      const formatted = (data.features || []).map((place) => ({
        label: place.properties.formatted,
        value: place.properties.city || place.properties.name,
      }));
      setOptions(formatted);
    } catch (err) {
      console.error("Autocomplete error:", err);
      setOptions([]);
    }
  };

  const onInputChange = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchCities(value);
    }, 400);
  };

  const handleSubmit = async () => {
    if (!destination) {
      alert("Please select a destination");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${getApiBase()}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: destination.value,
          days: days.toString(),
          budget: budget || "Medium",
        }),
      });

      const data = await response.json();
      const tripData = data.message;

      if (typeof tripData === "string" || tripData?.detail) {
        alert(
          typeof tripData === "string"
            ? tripData
            : "Could not generate trip. Check API key and try again."
        );
        return;
      }

      localStorage.setItem("tripData", JSON.stringify(tripData));
      navigate("/trip-result", { state: { tripData } });
    } catch (error) {
      console.error("ERROR:", error);
      alert("Failed to generate trip.");
    } finally {
      setLoading(false);
    }
  };

  const cardBase =
    "flex cursor-pointer flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all duration-200 sm:p-5";
  const cardIdle =
    "border-slate-200/90 bg-white/60 text-slate-700 hover:border-cyan-400/40 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-cyan-500/35";
  const cardActive =
    "border-cyan-500/60 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-cyan-900 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-500/25 dark:border-cyan-400/50 dark:from-cyan-500/15 dark:to-violet-500/15 dark:text-cyan-100 dark:shadow-cyan-500/10";

  return (
    <PageShell>
      <Navbar />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
            Planner
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Calibrate your journey
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
            Destination, duration, and budget anchor the model—optional tags tune
            the vibe before we generate your itinerary.
          </p>
        </motion.div>

        <div className="mt-10 space-y-8 rounded-3xl border border-slate-200/80 bg-white/50 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/40 dark:shadow-black/30 sm:p-8">
          <section className="space-y-2">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Destination
            </label>
            <Select
              options={options}
              value={destination}
              onChange={setDestination}
              onInputChange={onInputChange}
              placeholder="Type a city…"
              styles={buildSelectStyles(isDark)}
              classNamePrefix="tn"
              noOptionsMessage={() =>
                options.length === 0 ? "Type at least 2 letters" : "No cities found"
              }
            />
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

          <section className="space-y-2">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Travel date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none ring-cyan-500/30 transition focus:border-cyan-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950/60 dark:text-slate-100 dark:focus:border-cyan-400"
            />
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

          <section className="space-y-3">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Trip length
            </label>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-slate-50/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/50">
              <span className="text-sm text-slate-600 dark:text-slate-400">Days</span>
              <div className="flex items-center gap-4">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-medium text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                  onClick={() => setDays((d) => Math.max(1, d - 1))}
                >
                  −
                </motion.button>
                <span className="min-w-[2ch] text-center font-display text-xl font-semibold text-slate-900 dark:text-white">
                  {days}
                </span>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-medium text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                  onClick={() => setDays((d) => d + 1)}
                >
                  +
                </motion.button>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

          <section className="space-y-3">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Budget band
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              {["Low <6.7k", "Medium 6.7k-20k", "High >20k"].map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBudget(option)}
                  className={`${cardBase} ${budget === option ? cardActive : cardIdle}`}
                >
                  <FaWallet className="text-lg text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-medium leading-snug">{option}</span>
                </motion.button>
              ))}
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

          <section className="space-y-3">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Traveling with
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Solo", icon: <FaUser /> },
                { name: "Couple", icon: <FaUsers /> },
                { name: "Family", icon: <FaUsers /> },
                { name: "Friends", icon: <FaUsers /> },
              ].map((option) => (
                <motion.button
                  key={option.name}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTravelType(option.name)}
                  className={`${cardBase} min-w-[calc(50%-0.375rem)] flex-1 sm:min-w-0 sm:flex-none ${travelType === option.name ? cardActive : cardIdle}`}
                >
                  <span className="text-cyan-600 dark:text-cyan-400">{option.icon}</span>
                  <span className="text-xs font-medium">{option.name}</span>
                </motion.button>
              ))}
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />

          <section className="space-y-3">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Activities
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "Beaches", icon: <FaUmbrellaBeach /> },
                { name: "City sightseeing", icon: <FaCity /> },
                { name: "Outdoor adventures", icon: <FaMountain /> },
                { name: "Nightlife", icon: <FaGlassCheers /> },
                { name: "Food exploration", icon: <FaUtensils /> },
                { name: "Shopping", icon: <FaShoppingBag /> },
                { name: "Spa wellness", icon: <FaSpa /> },
              ].map((option) => (
                <motion.button
                  key={option.name}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleActivity(option.name)}
                  className={`${cardBase} min-w-[calc(50%-0.375rem)] flex-1 sm:min-w-[calc(33.333%-0.5rem)] ${activities.includes(option.name) ? cardActive : cardIdle}`}
                >
                  <span className="text-cyan-600 dark:text-cyan-400">{option.icon}</span>
                  <span className="text-xs font-medium leading-snug">{option.name}</span>
                </motion.button>
              ))}
            </div>
          </section>

          <motion.div className="pt-2">
            <motion.button
              type="button"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.02 }}
              whileTap={loading ? {} : { scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full rounded-full bg-gradient-to-r from-cyan-600 to-violet-600 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition disabled:cursor-not-allowed disabled:opacity-60 dark:from-cyan-500 dark:to-violet-500"
            >
              {loading ? "Generating…" : "Generate itinerary"}
            </motion.button>
          </motion.div>
        </div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-3"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-14 rounded-2xl bg-gradient-to-r from-slate-200/80 via-slate-100 to-slate-200/80 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.12,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </PageShell>
  );
}
