# VPN Shield Lab

> Cinematic, interactive, frontend-only platform for visualizing VPN encryption and cyber attacks.

A premium cybersecurity SaaS-style demo built with Next.js 14, React 18, TypeScript, TailwindCSS, Framer Motion, Three.js, Recharts and Lucide Icons.

## Pages

- **Home** — Animated 3D VPN tunnel, floating cyber widgets, parallax hero, feature grid.
- **Encryption Visualizer** — Type text, pick AES-128/256, ChaCha20 or RSA, watch the cipher animate.
- **Protocol Dashboard** — Radar, bar and line charts comparing WireGuard, OpenVPN, IPSec, L2TP, PPTP.
- **Attack Simulator** — MITM, Wireshark-style packet sniffing, DNS leak and brute-force simulations.
- **Learning Center** — Expandable lessons + VPN history timeline.
- **About** — Tech stack, architecture and mission.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Tech

- Next.js 14 (App Router)
- React 18 + TypeScript
- TailwindCSS 3
- Framer Motion 11
- Three.js + @react-three/fiber + drei
- Recharts 2
- Lucide React

## Architecture

```
app/
  layout.tsx              Global shell, particle bg, navbar, AI assistant
  page.tsx                Home
  encryption/page.tsx     Encryption visualizer
  protocols/page.tsx      Protocol comparison dashboard
  attacks/page.tsx        Attack simulator
  learn/page.tsx          Learning center
  about/page.tsx          About
components/
  layout/                 Navbar, footer
  ui/                     Glass card, glow button, section header
  effects/                Particle background
  three/                  VPN tunnel, globe network (WebGL)
  widgets/                Cyber widgets, terminal, AI assistant, alert ticker
  attacks/                MITM, packet sniffing, DNS leak, brute force
lib/
  utils.ts                Pseudo-encryption, hex/byte helpers, cn()
```

## Disclaimer

The "encryption" performed here is a deterministic byte transformation for visualization only. **Never use it to protect real data.** Use audited libraries (libsodium, your OS crypto, browser SubtleCrypto) in production.
