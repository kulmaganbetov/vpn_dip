import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomHex(length: number): string {
  const chars = "0123456789ABCDEF";
  let s = "";
  for (let i = 0; i < length; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
    if ((i + 1) % 2 === 0 && i !== length - 1) s += " ";
  }
  return s;
}

export function shuffleBits(text: string): string {
  return text
    .split("")
    .map(() => Math.round(Math.random()).toString())
    .join("");
}

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Pseudo encryption — deterministic, NOT cryptographic.
 * Used purely for visual demonstration of byte transformation.
 */
export function pseudoEncrypt(text: string, algo: string): string {
  const seed =
    algo === "AES-256" ? 0x5a : algo === "AES-128" ? 0xa5 : algo === "ChaCha20" ? 0x3c : 0xff;
  const bytes: string[] = [];
  const targetLen =
    algo === "RSA" ? 64 : algo === "AES-256" ? 32 : algo === "AES-128" ? 16 : 24;
  for (let i = 0; i < targetLen; i++) {
    const c = text.charCodeAt(i % Math.max(1, text.length)) || 0;
    const v = (c * 31 + i * 17 + seed) & 0xff;
    bytes.push(v.toString(16).padStart(2, "0").toUpperCase());
  }
  return bytes.join(" ");
}
