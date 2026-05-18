"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, ShieldCheck } from "lucide-react";

type Msg = { role: "ai" | "user"; text: string };

const greetings = [
  "I'm Shield AI — your real-time cybersecurity copilot. Ask me about VPN protocols, encryption, or attacks.",
];

const replies = (q: string): string => {
  const s = q.toLowerCase();
  if (s.includes("aes")) return "AES-256-GCM is the current industry standard. Even with all global compute, a brute-force attack would take ~10^54 years.";
  if (s.includes("wireguard")) return "WireGuard uses ChaCha20-Poly1305 and Curve25519. It has ~4,000 lines of code vs OpenVPN's ~70,000 — easier to audit, faster to handshake.";
  if (s.includes("mitm") || s.includes("man in the middle")) return "Without TLS pinning, MITM is trivial on open Wi-Fi. A VPN tunnel encrypts the L3 payload end-to-end, so the attacker only sees opaque bytes.";
  if (s.includes("dns")) return "DNS leaks happen when the OS bypasses the VPN's DNS resolver. Use a VPN with built-in DNS, kill-switch, and IPv6 leak protection.";
  if (s.includes("brute")) return "AES-256 has 2^256 keyspace. Even at 10^18 keys/sec, you'd exhaust the universe before getting close.";
  if (s.includes("protocol")) return "Top tier: WireGuard, OpenVPN, IPSec/IKEv2. Avoid: PPTP (broken), L2TP without IPSec.";
  return "Try asking about AES-256, WireGuard, OpenVPN, MITM attacks, brute-force timing, or DNS leaks. I have answers on all of them.";
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: greetings[0] },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: replies(q) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500 via-violet-500 to-pink-500 shadow-neon flex items-center justify-center group"
        aria-label="Open AI Assistant"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 blur-md opacity-60 group-hover:opacity-90 transition" />
        {open ? <X className="relative h-6 w-6 text-white" /> : <Bot className="relative h-6 w-6 text-white" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass-strong rounded-2xl overflow-hidden shadow-neon-violet flex flex-col"
          >
            <div className="px-4 py-3 border-b border-cyan-400/15 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-violet-500/10">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  <div className="absolute inset-0 blur-md bg-cyan-400/40" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Shield AI</div>
                  <div className="text-[10px] text-emerald-300 flex items-center gap-1 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Encrypted · Online
                  </div>
                </div>
              </div>
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>

            <div
              ref={scrollRef}
              className="flex-1 max-h-80 overflow-y-auto p-3 space-y-2 no-scrollbar"
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-cyan-500/20 border border-cyan-400/30 text-white"
                        : "bg-white/5 border border-white/10 text-slate-200"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-cyan-400/15">
              <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about VPN, AES, attacks…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-500"
                />
                <button
                  onClick={send}
                  className="p-1.5 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 hover:shadow-neon transition"
                  aria-label="Send"
                >
                  <Send className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
