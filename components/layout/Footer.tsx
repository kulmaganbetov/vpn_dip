"use client";

import Link from "next/link";
import { Shield, Github, Twitter, Globe, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-cyan-400/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-cyan-400" />
            <div className="text-xl font-bold">
              VPN <span className="gradient-text">Shield Lab</span>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-slate-400 leading-relaxed">
            An interactive cinematic platform for visualizing VPN encryption, traffic
            tunneling, packet integrity and real-world cyber attack scenarios — built
            for engineers, researchers, and the security-curious.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a className="p-2 rounded-lg glass hover:shadow-neon transition" href="#" aria-label="github">
              <Github className="h-4 w-4" />
            </a>
            <a className="p-2 rounded-lg glass hover:shadow-neon transition" href="#" aria-label="twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a className="p-2 rounded-lg glass hover:shadow-neon transition" href="#" aria-label="site">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Platform</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li><Link href="/encryption" className="hover:text-cyan-300">Encryption Visualizer</Link></li>
            <li><Link href="/protocols" className="hover:text-cyan-300">Protocol Dashboard</Link></li>
            <li><Link href="/attacks" className="hover:text-cyan-300">Attack Simulator</Link></li>
            <li><Link href="/learn" className="hover:text-cyan-300">Learning Center</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Resources</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li><Link href="/about" className="hover:text-cyan-300">About</Link></li>
            <li><a href="#" className="hover:text-cyan-300">Documentation</a></li>
            <li><a href="#" className="hover:text-cyan-300">Changelog</a></li>
            <li><a href="#" className="hover:text-cyan-300">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="h-3 w-3 text-emerald-400" />
            Encrypted UI demo · No real traffic is intercepted · 100% client-side
          </div>
          <div>© {new Date().getFullYear()} VPN Shield Lab. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
