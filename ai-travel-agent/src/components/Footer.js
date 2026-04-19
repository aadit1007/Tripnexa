import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/trip-planner", label: "Trip planner" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-slate-800/90 dark:bg-slate-950/70"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px max-w-6xl mx-auto bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent dark:via-cyan-400/25" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg outline-none ring-cyan-500/30 focus-visible:ring-2"
            >
              <img
                src={logo}
                alt=""
                className="h-9 w-9 rounded-lg object-cover shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-600"
              />
              <span className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                Tripnexa
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Neural-grade trip planning: structured day-by-day itineraries from your destination,
              budget, and pace—refine, share, or export when you are ready.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:justify-end md:flex-col md:items-end">
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold"
              aria-label="Footer navigation"
            >
              {footerLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-slate-600 transition hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://openrouter.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 transition hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
              >
                OpenRouter
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200/70 pt-8 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {year} Tripnexa. All rights reserved.</p>
          <p className="max-w-xl sm:text-right">
            Itineraries are AI-generated for inspiration only—not legal, medical, or safety advice.
            Verify bookings, visas, and conditions before you travel.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
