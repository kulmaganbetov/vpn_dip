"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hammer, Lock, KeyRound, Timer, Cpu } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import { formatNumber } from "@/lib/utils";

type Mode = "weak" | "aes128" | "aes256";

const config: Record<Mode, { keyspace: string; rate: number; label: string; color: string; eta: string; bits: number }> = {
  weak: {
    label: "MD5 6-char password",
    bits: 32,
    keyspace: "~2^32",
    rate: 5_000_000_000, // 5 GH/s
    color: "from-rose-500 to-red-500",
    eta: "~14 seconds on a single GPU",
  },
  aes128: {
    label: "AES-128",
    bits: 128,
    keyspace: "~2^128",
    rate: 1_000_000_000,
    color: "from-amber-500 to-pink-500",
    eta: "~10^22 years (universe age × trillions)",
  },
  aes256: {
    label: "AES-256",
    bits: 256,
    keyspace: "~2^256",
    rate: 1_000_000_000,
    color: "from-cyan-500 to-violet-500",
    eta: "~10^54 years (heat-death scale)",
  },
};

export default function BruteForce() {
  const [mode, setMode] = useState<Mode>("weak");
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [found, setFound] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [attempts, setAttempts] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const start = () => {
    setRunning(true);
    setCount(0);
    setProgress(0);
    setFound(false);
    setAttempts([]);
    const cfg = config[mode];

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCount((c) => c + Math.floor(cfg.rate / 5));
      const tryPwd =
        mode === "weak"
          ? makePassword()
          : Array.from({ length: cfg.bits / 8 })
              .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase())
              .join("");
      setAttempts((a) => [tryPwd, ...a].slice(0, 8));

      setProgress((p) => {
        const inc = mode === "weak" ? 1.5 : 0.0001;
        const next = Math.min(100, p + inc);
        if (mode === "weak" && next >= 100) {
          setFound(true);
          setRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return next;
      });
    }, 90);
  };

  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const cfg = config[mode];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-mono text-rose-300 uppercase tracking-wider">Attack 04</div>
          <h3 className="text-2xl font-bold">Brute Force Simulator</h3>
          <p className="mt-1 text-sm text-slate-400">Watch why AES-256 is mathematically untouchable — and weak passwords aren't.</p>
        </div>
        <div className="flex gap-2">
          {(Object.keys(config) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                stop();
                setCount(0);
                setProgress(0);
                setFound(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider border transition ${
                mode === m
                  ? `bg-gradient-to-r ${config[m].color} text-slate-900 border-transparent`
                  : "border-white/10 text-slate-400 hover:border-cyan-400/30"
              }`}
            >
              {m === "weak" ? "Weak pwd" : m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-2xl bg-black/40 border border-cyan-400/20 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Hammer className="h-4 w-4 text-rose-300" />
              <span className="font-semibold">{cfg.label}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              keyspace {cfg.keyspace} · rate {formatNumber(cfg.rate)}/s
            </div>
          </div>

          {/* progress bar */}
          <div className="h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className={`h-full bg-gradient-to-r ${cfg.color}`}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">progress: {progress.toFixed(mode === "weak" ? 1 : 6)}%</span>
            <span className={found ? "text-emerald-300" : "text-slate-400"}>
              attempts: {formatNumber(count)}
            </span>
          </div>

          {/* current tries */}
          <div className="mt-5 grid grid-cols-2 gap-2 font-mono text-[11px]">
            {attempts.map((a, i) => (
              <motion.div
                key={i + a}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded bg-white/5 px-2 py-1 truncate ${
                  i === 0 ? (found ? "text-emerald-300" : "text-cyan-300") : "text-slate-500"
                }`}
              >
                try → {a}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            {!running ? (
              <GlowButton onClick={start} variant={mode === "weak" ? "danger" : "primary"}>
                <Hammer className="h-4 w-4" /> Start brute force
              </GlowButton>
            ) : (
              <GlowButton onClick={stop} variant="ghost">
                Stop
              </GlowButton>
            )}
            {found && (
              <span className="text-sm text-emerald-300 flex items-center gap-2">
                <KeyRound className="h-4 w-4" /> Cracked! Weak passwords are not safe.
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Tile icon={Timer} label="Estimated time" value={cfg.eta} />
          <Tile icon={Cpu} label="Hardware" value={mode === "weak" ? "1× RTX 4090" : "Earth-scale GPU farm"} />
          <Tile icon={Lock} label="Encryption" value={cfg.label} />
          <Tile icon={KeyRound} label="Key bits" value={`${cfg.bits} bits`} />
        </div>
      </div>
    </div>
  );
}

function Tile({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-cyan-300" />
        <span className="text-[10px] uppercase text-slate-500 tracking-wider">{label}</span>
      </div>
      <div className="mt-1 text-sm font-mono text-white">{value}</div>
    </div>
  );
}

function makePassword() {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += charset[Math.floor(Math.random() * charset.length)];
  return s;
}
