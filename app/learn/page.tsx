"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Lock, Shield, Cpu, Globe2, Wifi, Network, ChevronDown, Clock,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const lessons = [
  {
    id: "vpn",
    icon: Shield,
    title: "What is a VPN?",
    summary: "A Virtual Private Network creates an encrypted tunnel between your device and a remote exit point.",
    body: [
      "A VPN encapsulates every IP packet your device sends inside a second, encrypted packet. The outer packet is addressed to a VPN server; the inner packet — your real request — is invisible until it reaches that server.",
      "This single design choice neutralizes most local network attackers: coffee-shop Wi-Fi sniffers, hotel captive portals, hostile ISPs, network injection devices.",
      "A VPN is not anonymity. It shifts trust from your local network to the VPN provider — pick one with a real no-logs policy and modern crypto.",
    ],
    duration: "4 min",
  },
  {
    id: "encryption",
    icon: Lock,
    title: "What is encryption?",
    summary: "Encryption transforms readable data into ciphertext that's mathematically infeasible to reverse without the key.",
    body: [
      "Symmetric ciphers (AES, ChaCha20) use the same key for encryption and decryption — fast but require secure key exchange.",
      "Asymmetric ciphers (RSA, ECDSA) use a public/private keypair — slower but solve the key distribution problem.",
      "Modern protocols combine both: an asymmetric handshake to agree on a session key, then symmetric encryption for the bulk traffic.",
    ],
    duration: "6 min",
  },
  {
    id: "aes",
    icon: Cpu,
    title: "How AES works",
    summary: "AES is a block cipher operating on 128-bit blocks across 10/12/14 rounds of substitution and permutation.",
    body: [
      "Each round performs SubBytes (non-linear substitution via S-box), ShiftRows, MixColumns (linear diffusion), and AddRoundKey (XOR with derived key).",
      "AES-128 uses 10 rounds, AES-192 uses 12, AES-256 uses 14. More rounds = wider security margin.",
      "GCM mode adds authentication: every ciphertext comes with a tag that detects tampering. This is what 'AES-256-GCM' means in your TLS suite.",
    ],
    duration: "8 min",
  },
  {
    id: "tunnel",
    icon: Network,
    title: "How tunneling works",
    summary: "Tunneling wraps one protocol's packets inside another for transport across an untrusted network.",
    body: [
      "WireGuard tunnels IP-in-UDP using ChaCha20-Poly1305. Almost zero overhead, microsecond handshakes.",
      "OpenVPN tunnels TUN/TAP frames over TLS. More configurable but heavier.",
      "IPSec runs at layer 3 and is built into nearly every operating system kernel.",
    ],
    duration: "5 min",
  },
  {
    id: "sniffing",
    icon: Wifi,
    title: "What is packet sniffing?",
    summary: "Any device on a shared network can passively capture every frame transmitted in its radio range.",
    body: [
      "Tools like Wireshark, tcpdump and tshark display every packet's headers and payloads in real time.",
      "On open Wi-Fi, an attacker can capture login forms, cookies, and API tokens without sending a single packet — purely passive.",
      "Encryption is the only defense. TLS protects per-app traffic; a VPN protects every byte your device emits.",
    ],
    duration: "4 min",
  },
  {
    id: "protocols",
    icon: Globe2,
    title: "VPN protocols explained",
    summary: "WireGuard, OpenVPN, IPSec, L2TP, PPTP — strengths, weaknesses, and when to pick which.",
    body: [
      "WireGuard — fastest, simplest, modern crypto. Default choice in 2024+.",
      "OpenVPN — most configurable, runs over TCP/UDP/443, best for restrictive networks.",
      "IPSec/IKEv2 — built into every OS, excellent for mobile (rapid reconnection on network changes).",
      "L2TP — legacy. Only safe when paired with IPSec.",
      "PPTP — broken. MS-CHAPv2 was cracked in 2012. Do not use.",
    ],
    duration: "7 min",
  },
];

const timeline = [
  { year: "1995", t: "PPTP", d: "Microsoft introduces Point-to-Point Tunneling Protocol." },
  { year: "1998", t: "IPSec", d: "RFC 2401 standardizes IP-layer encryption." },
  { year: "2001", t: "OpenVPN", d: "James Yonan publishes OpenVPN — the first open-source VPN to gain mass adoption." },
  { year: "2014", t: "WireGuard concept", d: "Jason Donenfeld begins work on a kernel-level minimal VPN." },
  { year: "2020", t: "WireGuard in Linux", d: "Merged into the Linux kernel 5.6. The new default." },
  { year: "2024+", t: "Post-quantum", d: "Hybrid PQ key exchanges roll out across major VPN vendors." },
];

export default function LearnPage() {
  const [open, setOpen] = useState<string | null>("vpn");

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Learning Center"
          title="Master VPN & cryptography fundamentals"
          subtitle="Bite-sized, interactive lessons designed to take you from packet-curious to protocol-fluent."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {lessons.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <button
                  onClick={() => setOpen((o) => (o === l.id ? null : l.id))}
                  className="w-full text-left glass rounded-2xl p-5 hover:shadow-neon transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-400/30 flex items-center justify-center shrink-0">
                      <l.icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{l.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                          <Clock className="h-3 w-3" /> {l.duration}
                          <motion.div
                            animate={{ rotate: open === l.id ? 180 : 0 }}
                            className="ml-2"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">{l.summary}</p>
                      <AnimatePresence>
                        {open === l.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-2 text-sm text-slate-300 leading-relaxed">
                              {l.body.map((p, j) => (
                                <p key={j} className="pl-3 border-l border-cyan-400/30">{p}</p>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div>
            <GlassCard hoverLift={false}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-violet-300" />
                <h3 className="font-semibold">VPN timeline</h3>
              </div>
              <div className="relative pl-5">
                <div className="absolute left-1.5 top-1 bottom-1 w-px bg-gradient-to-b from-cyan-400 via-violet-400 to-pink-400" />
                {timeline.map((e, i) => (
                  <motion.div
                    key={e.year}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative pb-5"
                  >
                    <div className="absolute -left-[14px] top-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    <div className="text-[10px] font-mono text-cyan-300">{e.year}</div>
                    <div className="text-sm font-semibold">{e.t}</div>
                    <div className="text-xs text-slate-400">{e.d}</div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mt-4">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Quick facts</div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• AES-256 keyspace ≈ <span className="font-mono text-cyan-300">2^256</span> ≈ atoms in the observable universe.</li>
                <li>• WireGuard handshake takes ~<span className="font-mono text-cyan-300">1 RTT</span>.</li>
                <li>• A modern GPU can try ~<span className="font-mono text-cyan-300">10^10</span> MD5 hashes/sec.</li>
                <li>• Public Wi-Fi captures ~<span className="font-mono text-cyan-300">90%</span> of unencrypted traffic.</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
