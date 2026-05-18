"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, Lock, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/encryption", label: "Encryption Visualizer" },
  { href: "/protocols", label: "Protocols" },
  { href: "/attacks", label: "Attack Simulator" },
  { href: "/learn", label: "Learning Center" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between",
            scrolled && "shadow-neon"
          )}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 blur-lg bg-cyan-400/50 group-hover:bg-cyan-400/80 transition" />
              <Shield className="relative h-7 w-7 text-cyan-400" />
            </div>
            <div className="leading-none">
              <div className="text-base font-bold tracking-wide">
                VPN <span className="gradient-text">Shield Lab</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-0.5 flex items-center gap-1">
                <Activity className="h-2.5 w-2.5 text-emerald-400" />
                Realtime
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    active
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-100"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 border border-cyan-400/30"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-mono text-emerald-300">VPN ACTIVE</span>
            </div>
            <Link
              href="/attacks"
              className="group relative px-4 py-2 rounded-xl text-sm font-semibold text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 opacity-90 group-hover:opacity-100 transition" />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500" />
              <span className="relative flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Launch Demo
              </span>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg glass-strong"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-2 glass rounded-2xl p-4 space-y-1"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-lg text-sm",
                    pathname === l.href
                      ? "bg-cyan-500/15 text-white border border-cyan-400/30"
                      : "text-slate-300 hover:bg-white/5"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
