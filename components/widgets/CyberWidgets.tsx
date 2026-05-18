"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Wifi, Cpu, Lock, Globe2, ChevronRight, Eye } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export function ConnectionStatusWidget() {
  const [latency, setLatency] = useState(6);
  const [up, setUp] = useState(942);
  const [down, setDown] = useState(871);
  useEffect(() => {
    const t = setInterval(() => {
      setLatency((l) => Math.max(2, Math.min(15, l + (Math.random() - 0.5) * 2)));
      setUp((v) => Math.max(700, Math.min(1000, v + (Math.random() - 0.5) * 20)));
      setDown((v) => Math.max(600, Math.min(1000, v + (Math.random() - 0.5) * 25)));
    }, 1100);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-4 w-64"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider">Tunnel Status</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-300 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SECURE
        </span>
      </div>
      <div className="mt-3 space-y-2 text-xs font-mono">
        <Row label="Cipher" value="AES-256-GCM" color="text-cyan-300" />
        <Row label="Protocol" value="WireGuard" color="text-violet-300" />
        <Row label="Exit IP" value="185.213.155.41" color="text-pink-300" />
        <Row label="Latency" value={`${Math.round(latency)} ms`} color="text-emerald-300" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-cyan-500/10 border border-cyan-400/20 p-2 text-center">
          <div className="text-[10px] uppercase text-slate-400">Down</div>
          <div className="text-sm font-bold text-cyan-300">{Math.round(down)} Mb/s</div>
        </div>
        <div className="rounded-lg bg-violet-500/10 border border-violet-400/20 p-2 text-center">
          <div className="text-[10px] uppercase text-slate-400">Up</div>
          <div className="text-sm font-bold text-violet-300">{Math.round(up)} Mb/s</div>
        </div>
      </div>
    </motion.div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={color}>{value}</span>
    </div>
  );
}

export function PacketMonitor() {
  const [packets, setPackets] = useState<{ id: number; src: string; dst: string; size: number; enc: boolean }[]>([]);
  useEffect(() => {
    let id = 0;
    const t = setInterval(() => {
      const ips = ["10.0.0.4", "192.168.1.21", "172.16.5.2", "10.0.0.18"];
      const dsts = ["8.8.8.8", "1.1.1.1", "104.21.32.5", "151.101.1.69"];
      setPackets((p) =>
        [
          {
            id: id++,
            src: ips[Math.floor(Math.random() * ips.length)],
            dst: dsts[Math.floor(Math.random() * dsts.length)],
            size: Math.floor(64 + Math.random() * 1400),
            enc: Math.random() > 0.15,
          },
          ...p,
        ].slice(0, 6)
      );
    }, 700);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-2xl p-4 w-72"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-cyan-300" />
          <span className="text-xs font-semibold uppercase tracking-wider">Packet Monitor</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">eth0 · 1Gbps</span>
      </div>
      <div className="mt-3 space-y-1 font-mono text-[10px]">
        {packets.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between rounded bg-white/5 px-2 py-1"
          >
            <span className="text-slate-400">{p.src}</span>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            <span className="text-slate-300">{p.dst}</span>
            <span className="text-slate-500">{p.size}B</span>
            {p.enc ? (
              <Lock className="h-3 w-3 text-emerald-400" />
            ) : (
              <Eye className="h-3 w-3 text-amber-400" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ThreatCounter() {
  const [count, setCount] = useState(248173);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 4) + 1), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass rounded-2xl p-4 w-60"
    >
      <div className="flex items-center gap-2">
        <Cpu className="h-4 w-4 text-rose-400" />
        <span className="text-xs font-semibold uppercase tracking-wider">Attacks Blocked</span>
      </div>
      <div className="mt-2 text-3xl font-bold gradient-text font-mono">{formatNumber(count)}</div>
      <div className="text-[10px] text-slate-400 mt-1">Across 92 edge nodes globally</div>
      <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className="h-full w-1/2 bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500"
        />
      </div>
    </motion.div>
  );
}

export function IPLocationWidget() {
  const locations = [
    { ip: "185.213.155.41", city: "Frankfurt", flag: "🇩🇪" },
    { ip: "104.21.32.18", city: "San Francisco", flag: "🇺🇸" },
    { ip: "13.41.55.221", city: "London", flag: "🇬🇧" },
    { ip: "175.45.176.21", city: "Tokyo", flag: "🇯🇵" },
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % locations.length), 2500);
    return () => clearInterval(t);
  }, []);
  const loc = locations[idx];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass rounded-2xl p-4 w-60"
    >
      <div className="flex items-center gap-2">
        <Globe2 className="h-4 w-4 text-violet-400" />
        <span className="text-xs font-semibold uppercase tracking-wider">Apparent Origin</span>
      </div>
      <motion.div
        key={loc.ip}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2"
      >
        <div className="text-2xl">{loc.flag}</div>
        <div className="text-sm font-semibold text-white">{loc.city}</div>
        <div className="text-[11px] font-mono text-slate-400">{loc.ip}</div>
      </motion.div>
    </motion.div>
  );
}
