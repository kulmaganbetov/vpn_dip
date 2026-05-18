"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe2, Shield, Eye, EyeOff, Server } from "lucide-react";

const domains = [
  "bank.example.com",
  "private-mail.com",
  "tracker-cdn.malicious.io",
  "news.feed.net",
  "video-stream.tv",
  "search.privatedns.io",
];

export default function DnsLeak() {
  const [vpn, setVpn] = useState(false);
  const [queries, setQueries] = useState<{ id: number; domain: string; leaked: boolean }[]>([]);

  useEffect(() => {
    let id = 0;
    const t = setInterval(() => {
      setQueries((q) =>
        [
          {
            id: id++,
            domain: domains[Math.floor(Math.random() * domains.length)],
            leaked: vpn ? Math.random() > 0.92 : true,
          },
          ...q,
        ].slice(0, 8)
      );
    }, 1100);
    return () => clearInterval(t);
  }, [vpn]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-mono text-rose-300 uppercase tracking-wider">Attack 03</div>
          <h3 className="text-2xl font-bold">DNS Leak</h3>
          <p className="mt-1 text-sm text-slate-400">When DNS queries skip the tunnel, your ISP still knows every site you visit.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">VPN DNS</span>
          <button
            onClick={() => setVpn((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition ${vpn ? "bg-emerald-500" : "bg-slate-700"}`}
          >
            <motion.span
              animate={{ x: vpn ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
            />
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl bg-black/40 border border-cyan-400/20 p-6 overflow-hidden">
        <div className="grid grid-cols-3 gap-6 items-center relative">
          {/* Client */}
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-2xl glow-ring bg-black/60 flex items-center justify-center">
              <Globe2 className="h-7 w-7 text-cyan-300" />
            </div>
            <span className="mt-2 text-[10px] font-mono uppercase text-slate-400">You</span>
          </div>

          {/* Middle: VPN tunnel + ISP */}
          <div className="relative h-40">
            <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-cyan-400/40 via-emerald-400/60 to-cyan-400/40" />
            <div className="absolute inset-x-0 bottom-1/3 h-px bg-gradient-to-r from-rose-400/40 via-rose-400/60 to-rose-400/40" />

            <div className="absolute left-1/2 -translate-x-1/2 top-0 text-[10px] font-mono text-emerald-300 flex items-center gap-1">
              <Shield className="h-3 w-3" /> VPN tunnel (encrypted)
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 text-[10px] font-mono text-rose-300 flex items-center gap-1">
              <Eye className="h-3 w-3" /> ISP DNS path (cleartext)
            </div>

            {/* moving dots */}
            <AnimatePresence>
              {queries.slice(0, 4).map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: "100%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.1 }}
                  className={`absolute ${q.leaked ? "bottom-1/3 -translate-y-1/2" : "top-1/3 -translate-y-1/2"} h-2 w-2 rounded-full ${
                    q.leaked ? "bg-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.7)]" : "bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                  }`}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Destinations */}
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/30 p-3 flex items-center gap-3">
              <Server className="h-4 w-4 text-emerald-300" />
              <div>
                <div className="text-xs font-semibold">Encrypted DNS resolver</div>
                <div className="text-[10px] font-mono text-emerald-300">1.1.1.1 · DoH</div>
              </div>
            </div>
            <div className="rounded-xl bg-rose-500/10 border border-rose-400/30 p-3 flex items-center gap-3">
              <EyeOff className="h-4 w-4 text-rose-300" />
              <div>
                <div className="text-xs font-semibold">ISP DNS server</div>
                <div className="text-[10px] font-mono text-rose-300">198.51.100.7 · logs all queries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Query log */}
        <div className="mt-6 rounded-xl bg-black/50 border border-cyan-400/15 p-3 max-h-44 overflow-y-auto no-scrollbar">
          <div className="text-[10px] uppercase text-slate-500 font-mono mb-2">DNS query log</div>
          <div className="space-y-1 font-mono text-[11px]">
            {queries.map((q) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between"
              >
                <span className={q.leaked ? "text-rose-300" : "text-emerald-300"}>
                  {q.leaked ? "↯ LEAKED" : "✓ TUNNELED"}
                </span>
                <span className="text-slate-200">{q.domain}</span>
                <span className="text-slate-500">{q.leaked ? "ISP saw query" : "encrypted via VPN"}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
