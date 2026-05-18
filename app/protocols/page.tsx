"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import { Shield, Zap, Cpu, Activity, KeyRound, Gauge, Network } from "lucide-react";
import { cn } from "@/lib/utils";

type Protocol = {
  id: string;
  color: string;
  short: string;
  desc: string;
  cipher: string;
  released: string;
  metrics: {
    security: number;
    speed: number;
    latency: number;
    cpu: number;
    encryption: number;
    stability: number;
  };
};

const protocols: Protocol[] = [
  {
    id: "WireGuard",
    color: "#22d3ee",
    short: "WG",
    desc: "Modern, minimal, blazing-fast — ChaCha20-Poly1305 with Curve25519 handshakes.",
    cipher: "ChaCha20-Poly1305",
    released: "2018",
    metrics: { security: 95, speed: 98, latency: 96, cpu: 92, encryption: 95, stability: 92 },
  },
  {
    id: "OpenVPN",
    color: "#a855f7",
    short: "OV",
    desc: "Battle-tested, extremely configurable, runs over UDP or TCP.",
    cipher: "AES-256-GCM",
    released: "2001",
    metrics: { security: 92, speed: 78, latency: 76, cpu: 70, encryption: 95, stability: 95 },
  },
  {
    id: "IPSec",
    color: "#ec4899",
    short: "IP",
    desc: "Enterprise standard. IKEv2 mobility, used by every major site-to-site VPN.",
    cipher: "AES-256-GCM",
    released: "1998",
    metrics: { security: 90, speed: 82, latency: 80, cpu: 75, encryption: 90, stability: 90 },
  },
  {
    id: "L2TP",
    color: "#f59e0b",
    short: "L2",
    desc: "Layer-2 tunneling, almost always paired with IPSec for actual security.",
    cipher: "AES-256 (w/IPSec)",
    released: "1999",
    metrics: { security: 70, speed: 65, latency: 60, cpu: 65, encryption: 75, stability: 85 },
  },
  {
    id: "PPTP",
    color: "#ef4444",
    short: "PP",
    desc: "Legacy protocol. Cryptographically broken — included for educational comparison.",
    cipher: "MPPE (broken)",
    released: "1995",
    metrics: { security: 20, speed: 90, latency: 88, cpu: 95, encryption: 18, stability: 70 },
  },
];

const radarKeys = [
  { key: "security", label: "Security" },
  { key: "speed", label: "Speed" },
  { key: "latency", label: "Latency" },
  { key: "cpu", label: "CPU Efficiency" },
  { key: "encryption", label: "Encryption" },
  { key: "stability", label: "Stability" },
] as const;

const throughputSeries = Array.from({ length: 24 }, (_, i) => ({
  t: `${i}:00`,
  WireGuard: 800 + Math.sin(i / 3) * 40 + Math.random() * 80,
  OpenVPN: 600 + Math.sin(i / 4) * 30 + Math.random() * 60,
  IPSec: 700 + Math.sin(i / 3.5) * 35 + Math.random() * 60,
  L2TP: 480 + Math.random() * 40,
  PPTP: 740 + Math.random() * 30,
}));

