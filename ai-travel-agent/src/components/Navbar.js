import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/trip-planner", label: "Trip planner" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.04),0_4px_16px_-4px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_24px_-8px_rgba(0,0,0,0.5)]"
    >
      <nav
        className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[3.75rem] sm:px-6 lg:px-8"
        aria-label="Main"
      >
        {/* Brand */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="relative z-20 flex min-w-0 shrink-0 items-center gap-2.5 rounded-xl py-1 outline-none ring-cyan-500/40 focus-visible:ring-2"
        >
          <img
            src={logo}
            alt=""
            className="h-9 w-9 shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
          />
          <span className="font-display truncate text-base font-semibold tracking-tight text-slate-900 sm:text-lg dark:text-white">
            Tripnexa
          </span>
        </Link>

        {/* Center: primary navigation (desktop) */}
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex">
          <ul className="pointer-events-auto inline-flex items-center gap-0.5 rounded-full border border-slate-200/90 bg-slate-50/90 p-1 shadow-inner shadow-slate-900/5 dark:border-slate-700/90 dark:bg-slate-900/80 dark:shadow-black/40">
            {links.map(({ to, label }) => {
              const active = pathname === to;
              return (
                <li key={to} className="relative">
                  <Link
                    to={to}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                      active
                        ? "text-cyan-900 dark:text-cyan-100"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-800 dark:ring-slate-600/80"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Actions */}
        <div className="relative z-20 flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:bg-slate-50 md:hidden dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <HiX className="h-5 w-5" /> : <HiMenuAlt3 className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-slate-200 bg-slate-50/95 dark:border-slate-800 dark:bg-slate-900/95 md:hidden"
          >
            <ul className="mx-auto max-w-7xl space-y-1 px-4 py-3">
              {links.map(({ to, label }) => {
                const active = pathname === to;
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        active
                          ? "border-cyan-500/40 bg-white text-cyan-900 shadow-sm dark:border-cyan-500/30 dark:bg-slate-800 dark:text-cyan-100"
                          : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-white dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
