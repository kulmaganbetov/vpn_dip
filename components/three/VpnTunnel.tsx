"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Tunnel() {
  const groupRef = useRef<THREE.Group | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);

  const rings = useMemo(() => {
    const arr: { z: number; rot: number; scale: number; hue: number }[] = [];
    for (let i = 0; i < 28; i++) {
      arr.push({
        z: -i * 1.2,
        rot: Math.random() * Math.PI,
        scale: 1 + Math.sin(i * 0.5) * 0.15,
        hue: i,
      });
    }
    return arr;
  }, []);

  const packets = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      z: -(i / 18) * 30,
      offset: Math.random() * Math.PI * 2,
      r: 1.4 + Math.random() * 0.3,
      speed: 0.04 + Math.random() * 0.04,
    }));
  }, []);

  useFrame((state, dt) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((c, i) => {
        c.rotation.z += dt * 0.2 * (i % 2 === 0 ? 1 : -1);
        const mesh = c as THREE.Mesh;
        mesh.position.z += dt * 2.4;
        if (mesh.position.z > 6) mesh.position.z = -28;
      });
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={ringsRef}>
        {rings.map((r, i) => (
          <mesh key={i} position={[0, 0, r.z]} rotation={[0, 0, r.rot]} scale={r.scale}>
            <torusGeometry args={[1.8, 0.02, 12, 64]} />
            <meshBasicMaterial
              color={new THREE.Color().setHSL((180 + i * 6) / 360, 1, 0.6)}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>

      {/* Outer glow shell */}
      <mesh>
        <cylinderGeometry args={[2.05, 2.05, 40, 64, 1, true]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Packets */}
      {packets.map((p, i) => (
        <Packet key={i} {...p} />
      ))}

      {/* Center beam */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 40, 8]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function Packet({
  z,
  offset,
  r,
  speed,
}: {
  z: number;
  offset: number;
  r: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed * 6 + offset;
    ref.current.position.z = ((z + state.clock.elapsedTime * 4) % 30) - 15;
    ref.current.position.x = Math.cos(t) * r;
    ref.current.position.y = Math.sin(t) * r;
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 0.7;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.18, 0.18, 0.18]} />
      <meshBasicMaterial color="#00ffe1" />
    </mesh>
  );
}

export default function VpnTunnel() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 65 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#a855f7" />
      <Tunnel />
    </Canvas>
  );
}
