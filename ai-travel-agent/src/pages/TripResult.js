import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import Navbar from "../components/Navbar";
import PageShell from "../components/PageShell";
import Footer from "../components/Footer";
import MapView from "../components/MapView";

function readTripData(navState) {
  if (navState?.tripData) return navState.tripData;
  try {
    const raw = localStorage.getItem("tripData");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_KEY || "";

function TripResult() {
  const location = useLocation();
  const [data, setData] = useState(() => readTripData(location.state));

  useEffect(() => {
    setData(readTripData(location.state));
  }, [location.state]);

  const [heroImage, setHeroImage] = useState("");
  const [dayImages, setDayImages] = useState({});

  const getImageUrl = useCallback(async (query) => {
    if (!PEXELS_API_KEY) {
      console.warn("REACT_APP_PEXELS_KEY is missing; set it in ai-travel-agent/.env");
      return "https://picsum.photos/800/400";
    }
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          query
        )}&per_page=1`,
        {
          headers: { Authorization: PEXELS_API_KEY },
        }
      );

      const json = await res.json();
      return json.photos?.[0]?.src?.landscape;
    } catch (err) {
      console.error("Pexels error:", err);
      return "https://picsum.photos/800/400";
    }
  }, []);

  const CACHE_KEY = "tripImagesCache";

  useEffect(() => {
    if (!data) return;

    const loadImages = async () => {
      let cached = {};
      try {
        cached = JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
      } catch {
        cached = {};
      }

      const tripKey = data.title || "trip";

      if (cached[tripKey]) {
        setHeroImage(cached[tripKey].hero);
        setDayImages(cached[tripKey].days);
        return;
      }

      const titleWords = (data.title || "").split(" ");
      const cityHint = titleWords[titleWords.length - 1] || "travel";
      const hero = await getImageUrl(`${cityHint} skyline cityscape`);

      const images = {};
      for (const day of data.days || []) {
        const query = day.image_query || data.title || cityHint;
        images[day.day] = await getImageUrl(query);
      }

      cached[tripKey] = { hero, days: images };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cached));

      setHeroImage(hero);
      setDayImages(images);
    };

    loadImages();
  }, [data, getImageUrl]);

  if (!data) {
    return (
      <PageShell>
        <Navbar />
        <div className="mx-auto flex min-h-[50vh] max-w-lg flex-1 flex-col items-center justify-center px-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
            No trip data
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Generate a plan first, then you will land here with full context.
          </p>
          <Link
            to="/trip-planner"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-cyan-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white dark:from-cyan-500 dark:to-violet-500"
          >
            Open planner
          </Link>
        </div>
        <Footer />
      </PageShell>
    );
  }

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const lines = pdf.splitTextToSize(JSON.stringify(data, null, 2), 180);
    pdf.text(lines, 10, 10);
    pdf.save("trip-plan.pdf");
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <PageShell>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 pb-12"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden px-0 sm:px-6 sm:pt-4">
          <div className="relative aspect-[21/9] min-h-[200px] w-full sm:rounded-3xl sm:ring-1 sm:ring-slate-200/80 dark:sm:ring-slate-700/80">
            <img
              src={heroImage || "https://via.placeholder.com/1600x500"}
              alt=""
              className="h-full w-full object-cover sm:rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent sm:rounded-3xl" />
            <div className="absolute inset-x-0 bottom-0 max-w-6xl px-4 pb-8 pt-24 sm:px-8">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                {data.title}
              </motion.h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                {data.description}
              </p>
            </div>
          </div>
        </div>

        <div className="sticky top-16 z-40 mx-auto mt-6 flex max-w-6xl justify-center px-4 sm:px-6">
          <div className="inline-flex rounded-full border border-slate-200/90 bg-white/80 p-1 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/80">
            {[
              { id: "overview", label: "Overview" },
              { id: "itinerary", label: "Itinerary" },
              { id: "map", label: "Map" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className="rounded-full px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:px-5 sm:text-sm"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl space-y-12 px-4 sm:px-6">
          <div
            id="overview"
            className="grid gap-5 md:grid-cols-2 md:gap-6 scroll-mt-28"
          >
            {[
              { title: "About", body: data.description },
              { title: "History & context", body: data.history },
            ].map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-slate-200/80 bg-white/60 p-6 shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/50"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {block.body}
                </p>
              </motion.div>
            ))}
          </div>

          <div id="itinerary" className="scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
              Day-by-day
            </h2>
            <div className="relative mt-8 space-y-8 before:absolute before:left-[0.65rem] before:top-2 before:h-[calc(100%-2rem)] before:w-px before:bg-gradient-to-b before:from-cyan-500/50 before:via-violet-500/40 before:to-transparent sm:before:left-3">
              {(data.days || []).map((day, idx) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative grid gap-6 pl-10 sm:grid-cols-[minmax(0,7rem)_1fr] sm:pl-14"
                >
                  <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 text-xs font-bold text-white shadow-lg shadow-cyan-500/30 sm:left-0.5">
                    {day.day}
                  </div>
                  <div className="min-w-0 sm:col-span-1 sm:col-start-2">
                    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/50 shadow-md dark:border-slate-700/70 dark:bg-slate-900/40">
                      <img
                        src={
                          dayImages[day.day] ||
                          "https://via.placeholder.com/400x250"
                        }
                        alt=""
                        className="aspect-video w-full object-cover"
                      />
                      <ul className="space-y-2 p-4 sm:p-5">
                        {(day.activities || []).map((act, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-sm text-slate-700 dark:text-slate-300"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="map" className="scroll-mt-28">
            <h2 className="font-display mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
              Map
            </h2>
            <MapView data={data} />
          </div>

          <div className="flex justify-center">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={downloadPDF}
              className="rounded-full border border-slate-300 bg-white/80 px-8 py-3 text-sm font-semibold text-slate-800 shadow-md backdrop-blur transition hover:border-cyan-400/50 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-100"
            >
              Download PDF
            </motion.button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </PageShell>
  );
}

export default TripResult;
