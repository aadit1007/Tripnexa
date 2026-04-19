import { motion } from "framer-motion";

export default function PageShell({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`flex min-h-screen flex-col bg-slate-50 text-slate-900 tn-grid-light transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 dark:tn-grid-dark ${className}`}
    >
      {children}
    </motion.div>
  );
}
