import { motion } from "framer-motion";
import seoul from "../assets/seoul.png";
import osaka1 from "../assets/osaka1.png";
import osaka2 from "../assets/osaka2.png";
import spain from "../assets/spain.png";
import california from "../assets/california.png";

const trips = [
  {
    image: seoul,
    date: "28 Nov — 30 Nov 2023",
    title: "3 days in Seoul, South Korea",
  },
  {
    image: osaka1,
    date: "28 Nov — 30 Nov 2023",
    title: "3 days in Osaka, Japan",
  },
  {
    image: osaka2,
    date: "27 Nov — 29 Nov 2023",
    title: "Osaka highlights loop",
  },
  {
    image: spain,
    date: "28 Nov — 30 Nov 2023",
    title: "3 days across Spain",
  },
  {
    image: california,
    date: "28 Nov — 30 Nov 2023",
    title: "California coast rhythm",
  },
];

function TripCard({ image, date, title, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group cursor-default overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 shadow-lg shadow-slate-900/5 backdrop-blur transition-shadow hover:shadow-xl hover:shadow-cyan-500/10 dark:border-slate-700/70 dark:bg-slate-900/50 dark:shadow-black/40 dark:hover:shadow-cyan-500/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80 dark:from-slate-950/70" />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
          {date}
        </p>
        <p className="mt-1 font-display text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </p>
      </div>
    </motion.article>
  );
}

export default function TripsSection() {
  return (
    <section className="border-t border-slate-200/70 py-16 dark:border-slate-800/80 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Inspiration trips
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              Sample journeys—plug your own city into the planner for a fresh AI
              build.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-300">
              Curated
            </span>
            <span className="rounded-full border border-transparent bg-gradient-to-r from-cyan-500/15 to-violet-500/15 px-4 py-1.5 text-xs font-medium text-cyan-800 dark:text-cyan-200">
              Neural layouts
            </span>
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip, i) => (
            <TripCard key={trip.title} {...trip} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
