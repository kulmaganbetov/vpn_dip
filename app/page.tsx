"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield, Lock, Network, Zap, Eye, Globe2, Cpu, KeyRound, ArrowRight, Sparkles, Activity, Server,
} from "lucide-react";
import GlowButton from "@/components/ui/GlowButton";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  ConnectionStatusWidget, PacketMonitor, ThreatCounter, IPLocationWidget,
} from "@/components/widgets/CyberWidgets";
import Terminal from "@/components/widgets/Terminal";

const VpnTunnel = dynamic(() => import("@/components/three/VpnTunnel"), { ssr: false });
const GlobeNetwork = dynamic(() => import("@/components/three/GlobeNetwork"), { ssr: false });

const stats = [
  { label: "Throughput", value: "942 Mb/s", icon: Zap, color: "text-cyan-300" },
  { label: "Edge Nodes", value: "92", icon: Server, color: "text-violet-300" },
  { label: "Encryption", value: "AES-256-GCM", icon: KeyRound, color: "text-pink-300" },
  { label: "Uptime", value: "99.998%", icon: Activity, color: "text-emerald-300" },
];

const features = [
  { icon: Lock, title: "Military-grade Encryption", text: "AES-256-GCM with Curve25519 ECDHE handshakes and Perfect Forward Secrecy on every session." },
  { icon: Eye, title: "Live Packet Inspection", text: "Cinematic visualization of encrypted vs. plaintext traffic with per-packet metadata." },
  { icon: Network, title: "Multi-Protocol Engine", text: "Side-by-side analysis of WireGuard, OpenVPN, IPSec, L2TP and PPTP — pick the right tool." },
  { icon: Cpu, title: "Attack Simulator Lab", text: "Run MITM, packet sniffing, DNS leak and brute-force scenarios safely in your browser." },
  { icon: Globe2, title: "Global Edge Topology", text: "Real-time 3D map of node-to-node tunnels routing your packets through the safest path." },
  { icon: Shield, title: "Zero-Knowledge Routing", text: "No logs, no metadata leakage. Verified by interactive forensic walkthroughs." },
];

