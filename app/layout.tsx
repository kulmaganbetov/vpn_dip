import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleBackground from "@/components/effects/ParticleBackground";
import AIAssistant from "@/components/widgets/AIAssistant";
import AlertTicker from "@/components/widgets/AlertTicker";

export const metadata: Metadata = {
  title: "VPN Shield Lab — Interactive VPN Encryption Platform",
  description:
    "Cinematic, interactive platform for analyzing VPN encryption efficiency and cyber attacks.",
};

export const viewport: Viewport = {
  themeColor: "#05070d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen text-slate-200 antialiased">
        {/* Animated background layers */}
        <div className="fixed inset-0 -z-30 grid-bg opacity-60 pointer-events-none" />
        <div className="fixed inset-0 -z-20 bg-noise opacity-[0.04] pointer-events-none" />
        <ParticleBackground />

        <Navbar />
        <AlertTicker />
        <main className="relative z-10">{children}</main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  );
}
