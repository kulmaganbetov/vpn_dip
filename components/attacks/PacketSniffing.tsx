"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wifi, Shield, Filter, ChevronRight } from "lucide-react";
import { randomHex } from "@/lib/utils";

type Pkt = {
  no: number;
  time: string;
  src: string;
  dst: string;
  proto: string;
  len: number;
  info: string;
  payload: string;
  enc: boolean;
};

const ips = ["10.0.0.4", "192.168.1.21", "172.16.5.2", "10.0.0.18"];
const dsts = ["8.8.8.8", "1.1.1.1", "104.21.32.5", "151.101.1.69"];
const protos = ["HTTP", "DNS", "TLS", "TCP", "UDP"];
const plaintextSamples = [
  "GET /login HTTP/1.1 Host: bank.example.com",
  "POST /api/auth user=admin&password=qwerty",
  "Cookie: sid=ab38cf91e2; remember=true",
  "QUERY A api.tracker.com",
  "Authorization: Basic YWRtaW46MTIzNDU2",
  "User-Agent: Mozilla/5.0 (Macintosh)",
];

export default function PacketSniffing() {
  const [vpn, setVpn] = useState(false);
  const [packets, setPackets] = useState<Pkt[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    let n = 1;
    const t = setInterval(() => {
      const enc = vpn;
      const ptext = plaintextSamples[Math.floor(Math.random() * plaintextSamples.length)];
      setPackets((p) =>
        [
          {
            no: n++,
            time: new Date().toLocaleTimeString("en-US", { hour12: false }) + "." + String(Math.floor(Math.random() * 999)).padStart(3, "0"),
            src: ips[Math.floor(Math.random() * ips.length)],
            dst: dsts[Math.floor(Math.random() * dsts.length)],
            proto: protos[Math.floor(Math.random() * protos.length)],
            len: 64 + Math.floor(Math.random() * 1400),
            info: enc ? "Encrypted Application Data" : ptext,
            payload: enc ? randomHex(64) : ptext,
            enc,
          },
          ...p,
        ].slice(0, 14)
      );
    }, 900);
    return () => clearInterval(t);
  }, [vpn]);

  const sel = packets.find((p) => p.no === selected) ?? packets[0];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-mono text-rose-300 uppercase tracking-wider">Attack 02</div>
          <h3 className="text-2xl font-bold">Packet Sniffing — Wireshark-style</h3>
          <p className="mt-1 text-sm text-slate-400">An attacker on the same network captures every packet you send.</p>
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

      <div className="rounded-2xl overflow-hidden border border-cyan-400/20 bg-black/60">
        <div className="px-3 py-2 flex items-center gap-2 border-b border-cyan-400/15 bg-black/40">
          <Wifi className="h-3.5 w-3.5 text-cyan-300" />
          <span className="text-[11px] font-mono text-slate-400">Capture on en0 · {packets.length} pkts</span>
          <Filter className="h-3 w-3 text-slate-500 ml-3" />
          <code className="text-[11px] font-mono text-cyan-300">tcp.port == 443 or http or dns</code>
          {vpn && (
            <span className="ml-auto text-[10px] font-mono text-emerald-300 flex items-center gap-1">
              <Shield className="h-3 w-3" /> WG tunnel · payload opaque
            </span>
          )}
        </div>

        <div className="grid grid-cols-12 text-[10px] uppercase font-mono text-slate-500 px-3 py-2 border-b border-white/5">
          <div className="col-span-1">No.</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-2">Source</div>
          <div className="col-span-2">Destination</div>
          <div className="col-span-1">Proto</div>
          <div className="col-span-1">Len</div>
          <div className="col-span-3">Info</div>
        </div>

        <div className="max-h-72 overflow-y-auto no-scrollbar">
          {packets.map((p) => (
            <motion.button
              key={p.no}
              onClick={() => setSelected(p.no)}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full grid grid-cols-12 text-[11px] font-mono px-3 py-1.5 text-left border-b border-white/5 hover:bg-cyan-500/5 ${
                sel?.no === p.no ? "bg-cyan-500/10" : ""
              } ${p.enc ? "text-emerald-300" : "text-amber-200"}`}
            >
              <div className="col-span-1 text-slate-500">{p.no}</div>
              <div className="col-span-2 text-slate-400">{p.time}</div>
              <div className="col-span-2">{p.src}</div>
              <div className="col-span-2 flex items-center gap-1">
                <ChevronRight className="h-3 w-3 text-slate-600" />
                {p.dst}
              </div>
              <div className="col-span-1">{p.proto}</div>
              <div className="col-span-1 text-slate-400">{p.len}</div>
              <div className="col-span-3 truncate">{p.info}</div>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-cyan-400/20">
          <div className="p-3 border-r border-cyan-400/15">
            <div className="text-[10px] uppercase text-slate-500 font-mono mb-2">Frame details</div>
            {sel && (
              <div className="space-y-1 text-[11px] font-mono text-slate-300">
                <div><span className="text-slate-500">Frame</span> #{sel.no}, {sel.len} bytes on wire</div>
                <div><span className="text-slate-500">Ethernet II</span> Src: aa:bb:cc:dd:ee:01</div>
                <div><span className="text-slate-500">IPv4</span> {sel.src} → {sel.dst}</div>
                <div><span className="text-slate-500">{sel.proto}</span> Length {sel.len}</div>
                <div className={sel.enc ? "text-emerald-300" : "text-amber-300"}>
                  <span className="text-slate-500">Payload type</span>{" "}
                  {sel.enc ? "Encrypted (opaque)" : "Cleartext (READABLE)"}
                </div>
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="text-[10px] uppercase text-slate-500 font-mono mb-2">Payload hex</div>
            <div className={`text-[11px] font-mono break-all ${sel?.enc ? "text-emerald-300" : "text-amber-200"}`}>
              {sel?.payload}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className={`rounded-xl p-4 border ${vpn ? "bg-slate-900/40 border-slate-700 text-slate-500" : "bg-rose-500/10 border-rose-400/30"}`}>
          <div className="text-xs font-semibold mb-1">Without VPN</div>
          <pre className="text-[11px] font-mono">
{`username=admin
password=123456`}
          </pre>
        </div>
        <div className={`rounded-xl p-4 border ${vpn ? "bg-emerald-500/10 border-emerald-400/30" : "bg-slate-900/40 border-slate-700 text-slate-500"}`}>
          <div className="text-xs font-semibold mb-1">With VPN</div>
          <pre className="text-[11px] font-mono">
{`8A FF 91 D2 00 AC 43 7E
9B 21 5C E0 84 11 6F D9`}
          </pre>
        </div>
      </div>
    </div>
  );
}
