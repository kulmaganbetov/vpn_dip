"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const baseLines = [
  "$ vpn-shield connect --proto wireguard --node fra-1",
  "[+] Resolving endpoint vpn.shieldlab.io ......... OK",
  "[+] Negotiating handshake (Curve25519) ........... OK",
  "[+] Deriving session keys (ChaCha20-Poly1305) ..... OK",
  "[+] Establishing tunnel mtu=1420 ................. OK",
  "[+] Routing 0.0.0.0/0, ::/0 → wg0 ................. OK",
  "[*] Kill-switch enabled · DNS leak protection ON",
  "[+] Tunnel UP · 6.4 ms · AES-256 / SHA-512 / PFS",
  "$ vpn-shield monitor --live",
  "tx: 84.2 MB/s   rx: 91.7 MB/s   drops: 0",
];

export default function Terminal({ compact = false }: { compact?: boolean }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setLines([]);
    const t = setInterval(() => {
      setLines((l) => [...l, baseLines[i]]);
      i++;
      if (i >= baseLines.length) {
        clearInterval(t);
        setDone(true);
      }
    }, 450);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`glass-strong rounded-2xl overflow-hidden ${compact ? "h-64" : "h-80"}`}>
      <div className="flex items-center gap-2 px-3 py-2 border-b border-cyan-400/15 bg-black/30">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[11px] font-mono text-slate-400">~/shield · zsh</span>
      </div>
      <div className="p-4 font-mono text-[12px] leading-relaxed text-emerald-300/90 h-[calc(100%-2.25rem)] overflow-auto no-scrollbar">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={l.startsWith("$") ? "text-cyan-300" : l.startsWith("[+]") ? "text-emerald-300" : l.startsWith("[*]") ? "text-amber-300" : "text-slate-300"}
          >
            {l}
          </motion.div>
        ))}
        {!done && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-cyan-300"
          >
            ▍
          </motion.span>
        )}
      </div>
    </div>
  );
}
