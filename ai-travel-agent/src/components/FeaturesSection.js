import { motion } from "framer-motion";
import { HiOutlineClipboardList, HiOutlineLightningBolt } from "react-icons/hi";
import featurePreview from "../assets/feature-preview.png";

const items = [
  {
    title: "Structured days",
    text: "Each day bundles activities, pacing, and visual cues so you scan the plan in seconds—not paragraphs.",
    icon: HiOutlineClipboardList,
  },
  {
    title: "Instant iteration",
    text: "Regenerate with new budget or vibe. Tripnexa keeps the layout consistent so comparisons feel effortless.",
    icon: HiOutlineLightningBolt,
  },
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display mx-auto max-w-3xl text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
      >
        Everything you need for{" "}
        <span className="text-transparent bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text dark:from-cyan-400 dark:to-violet-400">
          serious
        </span>{" "}
        trip design
      </motion.h2>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          {items.map(({ title, text, icon: Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
              className="rounded-2xl border border-slate-200/80 bg-white/60 p-6 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/50 dark:shadow-black/30"
            >
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 p-3 text-cyan-700 dark:text-cyan-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-cyan-500/20 via-violet-500/10 to-transparent blur-2xl dark:from-cyan-500/15" />
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/50 shadow-2xl ring-1 ring-white/50 backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/40 dark:ring-slate-700/40">
            <img
              src={featurePreview}
              alt="Itinerary interface preview"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
