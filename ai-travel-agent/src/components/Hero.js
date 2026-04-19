import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(100%,42rem)] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-400/25 via-violet-500/20 to-transparent blur-3xl dark:from-cyan-500/20 dark:via-violet-500/15" />

      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        className="relative text-center"
      >
        <motion.div
          custom={0}
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-white/60 px-4 py-1.5 text-xs font-medium text-cyan-800 shadow-sm backdrop-blur dark:border-cyan-400/20 dark:bg-slate-900/60 dark:text-cyan-200"
        >
          <HiSparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          AI itineraries · budget-aware · ready in seconds
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          className="font-display mx-auto max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
        >
          Craft unforgettable trips with{" "}
          <span className="bg-gradient-to-r from-cyan-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-violet-400 dark:to-fuchsia-400">
            neural-grade
          </span>{" "}
          planning
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-400"
        >
          Tripnexa learns your destination, pace, and budget—then composes a
          structured day-by-day plan you can refine, share, or export.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/trip-planner")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 ring-1 ring-white/20 transition hover:shadow-xl hover:shadow-cyan-500/30 dark:from-cyan-500 dark:to-violet-500 dark:shadow-cyan-500/20"
          >
            Start planning
            <HiArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById("preview")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="rounded-full border border-slate-300/90 bg-white/50 px-6 py-3.5 text-sm font-medium text-slate-800 backdrop-blur transition hover:border-cyan-400/50 hover:bg-white/80 dark:border-slate-600 dark:bg-slate-900/40 dark:text-slate-100 dark:hover:border-cyan-500/40"
          >
            See preview
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