export default function ProtocolsPage() {
  const [active, setActive] = useState<string[]>(["WireGuard", "OpenVPN", "IPSec"]);

  const toggle = (id: string) =>
    setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const radarData = radarKeys.map((rk) => {
    const row: Record<string, number | string> = { metric: rk.label };
    for (const p of protocols) {
      if (active.includes(p.id)) row[p.id] = p.metrics[rk.key];
    }
    return row;
  });

  const barData = protocols
    .filter((p) => active.includes(p.id))
    .map((p) => ({
      name: p.id,
      Security: p.metrics.security,
      Speed: p.metrics.speed,
      Encryption: p.metrics.encryption,
    }));

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Protocol Dashboard"
          title="Compare every major VPN protocol"
          subtitle="Toggle protocols on and off — radar, throughput and metric breakdowns update in real time."
        />

        {/* Protocol cards */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {protocols.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggle(p.id)}
              className={cn(
                "text-left glass rounded-2xl p-4 relative overflow-hidden transition-all duration-300 group",
                active.includes(p.id)
                  ? "shadow-neon border-cyan-400/30"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <div
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-50 transition group-hover:opacity-70"
                style={{ background: p.color }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div
                    className="h-9 w-9 rounded-lg flex items-center justify-center font-bold text-slate-900"
                    style={{ background: p.color }}
                  >
                    {p.short}
                  </div>
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      active.includes(p.id) ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                    )}
                  />
                </div>
                <div className="mt-3 font-bold">{p.id}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">{p.cipher}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">since {p.released}</div>
                <div className="mt-3 space-y-1">
                  <Mini label="Sec" v={p.metrics.security} c={p.color} />
                  <Mini label="Speed" v={p.metrics.speed} c={p.color} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Charts row */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-300" />
                <h3 className="font-semibold">Radar comparison</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">6 axes · normalized 0-100</span>
            </div>
            <div className="mt-2 h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(120,200,255,0.15)" />
                  <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis stroke="rgba(120,200,255,0.2)" tick={{ fontSize: 9, fill: "#64748b" }} />
                  {protocols
                    .filter((p) => active.includes(p.id))
                    .map((p) => (
                      <Radar
                        key={p.id}
                        name={p.id}
                        dataKey={p.id}
                        stroke={p.color}
                        fill={p.color}
                        fillOpacity={0.18}
                        strokeWidth={2}
                      />
                    ))}
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-violet-300" />
              <h3 className="font-semibold">Top metrics</h3>
            </div>
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,200,255,0.08)" />
                  <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Security" fill="#22d3ee" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="Speed" fill="#a855f7" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="Encryption" fill="#ec4899" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Throughput */}
        <GlassCard className="mt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-pink-300" />
              <h3 className="font-semibold">24h throughput timeline (Mb/s)</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">simulated edge telemetry</span>
          </div>
          <div className="mt-4 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={throughputSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(120,200,255,0.08)" />
                <XAxis dataKey="t" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {protocols
                  .filter((p) => active.includes(p.id))
                  .map((p) => (
                    <Line
                      key={p.id}
                      type="monotone"
                      dataKey={p.id}
                      stroke={p.color}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: p.color }}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Metric tiles */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: Shield, label: "Avg Security", value: avg(active, "security") + "/100", color: "text-cyan-300" },
            { icon: Zap, label: "Avg Speed", value: avg(active, "speed") + "/100", color: "text-violet-300" },
            { icon: Gauge, label: "Avg Latency", value: avg(active, "latency") + "/100", color: "text-pink-300" },
            { icon: Cpu, label: "Avg CPU eff.", value: avg(active, "cpu") + "/100", color: "text-amber-300" },
            { icon: KeyRound, label: "Encryption", value: avg(active, "encryption") + "/100", color: "text-emerald-300" },
            { icon: Network, label: "Stability", value: avg(active, "stability") + "/100", color: "text-rose-300" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4"
            >
              <m.icon className={`h-4 w-4 ${m.color}`} />
              <div className="mt-2 text-xl font-bold font-mono">{m.value}</div>
              <div className="text-[10px] uppercase text-slate-500 tracking-wider">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Recommendation */}
        <GlassCard className="mt-8">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Shield Lab recommendation</h3>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                For most users, <span className="text-cyan-300 font-semibold">WireGuard</span> offers
                the best blend of speed, security, and simplicity. <span className="text-violet-300 font-semibold">OpenVPN</span> remains the
                most flexible and mature option for restrictive networks. Avoid{" "}
                <span className="text-rose-300 font-semibold">PPTP</span> entirely — its MS-CHAPv2 authentication has been cracked since 2012.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Mini({ label, v, c }: { label: string; v: number; c: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] uppercase text-slate-500 w-8">{label}</span>
      <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${v}%`, background: c }} />
      </div>
      <span className="text-[9px] font-mono text-slate-400">{v}</span>
    </div>
  );
}

function avg(active: string[], k: keyof Protocol["metrics"]) {
  const list = protocols.filter((p) => active.includes(p.id));
  if (!list.length) return 0;
  return Math.round(list.reduce((s, p) => s + p.metrics[k], 0) / list.length);
}

const tooltipStyle: React.CSSProperties = {
  background: "rgba(10,15,28,0.95)",
  border: "1px solid rgba(34,211,238,0.3)",
  borderRadius: 8,
  fontSize: 11,
  color: "#e2e8f0",
};
