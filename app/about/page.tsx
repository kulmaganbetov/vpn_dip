"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Code2, Heart, Zap, Globe2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

const stack = [
  { name: "Next.js", color: "from-white to-slate-300" },
  { name: "React", color: "from-cyan-400 to-cyan-200" },
  { name: "TypeScript", color: "from-blue-400 to-blue-300" },
  { name: "TailwindCSS", color: "from-teal-400 to-cyan-300" },
  { name: "Framer Motion", color: "from-pink-500 to-violet-500" },
  { name: "Three.js", color: "from-amber-400 to-pink-400" },
  { name: "Recharts", color: "from-emerald-400 to-cyan-400" },
  { name: "Lucide Icons", color: "from-violet-400 to-pink-400" },
];

const values = [
  { icon: Shield, t: "Privacy-first", d: "Everything runs in your browser. No tracking, no analytics, no backend." },
  { icon: Sparkles, t: "Cinematic UX", d: "Every interaction is an animation. Every animation has a purpose." },
  { icon: Code2, t: "Open architecture", d: "Clean, modular React components — extendable in any direction." },
  { icon: Zap, t: "Performance native", d: "Lightweight Three.js scenes and GPU-friendly transitions." },
  { icon: Globe2, t: "Educational", d: "Built to teach, not just impress. Every visual maps to a real concept." },
  { icon: Heart, t: "Crafted with care", d: "AAA frontend quality — designed like a flagship cybersecurity product." },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="About"
          title="The VPN Shield Lab project"
          subtitle="A cinematic, frontend-only experience for visualizing what really happens when a VPN protects your traffic."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2">
            <h3 className="text-xl font-bold">Mission</h3>
            <p className="mt-3 text-slate-300 leading-relaxed">
              Cybersecurity is invisible by design — and that's the problem. Most users
              don't understand what a VPN actually does, what encryption looks like, or
              why some protocols are dangerous. <span className="text-cyan-300 font-semibold">VPN Shield Lab</span> turns
              every concept into a moving, interactive visual you can see, click, and
              break in safety.
            </p>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Every byte you see on this site is generated locally. No data is sent
              anywhere. No accounts. No tracking pixels. Just an interactive lab for
              the curious.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <motion.div
                  key={v.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <v.icon className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{v.t}</div>
                    <div className="text-xs text-slate-400">{v.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <div className="space-y-4">
            <GlassCard hoverLift={false}>
              <h3 className="font-semibold">Built with</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <span
                    key={s.name}
                    className={`px-3 py-1 rounded-full text-xs font-mono bg-gradient-to-r ${s.color} text-slate-900`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard hoverLift={false}>
              <h3 className="font-semibold">Architecture</h3>
              <ul className="mt-3 text-xs text-slate-400 space-y-2 font-mono">
                <li>app/ — Next.js routes (Home, Encryption, Protocols, Attacks, Learn, About)</li>
                <li>components/three — WebGL tunnel + globe</li>
                <li>components/attacks — MITM, Sniffing, DNS Leak, Brute Force</li>
                <li>components/widgets — Cyber widgets, terminal, AI assistant</li>
                <li>components/effects — Particle background, gradients</li>
                <li>lib/ — Utilities &amp; pseudo-encryption helpers</li>
              </ul>
            </GlassCard>

            <GlassCard hoverLift={false}>
              <h3 className="font-semibold">Disclaimer</h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                The encryption shown here is for visualization purposes only and must
                not be used to protect real data. Use audited libraries like libsodium
                or your OS-native crypto APIs in production.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
