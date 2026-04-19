import { motion } from "framer-motion";
import preview from "../assets/hero_preview.png";

export default function PreviewSection() {
  return (
    <section
      id="preview"
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/40 shadow-2xl shadow-slate-900/10 ring-1 ring-white/60 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/40 dark:shadow-black/40 dark:ring-slate-700/40"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 dark:from-cyan-400/5 dark:to-violet-400/10" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        <img
          src={preview}
          alt="Tripnexa itinerary preview"
          className="relative z-0 w-full object-cover"
        />
      </motion.div>
    </section>
  );
}
