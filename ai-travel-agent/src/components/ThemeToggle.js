import { motion } from "framer-motion";
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineBrightnessAuto,
} from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const modes = [
  { id: "light", label: "Light", Icon: MdLightMode },
  { id: "dark", label: "Dark", Icon: MdDarkMode },
  { id: "system", label: "System", Icon: MdOutlineBrightnessAuto },
];

export default function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-full border border-slate-200/90 bg-white/80 p-0.5 shadow-sm backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/70 ${className}`}
      role="group"
      aria-label="Theme"
    >
      {modes.map(({ id, label, Icon }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            title={label}
            aria-pressed={active}
            onClick={() => setTheme(id)}
            className="relative rounded-full p-2 text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/25 ring-1 ring-cyan-500/30 dark:from-cyan-400/15 dark:to-violet-400/20 dark:ring-cyan-400/25"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
