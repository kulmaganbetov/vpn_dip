"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck, Activity, Globe2, KeyRound } from "lucide-react";

const alerts = [
  { i: <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />, t: "AES-256-GCM tunnel established with edge-node Stockholm" },
  { i: <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />, t: "Suspicious DNS query blocked: tracker-cdn.malicious.io" },
  { i: <Activity className="h-3.5 w-3.5 text-cyan-400" />, t: "Throughput stable at 940 Mb/s · 6 ms handshake" },
  { i: <Globe2 className="h-3.5 w-3.5 text-violet-400" />, t: "Exit IP rotated → 185.213.155.41 (Frankfurt)" },
  { i: <KeyRound className="h-3.5 w-3.5 text-pink-400" />, t: "Perfect Forward Secrecy renegotiation completed" },
  { i: <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />, t: "MITM attempt detected on hop 4 — packet dropped" },
];

export default function AlertTicker() {
  const items = [...alerts, ...alerts];
  return (
    <div className="fixed top-[88px] inset-x-0 z-30 pointer-events-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="glass rounded-xl overflow-hidden">
          <div className="flex items-center">
            <div className="flex items-center gap-2 px-3 py-2 border-r border-cyan-400/15 bg-rose-500/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-300">
                Live · Threat Feed
              </span>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <motion.div
                className="flex gap-10 whitespace-nowrap py-2 pr-10"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 45, ease: "linear", repeat: Infinity }}
              >
                {items.map((a, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 text-xs text-slate-300 font-mono"
                  >
                    {a.i}
                    {a.t}
                    <span className="text-slate-600">•</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
