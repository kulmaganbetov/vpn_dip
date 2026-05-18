"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skull, Wifi, Globe2, Hammer, Shield } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import MitmAttack from "@/components/attacks/MitmAttack";
import PacketSniffing from "@/components/attacks/PacketSniffing";
import DnsLeak from "@/components/attacks/DnsLeak";
import BruteForce from "@/components/attacks/BruteForce";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "mitm", label: "Man-in-the-Middle", icon: Skull, Comp: MitmAttack, color: "from-rose-500 to-pink-500" },
  { id: "sniff", label: "Packet Sniffing", icon: Wifi, Comp: PacketSniffing, color: "from-amber-500 to-rose-500" },
  { id: "dns", label: "DNS Leak", icon: Globe2, Comp: DnsLeak, color: "from-violet-500 to-pink-500" },
  { id: "brute", label: "Brute Force", icon: Hammer, Comp: BruteForce, color: "from-cyan-500 to-violet-500" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function AttacksPage() {
  const [active, setActive] = useState<TabId>("mitm");
  const Active = tabs.find((t) => t.id === active)!.Comp;

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Attack Simulator"
          title="See attacks before they see you"
          subtitle="Four cinematic, browser-only simulations. Toggle VPN protection on and watch the threat collapse in real time."
        />

        <div className="mt-12 flex flex-wrap gap-2 justify-center">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all overflow-hidden",
                active === t.id
                  ? `bg-gradient-to-r ${t.color} text-white shadow-neon`
                  : "glass text-slate-300 hover:text-white"
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-10"
          >
            <GlassCard hoverLift={false} className="p-8">
              <Active />
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { v: "248,173", l: "attacks blocked today" },
            { v: "4.2 ms", l: "avg detection time" },
            { v: "99.99%", l: "tunnel integrity" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500">{s.l}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
