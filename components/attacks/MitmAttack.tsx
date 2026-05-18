"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Server, Skull, Shield, Lock, AlertTriangle } from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";

export default function MitmAttack() {
  const [vpn, setVpn] = useState(false);
  const [packets, setPackets] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const t = setInterval(() => {
      setPackets((p) => [...p.slice(-8), { id: id++, x: 0 }]);
    }, 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-mono text-rose-300 uppercase tracking-wider">Attack 01</div>
          <h3 className="text-2xl font-bold">Man-in-the-Middle</h3>
          <p className="mt-1 text-sm text-slate-400">An attacker sits between your device and the destination, silently relaying traffic.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">VPN</span>
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

      <div className="relative rounded-2xl bg-black/40 border border-cyan-400/20 p-8 h-72 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

        <div className="relative h-full flex items-center justify-between">
          <NodeIcon icon={<User className="h-7 w-7" />} label="Client" color="cyan" />
          <div className="flex-1 mx-6 relative">
            {/* line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/40 via-rose-400/60 to-cyan-400/40" />

            {/* attacker in the middle */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`h-14 w-14 rounded-2xl flex items-center justify-center border-2 ${
                  vpn ? "bg-slate-800/60 border-slate-600" : "bg-rose-500/20 border-rose-400 shadow-[0_0_24px_rgba(239,68,68,0.6)]"
                }`}
              >
                <Skull className={`h-6 w-6 ${vpn ? "text-slate-500" : "text-rose-300"}`} />
              </motion.div>
              <span className={`mt-2 text-[10px] font-mono uppercase ${vpn ? "text-slate-500" : "text-rose-300"}`}>Attacker</span>
            </div>

            {/* packets */}
            <AnimatePresence>
              {packets.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.4, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 flex items-center"
                >
                  <div
                    className={`px-2 py-1 rounded text-[10px] font-mono ${
                      vpn
                        ? "bg-emerald-500/20 border border-emerald-400/40 text-emerald-200"
                        : "bg-amber-500/20 border border-amber-400/40 text-amber-200"
                    }`}
                  >
                    {vpn ? `A1 ${(p.id * 31).toString(16).toUpperCase()}` : `pwd=${(123456 + p.id).toString()}`}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <NodeIcon icon={<Server className="h-7 w-7" />} label="Server" color="violet" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className={`rounded-xl p-4 border ${vpn ? "bg-slate-900/40 border-slate-700" : "bg-rose-500/10 border-rose-400/30"}`}>
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-4 w-4 ${vpn ? "text-slate-500" : "text-rose-300"}`} />
            <span className="text-sm font-semibold">Without VPN</span>
          </div>
          <p className={`mt-2 text-xs leading-relaxed ${vpn ? "text-slate-500" : "text-rose-200"}`}>
            Attacker reads &amp; modifies plaintext: <span className="font-mono">pwd=123456</span>, session cookies, form data.
          </p>
        </div>
        <div className={`rounded-xl p-4 border ${vpn ? "bg-emerald-500/10 border-emerald-400/30" : "bg-slate-900/40 border-slate-700"}`}>
          <div className="flex items-center gap-2">
            <Shield className={`h-4 w-4 ${vpn ? "text-emerald-300" : "text-slate-500"}`} />
            <span className="text-sm font-semibold">With VPN</span>
          </div>
          <p className={`mt-2 text-xs leading-relaxed ${vpn ? "text-emerald-200" : "text-slate-500"}`}>
            Attacker sees only opaque ciphertext, no decryptable payload — MITM neutralized.
          </p>
        </div>
      </div>
    </div>
  );
}

function NodeIcon({ icon, label, color }: { icon: React.ReactNode; label: string; color: "cyan" | "violet" }) {
  const ring = color === "cyan" ? "glow-ring" : "glow-ring-violet";
  return (
    <div className="flex flex-col items-center">
      <div className={`h-16 w-16 rounded-2xl bg-black/60 flex items-center justify-center ${ring}`}>
        <span className={color === "cyan" ? "text-cyan-300" : "text-violet-300"}>{icon}</span>
      </div>
      <span className="mt-2 text-[10px] font-mono uppercase text-slate-400">{label}</span>
    </div>
  );
}