export default function HomePage() {
  return (
    <div className="pt-32">
      {/* HERO */}
      <section className="relative">
        <div className="absolute -top-20 inset-x-0 h-[120vh] -z-10">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] opacity-90">
            <VpnTunnel />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-bg/40 to-cyber-bg pointer-events-none" />
        </div>

        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-cyan-400/30 text-[11px] uppercase tracking-[0.25em] font-mono text-cyan-300"
            >
              <Sparkles className="h-3 w-3" />
              v4.7 · Cinematic Cyber Lab
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight"
            >
              <span className="block">Interactive platform for</span>
              <span className="block gradient-text">VPN encryption</span>
              <span className="block">& cyber attack analysis</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed"
            >
              See exactly how a VPN tunnel encapsulates your traffic, watch packets
              transform into ciphertext in real time, and run authentic cyber attack
              simulations — all inside one cinematic dashboard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/encryption">
                <GlowButton size="lg">
                  Launch Encryption Visualizer
                  <ArrowRight className="h-4 w-4" />
                </GlowButton>
              </Link>
              <Link href="/attacks">
                <GlowButton size="lg" variant="ghost">
                  <Eye className="h-4 w-4" />
                  Watch Attack Demo
                </GlowButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="glass rounded-xl p-3"
                >
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                  <div className="mt-1 text-lg font-bold font-mono">{s.value}</div>
                  <div className="text-[10px] uppercase text-slate-500 tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating widget cluster */}
          <div className="lg:col-span-5 relative h-[600px] hidden lg:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0"
            >
              <ConnectionStatusWidget />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-40 left-0"
            >
              <PacketMonitor />
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-4"
            >
              <ThreatCounter />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 left-12"
            >
              <IPLocationWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT IS VPN */}
      <section className="mt-32 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Foundation"
              title="What is a VPN, really?"
              subtitle="A Virtual Private Network builds an encrypted tunnel between your device and a trusted exit point. Every byte that travels through it is wrapped in cryptography before it ever touches the public internet."
            />
            <div className="mt-8 space-y-3">
              {[
                { t: "Encapsulation", d: "Your IP packets are wrapped inside encrypted carrier packets." },
                { t: "Authentication", d: "Each session is mutually verified using cryptographic certificates." },
                { t: "Confidentiality", d: "Payloads are scrambled with symmetric ciphers like AES-256-GCM." },
                { t: "Integrity", d: "MACs detect any tampering — corrupted packets are rejected." },
              ].map((x, i) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-4 flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-violet-500/30 flex items-center justify-center border border-cyan-400/30">
                    <Lock className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-semibold">{x.t}</div>
                    <div className="text-sm text-slate-400">{x.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative h-[460px]">
            <div className="absolute inset-0 rounded-3xl glass overflow-hidden">
              <GlobeNetwork />
              <div className="absolute bottom-3 left-3 right-3 glass rounded-xl p-3 flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-300">10 nodes · 27 tunnels active</span>
                <span className="text-emerald-300 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  topology stable
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ENCRYPTION MATTERS */}
      <section className="mt-32 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Threat Model"
          title="Why encryption matters"
          subtitle="Every packet you send is forwarded by routers, ISPs, and ASNs you'll never see. Without encryption, every one of them can read — and modify — what you send."
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard glow="pink">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-lg bg-rose-500/20 border border-rose-400/40 flex items-center justify-center">
                <Eye className="h-4 w-4 text-rose-300" />
              </div>
              <h3 className="font-semibold">Without a VPN</h3>
            </div>
            <pre className="mt-2 rounded-lg bg-black/40 p-3 text-[11px] font-mono text-rose-200 border border-rose-400/20 overflow-x-auto">
{`POST /login HTTP/1.1
Host: bank.example.com
Cookie: sid=83af0c…
Authorization: Basic YWRtaW46MTIzNDU2
{ "username": "admin", "password": "123456" }`}
            </pre>
            <p className="mt-3 text-sm text-slate-400">Any hop on the path can read this in plaintext. Coffee-shop Wi-Fi is the easiest possible attack vector.</p>
          </GlassCard>
          <GlassCard glow="cyan">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                <Shield className="h-4 w-4 text-emerald-300" />
              </div>
              <h3 className="font-semibold">With Shield Lab VPN</h3>
            </div>
            <pre className="mt-2 rounded-lg bg-black/40 p-3 text-[11px] font-mono text-emerald-200 border border-emerald-400/20 overflow-x-auto">
{`8A FF 91 D2 00 AC 43 7E  9B 21 5C E0 84 11 6F D9
A2 8F 7B C4 51 D0 06 99  3E 7A 11 BC 4D 88 02 6A
F0 9C 21 4E 5D 73 06 8A  CB 17 F1 22 8E 99 04 B3
…512 more bytes of opaque ciphertext…`}
            </pre>
            <p className="mt-3 text-sm text-slate-400">Same request — wrapped in AES-256-GCM. Indistinguishable from random noise to every intermediary.</p>
          </GlassCard>
        </div>
      </section>

      {/* VPN ARCHITECTURE */}
      <section className="mt-32 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Architecture"
          title="How the tunnel is built"
          subtitle="Five layers of cryptography between you and the rest of the internet."
        />
        <div className="mt-12">
          <GlassCard className="p-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-stretch">
              {[
                { l: "Client", d: "Your device. App-level data.", c: "from-cyan-500 to-cyan-300" },
                { l: "Tunnel", d: "Encapsulation + handshake.", c: "from-violet-500 to-cyan-400" },
                { l: "Cipher", d: "AES-256-GCM / ChaCha20.", c: "from-pink-500 to-violet-400" },
                { l: "Exit", d: "Decrypts & routes to web.", c: "from-amber-500 to-pink-400" },
                { l: "Internet", d: "Plaintext request emitted.", c: "from-emerald-400 to-cyan-400" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  <div className={`h-full rounded-xl p-4 bg-gradient-to-br ${s.c} text-slate-900`}>
                    <div className="text-xs font-bold uppercase">{s.l}</div>
                    <div className="mt-2 text-xs font-medium opacity-80">{s.d}</div>
                    <div className="mt-3 h-1 w-full rounded-full bg-black/20 overflow-hidden">
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                        className="h-full w-1/2 bg-white/60"
                      />
                    </div>
                  </div>
                  {i < 4 && (
                    <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-300" />
                  )}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* REALTIME TRAFFIC DEMO */}
      <section className="mt-32 mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Live"
          title="Realtime encrypted traffic demo"
          subtitle="A sample tunnel boot sequence — watch how the cipher suite, handshake, and routing come up in milliseconds."
        />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Terminal />
          <GlassCard className="!p-0 overflow-hidden">
            <TrafficBars />
          </GlassCard>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-32 mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Platform" title="Everything in one cinematic lab" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="h-full">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 flex items-center justify-center border border-cyan-400/20 mb-4">
                  <f.icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="font-semibold text-base">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.text}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-12 md:p-16 text-center neon-border">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-violet-500/15 to-pink-500/15 pointer-events-none" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative text-4xl md:text-5xl font-bold tracking-tight"
          >
            Ready to see the <span className="gradient-text">invisible</span>?
          </motion.h2>
          <p className="relative mt-4 text-slate-300 max-w-xl mx-auto">
            Launch the simulator and watch packets, ciphers and attacks unfold inside your browser.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/attacks"><GlowButton size="lg">Open Attack Simulator <ArrowRight className="h-4 w-4" /></GlowButton></Link>
            <Link href="/learn"><GlowButton size="lg" variant="ghost">Browse Learning Center</GlowButton></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrafficBars() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Realtime throughput</div>
          <div className="text-2xl font-bold gradient-text">942 Mb/s</div>
        </div>
        <div className="text-right text-[11px] font-mono text-slate-400">
          <div>peak <span className="text-cyan-300">988</span></div>
          <div>avg  <span className="text-violet-300">871</span></div>
        </div>
      </div>
      <div className="mt-6 flex items-end gap-1 h-40">
        {Array.from({ length: 60 }).map((_, i) => {
          const h = 20 + Math.abs(Math.sin(i * 0.4)) * 70 + Math.random() * 12;
          return (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.01, duration: 0.6 }}
              className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500/30 via-violet-500/60 to-pink-500/90"
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-500">
        <span>00:00</span><span>00:15</span><span>00:30</span><span>00:45</span><span>01:00</span>
      </div>
    </div>
  );
}
