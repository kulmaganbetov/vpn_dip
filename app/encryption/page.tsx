"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, KeyRound, Cpu, Sparkles, Copy, RefreshCcw, ArrowRight, Binary,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import GlowButton from "@/components/ui/GlowButton";
import { pseudoEncrypt, randomHex } from "@/lib/utils";

const algos = [
  { id: "AES-128", desc: "128-bit symmetric block cipher · 10 rounds · Rijndael", strength: 4 },
  { id: "AES-256", desc: "256-bit symmetric block cipher · 14 rounds · NIST gold standard", strength: 5 },
  { id: "ChaCha20", desc: "256-bit stream cipher · used by WireGuard · constant-time", strength: 5 },
  { id: "RSA", desc: "Asymmetric · 2048-bit key · used for key exchange and signatures", strength: 5 },
] as const;

type Algo = (typeof algos)[number]["id"];

export default function EncryptionPage() {
  const [text, setText] = useState("password=123456&token=admin-session");
  const [algo, setAlgo] = useState<Algo>("AES-256");
  const [output, setOutput] = useState("");
  const [phase, setPhase] = useState<"idle" | "scrambling" | "done">("idle");
  const [keyHex, setKeyHex] = useState(() => randomHex(32));
  const [stream, setStream] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setStream((s) => [randomHex(24), ...s].slice(0, 14));
      i++;
    }, 250);
    return () => clearInterval(t);
  }, []);

  const handleEncrypt = async () => {
    setPhase("scrambling");
    setOutput("");
    const target = pseudoEncrypt(text, algo);
    const chars = target.split("");
    let cur = "";
    for (let i = 0; i < chars.length; i++) {
      // brief scrambling on each char
      for (let j = 0; j < 4; j++) {
        const scrambled = chars[i] === " " ? " " : "0123456789ABCDEF"[Math.floor(Math.random() * 16)];
        setOutput(cur + scrambled);
        await new Promise((r) => setTimeout(r, 6));
      }
      cur += chars[i];
      setOutput(cur);
    }
    setPhase("done");
  };

  const reset = () => {
    setOutput("");
    setPhase("idle");
    setKeyHex(randomHex(32));
  };

  const bits = useMemo(() => Array.from({ length: 96 }, () => Math.round(Math.random())), [phase, output]);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Encryption Visualizer"
          title="Watch bytes become ciphertext"
          subtitle="Type any string, pick a cipher and watch the live transformation — bit scrambling, key derivation, packet encapsulation."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Algorithm selector */}
          <GlassCard className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <KeyRound className="h-4 w-4 text-cyan-300" />
              <h3 className="font-semibold">Algorithm</h3>
            </div>
            <div className="space-y-2">
              {algos.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAlgo(a.id)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    algo === a.id
                      ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-400/40 shadow-neon"
                      : "border-white/10 hover:border-cyan-400/30 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-semibold">{a.id}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 w-3 rounded-full ${
                            i < a.strength ? "bg-cyan-400" : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400">{a.desc}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-xl bg-black/30 border border-cyan-400/20">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400">
                <span>Session Key</span>
                <button onClick={() => setKeyHex(randomHex(32))}>
                  <RefreshCcw className="h-3 w-3 text-cyan-300" />
                </button>
              </div>
              <div className="mt-2 font-mono text-[11px] text-cyan-300 break-all">{keyHex}</div>
            </div>
          </GlassCard>

          {/* Input / output */}
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-300" />
                <h3 className="font-semibold">Encryption Chamber</h3>
              </div>
              <span className={`text-[10px] font-mono ${phase === "done" ? "text-emerald-300" : "text-slate-400"}`}>
                {phase === "idle" && "READY"}
                {phase === "scrambling" && "ENCRYPTING…"}
                {phase === "done" && "✓ ENCRYPTED"}
              </span>
            </div>

            <label className="text-[10px] uppercase tracking-wider text-slate-400">Plaintext input</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-2 w-full h-28 resize-none rounded-xl bg-black/40 border border-white/10 px-4 py-3 font-mono text-sm text-amber-200 focus:outline-none focus:border-cyan-400/50 focus:shadow-neon transition"
              placeholder="Type any text…"
            />

            <div className="my-6 flex items-center gap-3">
              <GlowButton onClick={handleEncrypt} disabled={phase === "scrambling"}>
                <Lock className="h-4 w-4" />
                {phase === "scrambling" ? "Encrypting…" : "Encrypt"}
              </GlowButton>
              <GlowButton variant="ghost" onClick={reset}>
                <RefreshCcw className="h-4 w-4" />
                Reset
              </GlowButton>
              <button
                onClick={() => output && navigator.clipboard?.writeText(output)}
                className="ml-auto text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> Copy ciphertext
              </button>
            </div>

            <label className="text-[10px] uppercase tracking-wider text-slate-400">Ciphertext output ({algo})</label>
            <div className="mt-2 relative rounded-xl bg-black/50 border border-cyan-400/30 p-4 font-mono text-sm text-cyan-200 min-h-[110px] break-all scanline">
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase + output.length}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {output || (
                    <span className="text-slate-600 italic">
                      Press Encrypt to transform your input into {algo} ciphertext…
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bit scrambling lane */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-slate-400 mb-2">
                <Binary className="h-3 w-3" /> Bit scrambling
              </div>
              <div className="flex flex-wrap gap-1">
                {bits.map((b, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.005 }}
                    className={`h-5 w-5 rounded text-[10px] font-mono flex items-center justify-center ${
                      b ? "bg-cyan-500/20 text-cyan-300" : "bg-violet-500/10 text-violet-300"
                    }`}
                  >
                    {b}
                  </motion.span>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Tunnel encapsulation diagram */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="h-4 w-4 text-pink-300" />
              <h3 className="font-semibold">Packet encapsulation pipeline</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { l: "Payload", c: "from-amber-500 to-pink-500", t: "Your raw bytes" },
                { l: "+ Header", c: "from-pink-500 to-violet-500", t: "IP / TCP framing" },
                { l: "+ Cipher", c: "from-violet-500 to-cyan-500", t: algo + " encryption" },
                { l: "+ MAC", c: "from-cyan-500 to-emerald-400", t: "Integrity tag" },
                { l: "= Tunnel", c: "from-emerald-400 to-cyan-300", t: "Carrier packet" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  <div className={`rounded-xl p-4 bg-gradient-to-br ${s.c} text-slate-900`}>
                    <div className="text-xs font-bold uppercase">{s.l}</div>
                    <div className="mt-1 text-[10px] font-medium opacity-80">{s.t}</div>
                  </div>
                  {i < 4 && (
                    <ArrowRight className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-cyan-300" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Key exchange animation */}
            <div className="mt-6 rounded-xl bg-black/40 p-4 border border-cyan-400/20">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-3">Diffie-Hellman key exchange</div>
              <div className="grid grid-cols-3 items-center gap-3">
                <div className="text-center">
                  <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-cyan-300 flex items-center justify-center text-slate-900 font-bold">A</div>
                  <div className="mt-2 text-xs text-cyan-300 font-mono">Client</div>
                  <div className="text-[10px] text-slate-500 font-mono">priv: a · pub: g^a</div>
                </div>
                <div className="relative h-2">
                  <div className="absolute inset-0 rounded-full bg-white/5" />
                  <motion.div
                    animate={{ x: ["-50%", "100%"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 -translate-y-1/2 h-1.5 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400"
                  />
                </div>
                <div className="text-center">
                  <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold">B</div>
                  <div className="mt-2 text-xs text-pink-300 font-mono">Server</div>
                  <div className="text-[10px] text-slate-500 font-mono">priv: b · pub: g^b</div>
                </div>
              </div>
              <div className="mt-3 text-center text-[11px] font-mono text-emerald-300">
                shared = g^(a·b) mod p   →   key derived ✓
              </div>
            </div>
          </GlassCard>

          {/* Binary stream */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Binary className="h-4 w-4 text-emerald-300" />
              <h3 className="font-semibold">Live binary stream</h3>
            </div>
            <div className="rounded-xl bg-black/50 p-3 h-[340px] overflow-hidden border border-cyan-400/20 font-mono text-[11px] text-emerald-300 space-y-1">
              {stream.map((s, i) => (
                <motion.div
                  key={i + s}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ opacity: 1 - i * 0.06 }}
                >
                  <span className="text-slate-500">{(0x80 + i).toString(16).toUpperCase().padStart(4, "0")}:</span> {s}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
